import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('age', { path: '/' });
		cookies.delete('selectedBackground', { path: '/' });
		cookies.delete('camera', { path: '/' });
		cookies.delete('joinedDate', { path: '/' });

		throw redirect(303, '/');
	}
};
