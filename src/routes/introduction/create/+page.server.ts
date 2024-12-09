import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import type { Language } from '$lib/types/types';

export const actions = {
	create: async ({ request, cookies }: RequestEvent) => {
		const data = await request.formData();
		const age: string = data.get('age') as string;
		const language: Language = { lang: 'nl-nl', name: 'Nederlands', icon: 'netherlands' };

		cookies.set('age', age, { path: '/', httpOnly: true });
		cookies.set('language', JSON.stringify(language), { path: '/', httpOnly: true });
		throw redirect(303, '/');
	}
};
