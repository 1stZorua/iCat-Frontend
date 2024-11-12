<script lang="ts">
import { untrack } from 'svelte';
import { enhance } from '$app/forms';
import { fade } from 'svelte/transition';
import { PageLayout } from '$components/page';
import { ButtonPrimary } from '$components/shared/buttons';
import { Avatar, Icon, Input } from '$components/shared/other';
import { TextBase } from '$components/shared/text';
import type { Message } from '$lib/types/types';
import { marked } from 'marked';

let { form }: { form: { message: Message } } = $props();
let elForm: HTMLFormElement;
let messages: Message[] = $state([
	{
		sender: 'bot',
		text: 'Hi, Emma. I am iCat and I can help you with any questions regarding your museum visit. Is there something I can do for you?'
	}
]);
let history: string = $derived(JSON.stringify(messages));
let lastMessage: Message | null = null;
let isProcessing: boolean = $state(false);

$effect(() => {
	if (form?.message && form.message !== lastMessage) {
		messages = [...messages, form.message];
		lastMessage = form.message;
	}

	if (messages.length > 1) {
		untrack(async () => {
			await typeMessage(messages.length - 1);
		});
	}
});

async function typeMessage(index: number) {
	const message = messages[index];

	if (message.sender == 'user') {
		message.typedText = message.text;
		return;
	}

	for (let i = 0; i <= message.text.length; i++) {
		message.typedText = message.text.slice(0, i);
		await new Promise((resolve) => setTimeout(resolve, 20));
	}

	isProcessing = false;
}

async function onSubmit() {
	const elPrompt = elForm.querySelector('input');

	if (!elPrompt || isProcessing) return;

	const userMessage: Message = { sender: 'user', text: elPrompt.value as string };
	elPrompt.value = '';

	messages = [...messages, userMessage];
	isProcessing = true;
}
</script>

<PageLayout page="Chat">
	<div class={`flex gap-2`}>
		<Avatar
			className="flex-shrink-0 justify-center items-end bg-light-cards-neutral-bg"
			imageClassName="h-5/6"
			src="/images/icat.png"
		></Avatar>
		<TextBase className="font-normal p-3 rounded-md bg-light-background-secondary"
			>{messages[0].text}</TextBase
		>
	</div>
	{#each messages.slice(1) as msg}
		{@const isBot = msg.sender == 'bot'}
		<div in:fade class={`flex gap-2 ${isBot ? '' : 'justify-end'}`}>
			{#if isBot}
				<Avatar
					className="flex-shrink-0 justify-center items-end bg-light-cards-neutral-bg"
					imageClassName="h-5/6"
					src="/images/icat.png"
				></Avatar>
			{/if}
			<TextBase
				className={`font-normal p-3 rounded-md ${isBot ? 'bg-light-background-secondary' : 'bg-light-cards-neutral-bg text-white'}`}
				>{@html marked.parse(msg?.typedText  ?? '' as string)}</TextBase
			>
		</div>
	{/each}
	<form
		onsubmit={onSubmit}
		enctype="multipart/form-data"
		bind:this={elForm}
		class="wrapper fixed bottom-0 left-0 flex w-full justify-center pb-4"
		method="POST"
		action="?/chat"
		use:enhance
	>
		<Input type="text" name="prompt" placeholder="Type something..." required>
			<ButtonPrimary className="p-3" disabled={isProcessing}>
				<Icon
					className="text-white"
					icon={isProcessing ? 'svg-spinners:90-ring-with-bg' : 'lucide:send'}
				></Icon>
			</ButtonPrimary>
		</Input>
		<input type="hidden" name="history" value={history} />
	</form>
</PageLayout>
