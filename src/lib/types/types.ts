import type { AvailableLanguageTag } from '$lib/paraglide/runtime';

export type FlashType = 'success' | 'info' | 'warning' | 'error';

export interface Message {
	role: 'user' | 'assistant';
	context: string;
	typedText?: string;
}

export interface VectorDBResult {
	id: string;
	metadata: {
		characters: string;
		id: string;
		pages: string;
		pdf_name: string;
		text: string;
	};
	score: number;
}

export interface Language {
	name: string;
	lang: AvailableLanguageTag;
	icon: string;
}
