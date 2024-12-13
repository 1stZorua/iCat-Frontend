<script lang="ts">
import { page } from '$app/stores';
import { getFlash } from 'sveltekit-flash-message';
import { enhance } from '$app/forms';
import { PageLayout } from '$components/page';
import { TextMedium, TextSmall } from '$components/shared/text';
import { Avatar, Card, Icon } from '$components/shared/other';
import { fly } from 'svelte/transition';
import { captureImageFromCanvas, createFileFromBlob } from '$lib/utils';
import { onDestroy } from 'svelte';
import * as m from '$lib/paraglide/messages';

const flash = getFlash(page);

let { form }: { form: { exhibition: string } } = $props();

let elVideo: HTMLVideoElement;
let elScanArea: HTMLButtonElement;
let elInput: HTMLInputElement;
let imageData: string = $state('');
let exhibition: string = $derived(form?.exhibition);
let videoStream: MediaStream | null = $state(null);

async function startCamera() {
	try {
		videoStream = await navigator.mediaDevices.getUserMedia({
			video: { facingMode: 'environment' }
		});
		elVideo.srcObject = videoStream;
		elVideo.play();
	} catch (error) {
		$flash = { type: 'error', message: m.error_accessing_camera() };
		console.error(`${m.error_accessing_camera()}: `, error);
	}
}
async function captureScanArea() {
	const imageData = captureImageFromCanvas(elVideo, elScanArea);
	const file = createFileFromBlob(imageData);
	const dataTransfer = new DataTransfer();
	dataTransfer.items.add(file);
	elInput.files = dataTransfer.files;
}

onDestroy(() => videoStream?.getTracks().forEach((t) => t.stop()));
</script>

<PageLayout
	parentClassName="h-full"
	header={{ color: videoStream ? 'accent' : 'primary' }}
	page={m.scan_name()}
>
	<video
		bind:this={elVideo}
		class="absolute left-0 top-0 -z-10 h-full w-full object-cover"
		style="opacity: {videoStream ? 1 : 0}; transition: opacity 500ms;"
		autoplay
		playsinline
		muted
	></video>
	<form
		class="h-full py-10 pb-32"
		action="?/scan"
		method="post"
		enctype="multipart/form-data"
		use:enhance
	>
		<input bind:this={elInput} type="file" name="image" accept="image/*" value={imageData} hidden />
		<button
			bind:this={elScanArea}
			onclick={videoStream ? captureScanArea : startCamera}
			class="relative flex h-full w-full flex-col justify-between items-center"
			aria-label="Scan area"
		>
			<div class="flex w-full justify-between">
				<div
					class="h-12 w-12 rounded-tl-lg border-l-[3px] border-t-[3px] border-light-background-secondary"
				></div>
				<div
					class="h-12 w-12 rounded-tr-lg border-r-[3px] border-t-[3px] border-light-background-secondary"
				></div>
			</div>
			{#if !videoStream}
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
		<div class="wrapper absolute bottom-0 left-0 w-full" in:fly={{ y: 100 }} out:fly={{ y: 100 }}>
			<Card className="rounded-md bg-light-background-primary flex items-center gap-3">
				<Avatar
					className="flex-shrink-0 justify-center items-end bg-light-cards-neutral-bg rounded-sm"
					imageClassName="h-5/6"
					src="/images/icat.png"
				></Avatar>
				<div class="flex flex-col text-light-text-primary">
					<TextMedium>{exhibition ?? 'Exhibition'}</TextMedium>
					<TextSmall>{m.scan_exhibition()}</TextSmall>
				</div>
				<Icon className="text-light-text-primary ml-auto" icon="material-symbols:arrow-forward"
				></Icon>
			</Card>
		</div>
	{/if}
</PageLayout>
