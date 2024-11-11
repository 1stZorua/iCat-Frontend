<script lang="ts">
import type { ClassType } from '$components/_types';
import { cn } from '$lib/utils/merge';

let {
	className,
	imageClassName,
	src,
	alt = 'Avatar'
}: { className?: ClassType; imageClassName?: string; src?: string; alt?: string } = $props();
</script>

<div class={cn('flex h-12 w-12 overflow-hidden rounded-full', className)}>
	{#if src}
		<img class={cn('', imageClassName)} src={src} alt={alt} />
	{/if}
</div>
