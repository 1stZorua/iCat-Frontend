<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils/merge';
import type { ClassType } from '$components/_types';
import { type TextProps, textVariants } from './variants';

let {
	className,
	props,
	children
}: { className?: ClassType; props?: TextProps; children?: Snippet } = $props();
</script>

<span class={cn(textVariants(props), className)}>
	{@render children?.()}
</span>
