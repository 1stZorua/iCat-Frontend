import { quizInstruction, quizResponseFormat } from '$lib/instructions';
import type { VectorDBResult } from '$lib/types/types';
import { setFlash } from 'sveltekit-flash-message/server';
import { fetchPineconeResults, getEmbeddingsFromJina, sendToOpenAI } from '$lib/utils';
import type { PageServerLoad, RequestEvent } from './$types';
import * as m from '$lib/paraglide/messages';

export const load: PageServerLoad = async ({ fetch, locals, params }) => {
	const exhibition = params.exhibition;
	const prompt = `Create a quiz question about ${exhibition} that is appropriate for someone aged ${locals.user.age}. The question should be challenging, but not too difficult for their age group.`;
	const instruction = quizInstruction.replaceAll('{exhibition}', exhibition);

	const generateQuiz = async () => {
		const queryEmbedding = await getEmbeddingsFromJina(prompt);
		const vectorDBResults = await fetchPineconeResults(fetch, queryEmbedding, 1);
		const contextTexts = vectorDBResults.matches.map(
			(match: VectorDBResult) => `${match.metadata.text} ${match.metadata.location}`
		);

		const responseMessage = await sendToOpenAI(
			instruction,
			prompt,
			contextTexts,
			[],
			quizResponseFormat
		);
		const quizData = JSON.parse(responseMessage as unknown as string);
		return quizData;
	};

	return {
		quiz: generateQuiz()
	};
};

export const actions = {
	answer: async ({ request, cookies }: RequestEvent) => {
		const data = await request.formData();
		const isCorrectAnswer = JSON.parse(data.get('isCorrectAnswer') as unknown as string);

		if (isCorrectAnswer) {
			setFlash({ type: 'success', message: m.quiz_correct_answer() }, cookies);
		} else {
			setFlash({ type: 'error', message: m.quiz_wrong_answer() }, cookies);
		}

		return {
			success: true,
			correct: isCorrectAnswer as string
		};
	}
};
