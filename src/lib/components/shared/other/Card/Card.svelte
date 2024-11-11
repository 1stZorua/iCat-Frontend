<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils/merge';
import type { ClassType } from '$components/_types';
import { type CardProps, cardVariants } from './variants';

let {
	className,
	href = '',
	props,
	children
}: { className?: ClassType; href?: string; props?: CardProps; children?: Snippet } = $props();
</script>

{#if href}
	<a href={href} class={cn(cardVariants(props), className)}>
		{@render children?.()}
	</a>
{:else}
	<div class={cn(cardVariants(props), className)}>
		{@render children?.()}
	</div>
{/if}
