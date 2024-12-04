import { fail, type RequestEvent } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { getEmbeddingsFromJina, fetchPineconeResults, sendToOpenAI } from '$lib/utils';
import type { Message, VectorDBResult } from '$lib/types/types';

export const actions = {
	chat: async ({ request, fetch, cookies, locals }: RequestEvent) => {
		const data = await request.formData();
		const prompt = data.get('prompt') as string;
		const history = JSON.parse(data.get('history') as string) as Message[];

		try {
			const queryEmbedding = await getEmbeddingsFromJina(prompt);
			const vectorDBResults = await fetchPineconeResults(fetch, queryEmbedding, 16);
			const contextTexts = vectorDBResults.matches.map(
				(match: VectorDBResult) => match.metadata.text
			);

			const userInstruction = `
			### **AI Instruction**

			Adjust your tone and language complexity to ensure the user, who is ${locals.user.age} years old, can understand your responses clearly and easily.
			`;
			const responseMessage = await sendToOpenAI(prompt, contextTexts, history, userInstruction);

			return {
				success: true,
				message: {
					role: 'assistant',
					context: responseMessage
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
