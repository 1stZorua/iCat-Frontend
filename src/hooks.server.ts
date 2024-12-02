import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const age = event.cookies.get('age');
	const selectedBackground = event.cookies.get('selectedBackground');

	event.locals.user = {
		age: age ? parseInt(age, 10) : null,
		cosmetics: {
			selectedBackground: selectedBackground ? parseInt(selectedBackground, 10) : 0
		}
	};

	return await resolve(event);
};
