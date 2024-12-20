import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { loadFlash } from 'sveltekit-flash-message/server';

export const load: LayoutServerLoad = loadFlash(async ({ locals, url }) => {
	if (!locals.user.age && !url.pathname.includes('introduction')) {
		redirect(302, '/introduction');
	}

	return {
		user: locals.user
	};
});
