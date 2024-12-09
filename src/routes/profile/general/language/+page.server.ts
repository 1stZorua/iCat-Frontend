import type { RequestEvent } from './$types';

export const actions = {
	select: async ({ request, cookies }: RequestEvent) => {
		const data = await request.formData();
		const language = data.get('language') as string;

		cookies.set('language', language, { path: '/', httpOnly: true });
	}
};
