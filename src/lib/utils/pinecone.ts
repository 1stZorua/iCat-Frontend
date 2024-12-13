export async function fetchPineconeResults(
	fetch: typeof globalThis.fetch,
	queryEmbedding: number[],
	topK: number
) {
	const body = JSON.stringify({ queryEmbedding, topK });

	const response = await fetch('/api/Pinecone', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: body
	});

	return await response.json();
}
