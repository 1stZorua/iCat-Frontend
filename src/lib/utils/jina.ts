import { JINA_API_KEY } from '$env/static/private';

export async function getEmbeddingsFromJina(query: string) {
	const url = 'https://api.jina.ai/v1/embeddings';
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${JINA_API_KEY}`
	};

	const data = {
		model: 'jina-embeddings-v3',
		task: 'text-matching',
		dimensions: 1024,
		late_chunking: true,
		embedding_type: 'float',
		input: [query]
	};

	const response = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify(data)
	});

	const result = await response.json();

	return result.data[0]?.embedding;
}
