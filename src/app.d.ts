import type { AvailableLanguageTag } from '../../lib/paraglide/runtime';
import type { ParaglideLocals } from '@inlang/paraglide-sveltekit';
// See https://svelte.dev/docs/kit/types#app.d.ts

import type { FlashType, Language } from '$lib/types/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			paraglide: ParaglideLocals<AvailableLanguageTag>;
			user: {
				age: number | null;
				cosmetics: {
					selectedBackground: number;
				};
				language: Language | undefined;
			};
		}
		interface PageData {
			flash?: { type: FlashType; message: string };
			user?: {
				age: number;
				cosmetics: {
					selectedBackground: number;
				};
				language: Language | undefined;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
