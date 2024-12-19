import { fail, type RequestEvent } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { getEmbeddingsFromJina, fetchPineconeResults, sendToOpenAI } from '$lib/utils';
import type { Message, VectorDBResult } from '$lib/types/types';
import * as m from '$lib/paraglide/messages';
import { markdownInstruction } from '$lib/instructions/markdown.js';

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

			const instruction = markdownInstruction.replaceAll(
				'{userAge}',
				(locals.user.age as number).toString()
			);

			const responseMessage = await sendToOpenAI(instruction, prompt, contextTexts, history);

			return {
				success: true,
				message: {
					role: 'assistant',
					context: responseMessage
				},
				state: 'talking'
			};
		} catch (error: unknown) {
			setFlash({ type: 'error', message: m.error_processing_request() }, cookies);
			console.error(error);
			return fail(500);
		}
	}
};
