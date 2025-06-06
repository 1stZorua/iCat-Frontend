import { fail, type RequestEvent } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { getEmbeddingsFromJina, fetchPineconeResults, sendToOpenAI } from '$lib/utils';
import type { Emotion, Message, VectorDBResult } from '$lib/types/types';
import * as m from '$lib/paraglide/messages';
import { markdownInstruction } from '$lib/instructions/markdown.js';
import {
	emotionInstruction,
	emotionQuery,
	emotionResponseFormat
} from '$lib/instructions/emotion.js';

export const actions = {
	chat: async ({ request, fetch, cookies, locals }: RequestEvent) => {
		const data = await request.formData();
		const prompt = data.get('prompt') as string;
		const history = JSON.parse(data.get('history') as string) as Message[];

		try {
			const queryEmbedding = await getEmbeddingsFromJina(prompt);
			const vectorDBResults = await fetchPineconeResults(fetch, queryEmbedding, 1);
			const contextTexts = vectorDBResults.matches.map(
				(match: VectorDBResult) =>
					`${match.metadata.text}. This file was retrieved from folder locations: ${match.metadata.location}. This can give an idea of where the exhibition is located in the museum.`
			);

			const instruction = markdownInstruction.replaceAll(
				'{userAge}',
				(locals.user.age as number).toString()
			);
			const responseMessage = await sendToOpenAI(instruction, prompt, contextTexts, history);

			const emotions: { emotions: Emotion[] } = JSON.parse(
				(await sendToOpenAI(
					emotionInstruction,
					emotionQuery,
					responseMessage ? [[responseMessage]] : [],
					[],
					emotionResponseFormat
				)) as string
			);

			return {
				success: true,
				message: {
					role: 'assistant',
					context: responseMessage,
					emotions: emotions['emotions']
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
