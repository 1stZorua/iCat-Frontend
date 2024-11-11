let VITE_JINA_API_KEY: string;

if (import.meta.env.MODE === 'development') {
	VITE_JINA_API_KEY = import.meta.env.VITE_JINA_API_KEY;
} else if (import.meta.env.MODE === 'production') {
	VITE_JINA_API_KEY = process.env.VITE_JINA_API_KEY as string;
}

export async function getEmbeddingsFromJina(query: string) {
	const url = 'https://api.jina.ai/v1/embeddings';
	console.log(VITE_JINA_API_KEY);
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${VITE_JINA_API_KEY}`
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
