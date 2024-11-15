import { fail, type RequestEvent } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { getEmbeddingsFromJina, fetchPineconeResults, sendToOpenAI } from '$lib/utils';
import type { Message, VectorDBResult } from '$lib/types/types';

export const actions = {
	chat: async ({ request, fetch, cookies } : RequestEvent) => {
		const data = await request.formData();
		const prompt = data.get('prompt') as string;
		const history = JSON.parse(data.get('history') as string) as Message[];

		try {
			const queryEmbedding = await getEmbeddingsFromJina(prompt);
			const vectorDBResults = await fetchPineconeResults(fetch, queryEmbedding, 16);
			const contextTexts = vectorDBResults.matches.map(
				(match: VectorDBResult) => match.metadata.text
			);

			const fullContext = [
				...history.map((msg) => msg.text),
				...contextTexts,
			];

			const responseMessage = await sendToOpenAI(prompt, fullContext);

			return {
				success: true,
				message: {
					sender: 'bot',
					text: responseMessage
				}
			};
		} catch (error: unknown) {
			setFlash(
				{ type: 'error', message: 'An error occured while processing your request.' },
				cookies
			);
			console.error('Error processing request:', error);
			return fail(500);
		}
	}
};
