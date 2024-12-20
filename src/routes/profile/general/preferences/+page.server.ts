import type { RequestEvent } from './$types';

export const actions = {
	switch: async ({ request, cookies }: RequestEvent) => {
		const data = await request.formData();
		const state = JSON.parse(data.get('state') as string) as { name: string; value: string };

		cookies.set(state.name, state.value, { path: '/', httpOnly: true });
	}
};
