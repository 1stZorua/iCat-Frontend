import { fail, type RequestEvent } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import * as m from '$lib/paraglide/messages';

const MINIMUM_DELAY_MS = 300;

export const actions = {
	scan: async ({ request, cookies }: RequestEvent) => {
		const data = await request.formData();
		const imageFile = data.get('image') as File;

		if (imageFile.size === 0 || !imageFile.name) return fail(400);

		const startTime = Date.now();

		try {
			const response = await fetch('https://3x2qz5hm-5000.euw.devtunnels.ms/predict', {
				method: 'POST',
				body: data
			});

			if (!response.ok) {
				setFlash({ type: 'error', message: m.error_processing_request() }, cookies);
				return fail(400);
			}

			const result = await response.json();
			const elapsedTime = Date.now() - startTime;

			if (elapsedTime < MINIMUM_DELAY_MS) {
				await new Promise((resolve) => setTimeout(resolve, MINIMUM_DELAY_MS - elapsedTime));
			}

			return { success: true, exhibition: result['predicted_exhibition'], scanning: false };
		} catch (error: unknown) {
			setFlash({ type: 'error', message: m.error_processing_request() }, cookies);
			console.error(error);
			return fail(500);
		}
	}
};
