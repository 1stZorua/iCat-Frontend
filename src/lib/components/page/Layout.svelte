<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils/merge';
import type { ClassType } from '$components/_types';
import { ButtonAction } from '$components/shared/buttons';
import { Icon } from '$components/shared/other';
import { TextLarge } from '$components/shared/text';

let {
	parentClassName,
	className,
	header = { state: true, color: 'primary' },
	href = '/',
	page,
	children
}: {
	parentClassName?: ClassType;
	className?: ClassType;
	header?: { state?: boolean; color?: 'primary' | 'accent' };
	href?: string;
	page?: string;
	children?: Snippet;
} = $props();
</script>

<section class={cn("wrapper relative flex h-max w-full flex-col", parentClassName)}>
	<div
		class="wrapper fixed left-0 top-0 z-10 flex w-full items-center {header.state || header.state === undefined ? '' : 'invisible'}"
	>
		<ButtonAction href={href} className="absolute top-1/2 -translate-y-1/2">
			<Icon icon="lucide:chevron-left"></Icon>
		</ButtonAction>
		<TextLarge className={`mx-auto h-12 flex items-center text-light-text-${header.color}`}
			>{page}</TextLarge
		>
	</div>
	<div class={cn('mt-[4.5rem] flex h-full flex-col gap-5', className)}>
		{@render children?.()}
	</div>
</section>
