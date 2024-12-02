import type { RequestEvent } from './$types';

export const actions = {
	select: async ({ request, cookies }: RequestEvent) => {
		const data = await request.formData();
		const id: string = data.get('id') as string;

		cookies.set('selectedBackground', id, { path: '/', httpOnly: true });
	}
};
