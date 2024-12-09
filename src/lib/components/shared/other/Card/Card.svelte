<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils/merge';
import type { ClassType } from '$components/_types';
import { type CardProps, cardVariants } from './variants';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

interface Props extends HTMLAnchorAttributes {
	className?: ClassType;
	href?: string;
	props?: CardProps;
	children?: Snippet;
}

let { className, href = '', props, children, ...rest }: Props = $props();
</script>

{#if href}
	<a href={href} class={cn(cardVariants(props), className)} {...rest}>
		{@render children?.()}
	</a>
{:else if 'onclick' in rest}
	<button class={cn(cardVariants(props), className)} {...rest as HTMLButtonAttributes}>
		{@render children?.()}
	</button>
{:else}
	<div class={cn(cardVariants(props), className)}>
		{@render children?.()}
	</div>
{/if}
