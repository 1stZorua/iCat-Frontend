<script lang="ts">
import { onMount, untrack } from 'svelte';
import { enhance } from '$app/forms';
import { page } from '$app/stores';
import { getFlash } from 'sveltekit-flash-message';
import { fade } from 'svelte/transition';
import { PageLayout } from '$components/page';
import { ButtonPrimary, ButtonText } from '$components/shared/buttons';
import { Avatar, Icon, Input } from '$components/shared/other';
import { TextBase } from '$components/shared/text';
import type { Message } from '$lib/types/types';
import { copyToClipboard, initTTS, TTS } from '$lib/utils';
import { getVoices, stopTTS } from '$lib/utils/tts';
import * as m from '$lib/paraglide/messages';
import { marked } from 'marked';

const flash = getFlash(page);

let { form }: { form: { message: Message; state: 'idle' | 'processing' | 'talking' } } = $props();
let formRef: HTMLFormElement;

let tts: { initialized: boolean; voices: SpeechSynthesisVoice[] } = $state({
	initialized: false,
	voices: []
});

let messages: Message[] = $state([
	{
		role: 'assistant',
		context: m.chat_message()
	}
]);

let prompt: string = $state('');
let chatState: 'idle' | 'processing' | 'talking' = $state('idle');
let history: string = $derived(JSON.stringify(messages));
let lastMessage: Message | null = null;
let background: number | undefined = $page.data.user?.cosmetics.selectedBackground;

async function typeMessage(index: number) {
	const message = messages[index];

	if (message.role == 'user') {
		message.typedText = message.context;
		return;
	}

	for (let i = 0; i <= message.context.length; i++) {
		message.typedText = message.context.slice(0, i);
		await new Promise((resolve) => setTimeout(resolve, 20));
	}

	chatState = 'idle';
}

async function onSubmit() {
	const elInput = formRef.querySelector('input[name="input"]') as HTMLInputElement;
	if (!elInput || chatState !== 'idle') return;

	prompt = elInput.value as string;
	elInput.value = '';

	messages = [...messages, { role: 'user', context: prompt }];
	chatState = 'processing';
}

$effect(() => {
	if (form?.message && form.message !== lastMessage) {
		messages = [...messages, form.message];
		lastMessage = form.message;
		chatState = form.state;
	}

	if (messages.length > 1) {
		untrack(async () => {
			await typeMessage(messages.length - 1);
		});
	}
});

onMount(() => {
	const initializeTTS = async () => {
		tts.initialized = await initTTS();
		if (!tts.initialized) return;
		const lang = ($page.data.user?.language?.lang as string).replace(
			/^([a-z]+)-([a-z]+)$/,
			(_, p1, p2) => `${p1}-${p2.toUpperCase()}`
		);
		tts.voices = getVoices(lang);
	};

	initializeTTS();
	return () => stopTTS();
});
</script>

<svelte:window onbeforeunload={stopTTS} />

{#snippet message(msg: Message, src: string = 'icat')}
	{@const isBot = msg.role === 'assistant'}
	<div class="flex gap-2 {isBot ? '' : 'justify-end'}">
		{#if isBot}
			<Avatar
				className="flex-shrink-0 justify-center items-end bg-light-cards-neutral-bg"
				imageClassName="h-5/6"
				src="/images/{src}.png"
			></Avatar>
		{/if}
		{#if msg.context}
			<div
				class="flex flex-col gap-2 rounded-md p-3 {isBot ? 'bg-light-background-secondary' : 'bg-light-cards-neutral-bg text-white'}"
			>
				<TextBase className="font-normal rounded-md">
					{@html marked.parse(msg?.typedText?.replace(/\n/g, '<br>') ?? msg.context as string)}
				</TextBase>
				{#if (isBot && msg.context === msg.typedText) || msg.typedText === undefined}
					<div in:fade class="flex gap-1">
						{#if tts.initialized}
							<ButtonText
								onclick={async() => {
								if (!tts.initialized) {
									$flash = { type: 'error', message: m.error_enabling_tts() }
									return;
								}

								msg.tts = !msg.tts;
								await TTS(msg.context, { voice: tts.voices[0], end: () => msg.tts = false });
						}}
								className="p-1 transition-colors rounded-sm hover:bg-light-background-tertiary hover:bg-opacity-5"
								><Icon
									className="text-md text-light-text-muted"
									icon={!msg.tts ? 'lucide:volume-1' : 'lucide:volume-2'}
								></Icon></ButtonText
							>
						{/if}
						<ButtonText
							onclick={async() => {
								await copyToClipboard(msg.context);
								msg.clipboard = true;
								await new Promise(resolve => setTimeout(resolve, 2000));
								msg.clipboard = false;
							}}
							className="p-1 transition-colors rounded-sm hover:bg-light-background-tertiary hover:bg-opacity-5"
						>
							<Icon
								className="text-md text-light-text-muted"
								icon={msg.clipboard ? 'lucide:check' : 'lucide:copy'}
							></Icon>
						</ButtonText>
					</div>
				{/if}
			</div>
		{:else}
			<Icon className="text-light-cards-neutral-bg self-center" icon="svg-spinners:3-dots-fade"
			></Icon>
		{/if}
	</div>
{/snippet}

<PageLayout
	className="mb-[5.5rem] text-light-text-primary"
	header={{ color: background === 0 ? 'primary' : 'accent' }}
	page={m.chat_name()}
>
	<img
		class="fixed inset-0 -z-10 h-full w-full object-cover"
		src="/images/cosmetics/background_{background}.svg"
		alt="background"
	/>
	{@render message(messages[0])}
	{#each messages.slice(1) as msg}
		<div in:fade>
			{@render message(msg)}
		</div>
	{/each}
	{#if chatState === 'processing'}
		<div in:fade>
			{@render message({ role: 'assistant', context: ''}, 'icat_thinking')}
		</div>
	{/if}
	<form
		onsubmit={onSubmit}
		enctype="multipart/form-data"
		bind:this={formRef}
		class="wrapper fixed bottom-0 left-0 flex w-full justify-center pb-4"
		method="POST"
		action="?/chat"
		use:enhance
	>
		<Input
			className="items-center"
			type="text"
			name="input"
			placeholder={m.chat_placeholder()}
			required
		>
			<ButtonPrimary className="p-3" disabled={chatState !== 'idle'}>
				<Icon
					className="text-light-text-accent"
					icon={chatState !== 'idle' ? 'svg-spinners:90-ring-with-bg' : 'mynaui:send-solid'}
				></Icon>
			</ButtonPrimary>
		</Input>
		<input type="hidden" name="prompt" value={prompt} />
		<input type="hidden" name="history" value={history} />
	</form>
</PageLayout>
