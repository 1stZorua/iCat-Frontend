<script lang="ts">
import { enhance } from '$app/forms';
import { ButtonAction, ButtonPrimary } from '$components/shared/buttons';
import { Icon } from '$components/shared/other';
import Avatar from '$components/shared/other/Avatar.svelte';
import Input from '$components/shared/other/Input.svelte';
import { TextBase, TextLarge } from '$components/shared/text';
import type { Message } from '$lib/types/types';
import { untrack } from 'svelte';
import { fade } from 'svelte/transition';

let { form }: { form: { message: Message } } = $props();

let elForm: HTMLFormElement;
let messages: Message[] = $state([
	{
		sender: 'bot',
		text: 'Hi, Emma. I am iCat and I can help you with any questions regarding your museum visit. Is there something I can do for you?'
	}
]);

let lastMessage: Message | null = null;
let processingIndex: number = $state(-1);
let isTalking: boolean = $state(false);

$effect(() => {
	if (form?.message && form.message !== lastMessage) {
		messages = [...messages, form.message];
		lastMessage = form.message;
		processingIndex = -1;
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

	isTalking = true;

	for (let i = 0; i <= message.text.length; i++) {
		message.typedText = message.text.slice(0, i);
		await new Promise((resolve) => setTimeout(resolve, 20));
	}

	isTalking = false;
}

async function onSubmit() {
	const elPrompt = elForm.querySelector('input');

	if (!elPrompt || isTalking) return;

	const userMessage: Message = { sender: 'user', text: elPrompt.value as string };
	elPrompt.value = '';

	messages = [...messages, userMessage];

	processingIndex = messages.length - 1;
}
</script>

<section class="wrapper relative flex h-full w-full flex-col overflow-scroll">
	<div class="wrapper fixed left-0 top-0 flex w-full items-center">
		<ButtonAction className="absolute top-1/2 -translate-y-1/2">
			<Icon icon="lucide:chevron-left"></Icon>
		</ButtonAction>
		<TextLarge className="mx-auto h-12 flex items-center">Chat</TextLarge>
	</div>
	<div class="mb-[5.5rem] mt-[4.5rem] flex flex-col gap-5">
		<div transition:fade class={`flex gap-2`}>
			<Avatar
				className="flex-shrink-0 justify-center items-end bg-light-cards-neutral-bg"
				imageClassName="h-5/6"
				src="/images/icat.png"
			></Avatar>
			<TextBase className="font-normal p-3 rounded-md bg-light-background-secondary"
				>{messages[0].text}</TextBase
			>
		</div>
		{#each messages.slice(1) as msg, index}
			{@const isBot = msg.sender == 'bot'}
			<div transition:fade class={`flex gap-2 ${isBot ? '' : 'justify-end'}`}>
				{#if isBot}
					<Avatar
						className="flex-shrink-0 justify-center items-end bg-light-cards-neutral-bg"
						imageClassName="h-5/6"
						src="/images/icat.png"
					></Avatar>
				{/if}
				{#if processingIndex == index}
					<TextBase>Loading ...</TextBase>
				{:else}
					<TextBase
						className={`font-normal p-3 rounded-md ${isBot ? 'bg-light-background-secondary' : 'bg-light-cards-neutral-bg text-white'}`}
						>{msg.typedText}</TextBase
					>
				{/if}
			</div>
		{/each}
	</div>
	<form
		onsubmit={onSubmit}
		bind:this={elForm}
		class="wrapper fixed bottom-0 left-0 flex w-full justify-center pb-4"
		method="POST"
		action="?/chat"
		use:enhance
	>
		<Input type="text" name="prompt" placeholder="Type something..." required>
			<ButtonPrimary className="p-3">
				<Icon
					className="text-white"
					icon={(processingIndex !== -1 || isTalking) ? 'svg-spinners:90-ring-with-bg' : 'lucide:send'}
				></Icon>
			</ButtonPrimary>
		</Input>
	</form>
</section>
