import type { AvailableLanguageTag } from '$lib/paraglide/runtime';

export type FlashType = 'success' | 'info' | 'warning' | 'error';

export type Sentiment = 'Neutral' | 'Thinking' | 'Happy' | 'Angry' | 'Surprised';

export interface Emotion {
	segment: string;
	sentiment: Sentiment;
}

export interface Message {
	role: 'user' | 'assistant';
	context: string;
	emotions?: Emotion[];
	activeEmotion?: Emotion;
	typedText?: string;
	tts?: boolean;
	clipboard?: boolean;
}

export interface VectorDBResult {
	id: string;
	metadata: {
		id: string;
		text: string;
		location: string[];
	};
	score: number;
}

export interface ResponseFormat {
	type: 'json_schema';
	json_schema: {
		name: string;
		strict: boolean;
		schema: {
			type: string;
			properties: Record<string, unknown>;
			required: string[];
			additionalProperties: boolean;
		};
	};
}

export interface Language {
	name: string;
	lang: AvailableLanguageTag;
	icon: string;
}

export interface Preference {
	state: string;
	name: string;
	description: string;
}

export interface Quiz {
	question: string;
	answers: {
		A: string;
		B: string;
		C: string;
		D: string;
	};
	correctAnswer: 'A' | 'B' | 'C' | 'D';
}
