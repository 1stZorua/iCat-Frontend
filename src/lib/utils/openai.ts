import type { Message, ResponseFormat } from '$lib/types/types';

let VITE_OPENAI_API_KEY: string;

if (import.meta.env.MODE === 'development') {
	VITE_OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
} else if (import.meta.env.MODE === 'production') {
	VITE_OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
}

export async function sendToOpenAI(
	instruction: string,
	userQuery: string,
	contextTexts: string[][],
	history: Message[] = [],
	responseFormat: ResponseFormat | null = null
): Promise<string | undefined> {
	const messages = [
		{ role: 'system', content: instruction },
		...history.map((msg) => ({ role: msg.role, content: msg.context })),
		{ role: 'user', content: `Context:\n${contextTexts.join('\n\n')}\n\nQuestion: ${userQuery}` }
	];

	const body = JSON.stringify({
		model: 'gpt-4o-mini',
		messages,
		store: true,
		metadata: { iCat: 'chat', function: 'sendToOpenAI' },
		...(responseFormat && { response_format: responseFormat })
	});

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${VITE_OPENAI_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: body
	});

	const result = await response.json();
	return result.choices[0]?.message?.content;
}
