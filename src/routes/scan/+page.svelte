<script lang="ts">
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';
	import { enhance } from '$app/forms';
	import { PageLayout } from '$components/page';
	import { TextMedium, TextSmall } from '$components/shared/text';
	import { Avatar, Card, Icon } from '$components/shared/other';
	import { fade, fly } from 'svelte/transition';
	import { captureImageFromCanvas, createFileFromBlob, toProperCase } from '$lib/utils';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';
	
	const flash = getFlash(page);
	
	let { form }: { form: { exhibition: string; scanning: boolean } } = $props();
	
	let videoRef: HTMLVideoElement;
	let scanAreaRef: HTMLButtonElement;
	let formRef: HTMLFormElement;
	let inputRef: HTMLInputElement;
	let imageData: string = $state('');
	let exhibition: string = $derived(form?.exhibition);
	let videoStream: MediaStream | null = $state(null);
	let cameraPermission: boolean = JSON.parse(
		($page.data.user?.preferences['camera'] as unknown as string) || 'false'
	);
	
	async function startCamera() {
		try {
			videoStream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' }
			});
			videoRef.srcObject = videoStream;
			videoRef.play();
		} catch (error) {
			if (error instanceof TypeError) return;
			$flash = { type: 'error', message: m.error_accessing_camera() };
			console.error(error);
		}
	}
	
	async function captureScanArea() {
		form = { exhibition: '', scanning: true };
		const imageData = captureImageFromCanvas(videoRef, scanAreaRef);
		const file = createFileFromBlob(imageData);
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file);
		inputRef.files = dataTransfer.files;
	
		formRef.requestSubmit();
	}
	
	onMount(() => {
		if (cameraPermission) startCamera();
		return () => videoStream?.getTracks().forEach((t) => t.stop());
	});
	</script>
	
	<PageLayout
		parentClassName="h-full"
		header={{ color: videoStream ? 'accent' : 'primary' }}
		page={m.scan_name()}
	>
		<video
			bind:this={videoRef}
			class="absolute left-0 top-0 -z-10 h-full w-full object-cover"
			style="opacity: {videoStream ? 1 : 0}; transition: opacity 500ms;"
			autoplay
			playsinline
			muted
		></video>
		<form
			bind:this={formRef}
			onsubmit={(e: Event) => e.preventDefault()}
			class="h-full py-10 pb-32"
			action="?/scan"
			method="post"
			enctype="multipart/form-data"
			use:enhance
		>
			<input
				bind:this={inputRef}
				type="file"
				name="image"
				accept="image/*"
				value={imageData}
				hidden
			/>
			<button
				bind:this={scanAreaRef}
				disabled={form?.scanning}
				onclick={((videoStream && cameraPermission) || videoStream) ? captureScanArea : startCamera}
				class="relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-lg"
				aria-label="Scan area"
			>
				{#if form?.scanning}
					<div transition:fade class="absolute inset-0 h-full w-full">
						<div
							class="absolute left-0 top-0 h-0.5 w-full animate-scan bg-light-background-primary shadow-[0_0_4rem_0.625rem_white] delay-500 [clip-path:inset(0)]"
						></div>
					</div>
				{/if}
				<div class="flex w-full justify-between">
					<div
						class="h-12 w-12 rounded-tl-lg border-l-[3px] border-t-[3px] border-light-background-secondary"
					></div>
					<div
						class="h-12 w-12 rounded-tr-lg border-r-[3px] border-t-[3px] border-light-background-secondary"
					></div>
				</div>
				{#if !videoStream && !cameraPermission}
					<div class="flex w-[90%] flex-col items-center gap-2">
						<Icon icon="material-symbols:android-camera"></Icon>
						<TextMedium>{m.scan_text()}</TextMedium>
					</div>
				{/if}
				<div class="flex w-full justify-between">
					<div
						class="h-12 w-12 rounded-bl-lg border-b-[3px] border-l-[3px] border-light-background-secondary"
					></div>
					<div
						class="h-12 w-12 rounded-br-lg border-b-[3px] border-r-[3px] border-light-background-secondary"
					></div>
				</div>
			</button>
		</form>
		{#if exhibition}
			{@const unknown = exhibition.toLowerCase() === 'try again!'}
			<div class="wrapper absolute bottom-0 left-0 w-full" transition:fly={{ y: 100, duration: 300 }}>
				<Card
					onclick={(e: Event) => {
						e.preventDefault();
						if (unknown) {
							$flash = { type: 'error', message: m.scan_try_again() };
							return;
						}

						goto(`/exhibition/${exhibition}`);
					}}
					className="relative rounded-md bg-light-background-primary flex items-center gap-3 w-full"
				>
					<Avatar
						className="flex-shrink-0 justify-center items-end bg-light-cards-neutral-bg rounded-sm"
						imageClassName="h-5/6"
						src="/images/icat.png"
					></Avatar>
					<div class="flex w-[70%] flex-col overflow-hidden text-light-text-primary text-left">
						<TextMedium className="w-full overflow-hidden text-ellipsis">{toProperCase([exhibition])}</TextMedium>
						<TextSmall>{unknown ? m.scan_exhibition_error() : m.scan_exhibition()}</TextSmall>
					</div>
					<Icon
						className="text-light-text-primary absolute right-3"
						icon="material-symbols:arrow-forward"
					></Icon>
				</Card>
			</div>
		{/if}
	</PageLayout>
	