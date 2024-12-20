<script lang="ts">
import type { ClassType } from '$components/_types';
import { cn } from '$lib/utils';
import { TextBase } from '../text';

function onTabChange(index: number) {
	if (activeIndex == index) return;
	activeIndex = index;
	changeTab(index);
}

let {
	className,
	items,
	changeTab
}: { className?: ClassType; items: string[]; changeTab: (index: number) => void } = $props();

let activeIndex: number = $state(0);
let container: HTMLDivElement | null = $state(null);
let width: number = $derived(100 / items.length);
let offset = $derived.by(() => {
	const itemWidth = (container?.offsetWidth ?? 0) / items.length;
	return itemWidth * activeIndex;
});
</script>

<div
	bind:this={container}
	class={cn("relative isolate flex w-full justify-between overflow-hidden rounded-full bg-light-background-secondary", className)}
>
	<div
		class="absolute inset-0 -z-10 h-full rounded-full bg-light-btn-primary-bg transition-all"
		style="width: {width}%; left: {offset}px"
	></div>
	{#each items as item, index}
		<button onclick={() => onTabChange(index)} class="w-full rounded-full py-4">
			<TextBase className={activeIndex === index ? 'text-light-text-accent' : ''}>{item}</TextBase>
		</button>
	{/each}
</div>
