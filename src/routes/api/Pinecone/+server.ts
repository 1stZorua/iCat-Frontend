import { PINECONE_API_KEY } from '$env/static/private';
import { Pinecone } from '@pinecone-database/pinecone';

export const POST = async ({ request }) => {
	const { queryEmbedding, topK } = await request.json();

	try {
		const pc = new Pinecone({
			apiKey: PINECONE_API_KEY
		});

		const index = pc.index('quickstart');
		const result = await index.query({
			vector: queryEmbedding,
			topK: parseInt(topK),
			includeMetadata: true
		});

		return new Response(JSON.stringify({ matches: result.matches }));
	} catch (error: unknown) {
		// setFlash({ type: 'error', message: 'An error occured while processing your request.'}, cookies)
		console.error('Error processing request:', error);
	}
};
