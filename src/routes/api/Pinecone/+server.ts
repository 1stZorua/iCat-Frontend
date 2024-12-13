import { Pinecone } from '@pinecone-database/pinecone';

let VITE_PINECONE_API_KEY: string;

if (import.meta.env.MODE === 'development') {
	VITE_PINECONE_API_KEY = import.meta.env.VITE_PINECONE_API_KEY;
} else if (import.meta.env.MODE === 'production') {
	VITE_PINECONE_API_KEY = process.env.PINECONE_API_KEY as string;
}

export const POST = async ({ request }: { request: Request }) => {
	const { queryEmbedding, topK } = await request.json();
	try {
		const pc = new Pinecone({
			apiKey: VITE_PINECONE_API_KEY
		});

		const index = pc.index('quickstart');
		const result = await index.query({
			vector: queryEmbedding,
			topK: parseInt(topK),
			includeMetadata: true
		});

		return new Response(JSON.stringify({ matches: result.matches }));
	} catch (error: unknown) {
		console.error('Error processing request:', error);
	}
};
