export function toProperCase(input: string[]): string {
	return input.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}
