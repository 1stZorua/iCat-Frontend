<script lang="ts">
import type { ClassType } from '$components/_types';
import { cn } from '$lib/utils';
import { TextBase } from '../text';

function onSwitch(index: number) {
	if (activeIndex == index) return;
	activeIndex = index;
	changeSwitch(index);
}

let {
	className,
	items,
	changeSwitch
}: { className?: ClassType; items: string[]; changeSwitch: (index: number) => void } = $props();

let activeIndex: number = $state(0);
let switchContainer: HTMLDivElement | null = $state(null);
let width: number = $derived(100 / items.length);
let offset = $derived.by(() => {
	const itemWidth = (switchContainer?.offsetWidth ?? 0) / items.length;
	return itemWidth * activeIndex;
});
</script>

<div
	bind:this={switchContainer}
	class={cn("relative isolate flex w-full justify-between overflow-hidden rounded-full bg-light-background-secondary py-4", className)}
>
	<div
		class="absolute inset-0 -z-10 h-full rounded-full bg-light-btn-primary-bg transition-all"
		style="width: {width}%; left: {offset}px"
	></div>
	{#each items as item, index}
		<button onclick={() => onSwitch(index)} class="w-full">
			<TextBase className={activeIndex === index ? 'text-light-text-accent' : ''}>{item}</TextBase>
		</button>
	{/each}
</div>
