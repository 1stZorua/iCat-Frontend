import { getEmbeddingsFromJina, fetchPineconeResults, sendToOpenAI } from '$lib/utils';
import type { VectorDBResult } from '$lib/types/types';
import { fail } from '@sveltejs/kit';

export const actions = {
	chat: async ({ request, fetch }) => {
		const data = await request.formData();
		const prompt = data.get('prompt') as string;

		try {
			const queryEmbedding = await getEmbeddingsFromJina(prompt);
			const vectorDBResults = await fetchPineconeResults(fetch, queryEmbedding, 16);
			const contextTexts = vectorDBResults.matches.map(
				(match: VectorDBResult) => match.metadata.text
			);
			const responseMessage = await sendToOpenAI(prompt, contextTexts);

			return {
				success: true,
				message: {
					sender: 'bot',
					text: responseMessage
				}
			};
		} catch (error: unknown) {
			// setFlash({ type: 'error', message: 'An error occured while processing your request.'}, cookies)
			console.error('Error processing request:', error);
			return fail(500);
		}
	}
};
