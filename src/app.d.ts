// See https://svelte.dev/docs/kit/types#app.d.ts

import type { FlashType } from '$lib/types/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			flash?: { type: FlashType; message: string };
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
