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

let { form }: { form: { message: Message, context: Array<string[]> } } = $props();
let elForm: HTMLFormElement;
let messages: Message[] = $state([
	{
		role: 'assistant',
		context: 'Hi, Emma. I am iCat and I can help you with any questions regarding your museum visit. Is there something I can do for you?'
	}
]);
let history: string = $derived(JSON.stringify(messages));
let context: string = $derived(JSON.stringify(form?.context || []));
let lastMessage: Message | null = null;
let isProcessing: boolean = $state(false);

// $effect(() => {
// 	if (form?.context) {
// 		const lastUserMessageIndex = messages.findIndex((msg) => msg.role === 'user');
// 		if (lastUserMessageIndex !== -1) {
// 			const question = messages[lastUserMessageIndex].context;
// 			console.log("before: ", history.length);
// 			messages[lastUserMessageIndex].context = `Context:\n${form.context.join('\n\n')}\n\nQuestion: ${question}`;
// 			console.log("After: ", history.length);
// 		}
// 	}
// });

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

	if (message.role == 'user') {
		message.typedText = message.context;
		return;
	}

	for (let i = 0; i <= message.context.length; i++) {
		message.typedText = message.context.slice(0, i);
		await new Promise((resolve) => setTimeout(resolve, 20));
	}

	isProcessing = false;
}

async function onSubmit() {
	const elPrompt = elForm.querySelector('input');

	if (!elPrompt || isProcessing) return;

	const userMessage: Message = { role: 'user', context: elPrompt.value as string };
	// elPrompt.value = '';

	messages = [...messages, userMessage];
	isProcessing = true;
}
</script>

<PageLayout className="mb-[5.5rem]" page="Chat">
	<div class={`flex gap-2`}>
		<Avatar
			className="flex-shrink-0 justify-center items-end bg-light-cards-neutral-bg"
			imageClassName="h-5/6"
			src="/images/icat.png"
		></Avatar>
		<TextBase className="font-normal p-3 rounded-md bg-light-background-secondary"
			>{messages[0].context}</TextBase
		>
	</div>
	
	{#each messages.slice(1) as msg}
		{@const isBot = msg.role == 'assistant'}
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
		<input type="hidden" name="context" value={context} />
	</form>
</PageLayout>
