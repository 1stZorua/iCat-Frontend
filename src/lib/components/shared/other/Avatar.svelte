<script lang="ts">
import type { ClassType } from '$components/_types';
import { cn } from '$lib/utils/merge';
import type { HTMLAnchorAttributes } from 'svelte/elements';

interface Props extends HTMLAnchorAttributes {
	className?: ClassType;
	imageClassName?: ClassType;
	href?: string;
	src?: string;
	alt?: string;
}

let { className, imageClassName, href, src, alt = 'Avatar', ...rest }: Props = $props();
</script>

{#if href}
	<a href={href} class={cn('flex h-12 w-12 overflow-hidden rounded-full', className)} {...rest}>
		{#if src}
			<img class={cn('', imageClassName)} src={src} alt={alt} />
		{/if}
	</a>
{:else}
	<div class={cn('flex h-12 w-12 overflow-hidden rounded-full', className)}>
		{#if src}
			<img class={cn('', imageClassName)} src={src} alt={alt} />
		{/if}
	</div>
{/if}
