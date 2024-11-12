import { fail, type RequestEvent } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';

const MINIMUM_DELAY_MS = 500;

export const actions = {
    scan: async({ request, cookies }: RequestEvent) => {
        const data = await request.formData();
        const startTime = Date.now();

        try {
            const response = await fetch('https://dss3lpmv-5000.euw.devtunnels.ms/predict', {
                method: 'POST',
                body: data
            });

            if (!response.ok) {
                setFlash({ type: 'error', message: 'An error occured while making request.'}, cookies)
                return fail(400);
            }

            const result = await response.json();  
            const elapsedTime = Date.now() - startTime;

            if (elapsedTime < MINIMUM_DELAY_MS) {
                await new Promise(resolve => setTimeout(resolve, MINIMUM_DELAY_MS - elapsedTime));
            }

            return { success: true, exhibition: result['predicted_exhibition'] }
        } catch (error: unknown) {
            setFlash({ type: 'error', message: 'An error occured while processing your request.'}, cookies)
            console.error(error);
            return fail(500);
        }
    }
}