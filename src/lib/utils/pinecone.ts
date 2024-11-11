export async function fetchPineconeResults(
	fetch: typeof globalThis.fetch,
	queryEmbedding: number[],
	topK: number
) {
	const response = await fetch('/api/Pinecone', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ queryEmbedding, topK })
	});

	return await response.json();
}
