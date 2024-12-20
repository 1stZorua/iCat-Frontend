export async function getPermissionState(name: PermissionName): Promise<boolean> {
	if (!('permissions' in navigator)) return false;

	try {
		const status = await navigator.permissions.query({ name });
		return status.state === 'granted';
	} catch {
		return false;
	}
}

export async function getCameraPermissionState(): Promise<boolean> {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true });
		stream.getTracks().forEach((track) => track.stop());
		return true;
	} catch {
		return false;
	}
}
