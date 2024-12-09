import { goto } from '$app/navigation';
import { i18n } from '$lib/i18n';
import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
import { redirect } from '@sveltejs/kit';

export function switchToLanguage(
	page: string,
	newLanguage: AvailableLanguageTag = 'en-us',
	server: boolean = false
) {
	const canonicalPath = i18n.route(page);
	const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
	if (server) {
		redirect(303, localisedPath);
	} else {
		goto(localisedPath);
	}
}
