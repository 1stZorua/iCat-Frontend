<script lang="ts">
import { page } from '$app/stores';
import type { Snippet } from 'svelte';
import type { FlashType } from '$lib/types/types';
import { getFlash } from 'sveltekit-flash-message/client';
import { Toaster, toast } from 'svelte-sonner';
import 'iconify-icon';
import '../app.css';

const flash = getFlash(page);

const toastMap: Record<FlashType, (message: string) => void> = {
	success: toast.success,
	info: toast.info,
	warning: toast.warning,
	error: toast.error
};

$effect(() => {
	if (!$flash) return;
	const toastFn = toastMap[$flash.type];
	toastFn($flash.message);
});

let { children }: { children?: Snippet } = $props();
</script>

<Toaster position="top-center" richColors toastOptions={{}} />

{@render children?.()}
