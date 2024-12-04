import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export const actions = {
	create: async ({ request, cookies }: RequestEvent) => {
		const data = await request.formData();
		const age: string = data.get('age') as string;

		cookies.set('age', age, { path: '/', httpOnly: true });
		throw redirect(303, '/');
	}
};
