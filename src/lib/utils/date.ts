export function formatDate(dateString: string, languageCode: string): string {
	const date = new Date(dateString);
	return date.toLocaleString(languageCode, { month: 'long', year: 'numeric' });
}
