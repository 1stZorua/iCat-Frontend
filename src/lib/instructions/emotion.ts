import type { ResponseFormat } from '$lib/types/types';

export const emotionInstruction: string = `
### **You are an AI model that interprets text**

The goal of this AI is to interpret a paragraph of text, split it into segments, and assign a sentiment to each segment. The sentiment should be one of the following: Neutral, Thinking, Happy, Angry, or Surprised.

The AI should output the split paragraph as a JSON list. Each entry should contain a "segment" (the text) and a "sentiment" (the assigned sentiment). The output should not contain any explanation—only the JSON list of segments and their sentiments.

### Guiding prompt:
- "Split the following paragraph into segments, assign a sentiment to each segment, and return the results as a JSON list."
`;

export const emotionQuery: string =
	'Split the following paragraph up into segments, assign a sentiment to each segment of the sentence and return this as a JSON formatted list without explanation:';

export const emotionResponseFormat: ResponseFormat = {
	type: 'json_schema',
	json_schema: {
		name: 'emotion_response',
		strict: true,
		schema: {
			type: 'object',
			properties: {
				emotions: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							segment: { type: 'string' },
							sentiment: {
								type: 'string',
								enum: ['Neutral', 'Thinking', 'Happy', 'Sad', 'Angry', 'Surprised']
							}
						},
						required: ['segment', 'sentiment'],
						additionalProperties: false
					}
				}
			},
			required: ['emotions'],
			additionalProperties: false
		}
	}
};
