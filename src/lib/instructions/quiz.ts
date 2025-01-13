import type { ResponseFormat } from '$lib/types/types';

export const quizInstruction: string = `
### **Instruction for AI**

Create a quiz question based on the exhibition titled {exhibition}. Please refer to the RAG vector database to ensure the information is accurate and relevant. Follow these rules:

1. Write one clear and concise question about the exhibition.
2. Provide exactly **four** possible answers: A, B, C, and D.
3. Randomly assign the correct answer to one of the options (A, B, C, or D).
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
