<script lang=ts>
import { enhance } from '$app/forms';
import { PageLayout } from '$components/page';
import { TextMedium, TextSmall } from '$components/shared/text';
import { Avatar, Card } from '$components/shared/other';

let { form }: { form: { exhibition: string } } = $props();

let elVideo: HTMLVideoElement;
let elScanArea: HTMLButtonElement;
let elInput: HTMLInputElement;
let imageData: string = $state('');
let exhibition: string = $derived(form?.exhibition);

async function startCamera() {
    try {
        const constraints = {
            video: {
                facingMode: { exact: "environment" }
            }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        elVideo.srcObject = stream;
        elVideo.play();
    } catch (error) {
        console.error("Error accessing camera: ", error);
    }
}
async function captureScanArea() {
    const { left, top, width, height } = elScanArea.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx?.drawImage(elVideo, left, top, width, height, 0, 0, width, height);

    const imageData = canvas.toDataURL('image/png');
    canvas.remove();

    const byteString = atob(imageData.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) uint8Array[i] = byteString.charCodeAt(i);

    const blob = new Blob([uint8Array], { type: 'image/png' });
    const file = new File([blob], 'scan.png', { type: 'image/png' });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    elInput.files = dataTransfer.files;
}

$effect(() => {
    startCamera();
});

</script>

<PageLayout page="Scan">
    <video bind:this={elVideo} class="w-full h-full absolute object-cover top-0 left-0 -z-10" autoplay playsinline muted></video>
    <form class="h-full" action="?/scan" method="post" enctype="multipart/form-data" use:enhance>
        <input bind:this={elInput} type="file" name="image" accept="image/*" value={imageData} required hidden />
        <button 
            bind:this={elScanArea} 
            onclick={captureScanArea}
            class="relative h-full w-full flex flex-col justify-between"
            aria-label="Scan area"
        >
            <div class="flex w-full justify-between">
                <div class="border-light-background-secondary border-t-[3px] border-l-[3px] h-12 w-12 rounded-tl-lg"></div>
                <div class="border-light-background-secondary border-t-[3px] border-r-[3px] h-12 w-12 rounded-tr-lg"></div>
            </div>
            <div class="flex w-full justify-between">
                <div class="border-light-background-secondary border-b-[3px] border-l-[3px] h-12 w-12 rounded-bl-lg"></div>
                <div class="border-light-background-secondary border-b-[3px] border-r-[3px] h-12 w-12 rounded-br-lg"></div>
            </div>
        </button>
    </form>
    {#if exhibition}
        <div>
            <Card className="rounded-md bg-light-background-primary flex items-center gap-3">
                <Avatar
                    className="flex-shrink-0 justify-center items-end bg-light-cards-neutral-bg"
                    imageClassName="h-5/6"
                    src="/images/icat.png"
                ></Avatar>
                <div class="text-light-text-primary flex flex-col">
                    <TextMedium>{exhibition ?? 'Exhibition'}</TextMedium>
                    <TextSmall>Philips museum exhibition</TextSmall>
                </div>
            </Card>
        </div>
    {/if}
</PageLayout>
