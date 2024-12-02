// See https://svelte.dev/docs/kit/types#app.d.ts

import type { FlashType } from '$lib/types/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				age: number | null;
				cosmetics: {
					selectedBackground: number;
				};
			};
		}
		interface PageData {
			flash?: { type: FlashType; message: string };
			user?: {
				age: number;
				cosmetics: {
					selectedBackground: number;
				};
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
