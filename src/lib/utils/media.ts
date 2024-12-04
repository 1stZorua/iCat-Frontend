export function captureImageFromCanvas(
	video: HTMLVideoElement,
	scanArea: HTMLButtonElement
): string {
	const { left, top, width, height } = scanArea.getBoundingClientRect();
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext('2d');
	ctx?.drawImage(video, left, top, width, height, 0, 0, width, height);

	const imageData = canvas.toDataURL('image/png');
	canvas.remove();
	return imageData;
}

export function createFileFromBlob(imageData: string, fileName = 'scan.png'): File {
	const byteString = atob(imageData.split(',')[1]);
	const arrayBuffer = new ArrayBuffer(byteString.length);
	const uint8Array = new Uint8Array(arrayBuffer);

	for (let i = 0; i < byteString.length; i++) {
		uint8Array[i] = byteString.charCodeAt(i);
	}

	const blob = new Blob([uint8Array], { type: 'image/png' });
	return new File([blob], fileName, { type: 'image/png' });
}
