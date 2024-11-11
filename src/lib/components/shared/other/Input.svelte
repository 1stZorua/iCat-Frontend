<script lang="ts">
import { cn } from '$lib/utils/merge';
import type { ClassType } from '$components/_types';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';

interface Props extends HTMLInputAttributes {
	className?: ClassType;
	children?: Snippet;
}

let { className, children, ...rest }: Props = $props();
</script>

<div class={cn('flex w-full rounded-md bg-light-background-secondary p-3', className)}>
	<input
		class="w-full bg-transparent p-2 text-base outline-none transition-opacity placeholder:text-light-text-muted"
		{...rest}
	/>
	{@render children?.()}
</div>
