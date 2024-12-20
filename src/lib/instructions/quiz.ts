import type { ResponseFormat } from '$lib/types/types';

export const quizInstruction: string = `
Your task is to create a quiz question based on the exhibition titled {exhibition} and the available information from this exhibition. Please refer to the RAG vector database to ensure the information is accurate and relevant. The quiz should include:

1. A single, clear question related to the exhibition.
2. Exactly **four** possible answers (A, B, C, D).
3. One correct answer randomly assigned to one of the answers: A, B, C, or D.

Do not include any additional text or formatting.
`;

export const quizResponseFormat: ResponseFormat = {
	type: 'json_schema',
	json_schema: {
		name: 'quiz_response',
		strict: true,
		schema: {
			type: 'object',
			properties: {
				question: { type: 'string' },
				answers: {
					type: 'object',
					properties: {
						A: { type: 'string' },
						B: { type: 'string' },
						C: { type: 'string' },
						D: { type: 'string' }
					},
					required: ['A', 'B', 'C', 'D'],
					additionalProperties: false
				},
				correctAnswer: { type: 'string' }
			},
			required: ['question', 'answers', 'correctAnswer'],
			additionalProperties: false
		}
	}
};
