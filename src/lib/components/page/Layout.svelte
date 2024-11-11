<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils/merge';
import type { ClassType } from '$components/_types';
import { ButtonAction } from '$components/shared/buttons';
import { Icon } from '$components/shared/other';
import { TextLarge } from '$components/shared/text';

let {
	className,
	href = '/',
	page = '',
	children
}: { className?: ClassType; href?: string; page?: string; children?: Snippet } = $props();
</script>

<section class={cn('wrapper relative flex h-full w-full flex-col overflow-scroll', className)}>
	<div class="wrapper fixed left-0 top-0 flex w-full items-center">
		<ButtonAction href={href} className="absolute top-1/2 -translate-y-1/2">
			<Icon icon="lucide:chevron-left"></Icon>
		</ButtonAction>
		<TextLarge className="mx-auto h-12 flex items-center">{page}</TextLarge>
	</div>
	<div class="mb-[5.5rem] mt-[4.5rem] flex flex-col gap-5">
		{@render children?.()}
	</div>
</section>
