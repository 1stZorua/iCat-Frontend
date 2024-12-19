import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import type { Language } from '$lib/types/types';
import { type Handle } from '@sveltejs/kit';
import { switchToLanguage } from '$lib/utils/lang';

export const customHandle: Handle = async ({ event, resolve }) => {
	const age = event.cookies.get('age');
	const selectedBackground = event.cookies.get('selectedBackground');
	const langCookie = event.cookies.get('language') as string;
	const language = langCookie
		? (JSON.parse(event.cookies.get('language') as string) as Language)
		: undefined;

	const requestedLanguage = event.url.pathname.split('/')[1] as string;
	const cameraPreference = event.cookies.get('camera') as unknown as boolean;
	const joinedDate = event.cookies.get('joinedDate') as string;

	if (language && requestedLanguage !== language.lang && !event.url.pathname.startsWith('/api/')) {
		switchToLanguage(event.url.pathname, language?.lang, true);
	}

	event.locals.user = {
		age: age ? parseInt(age, 10) : null,
		cosmetics: {
			selectedBackground: selectedBackground ? parseInt(selectedBackground, 10) : 0
		},
		language: language,
		preferences: {
			camera: cameraPreference
		},
		joinedDate: joinedDate
	};

	return await resolve(event);
};

export const handle = sequence(customHandle, i18n.handle());
