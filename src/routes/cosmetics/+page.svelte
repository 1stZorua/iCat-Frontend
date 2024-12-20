<script lang="ts">
import { PageLayout } from '$components/page';
import { Avatar, Card, TabControl } from '$components/shared/other';
import type { CardProps } from '$components/shared/other/Card/variants';
import { TextBase, TextSmall } from '$components/shared/text';
import { fade } from 'svelte/transition';
import * as m from '$lib/paraglide/messages';

let activeTabIndex = $state(0);

const categories: {
	name: string;
	items: {
		color: CardProps['color'];
		src: string;
		href: string;
		title: string;
		description: string;
	}[];
}[] = [
	{
		name: m.cosmetics_user(),
		items: [
			{
				color: 'primary',
				src: 'chat',
				href: `cosmetics/chat/${m.cosmetics_background_href()}`,
				title: m.cosmetics_background_heading(),
				description: m.cosmetics_background_description()
			}
		]
	},
	{
		name: m.cosmetics_icat(),
		items: [
			{
				color: 'background',
				src: 'error',
				href: m.cosmetics_icat_href(),
				title: m.cosmetics_icat_heading(),
				description: m.cosmetics_icat_description()
			}
		]
	}
];
</script>

<PageLayout page={m.cosmetics_name()}>
	<TabControl
		items={categories.map((c) => c.name)}
		changeTab={(activeIndex) => activeTabIndex = activeIndex}
	></TabControl>
	{#each categories as cat, index}
		{#if index === activeTabIndex}
			<div in:fade>
				{#each cat.items as { color, src, href, title, description }}
					<Card
						href={href}
						className="rounded-md bg-light-background-primary flex items-center gap-3"
					>
						<Avatar
							className="flex-shrink-0 justify-center items-center bg-light-cards-{color}-bg rounded-sm"
							imageClassName="h-1/2"
							src="/images/{src}.png"
						></Avatar>
						<div class="flex flex-col text-light-text-primary">
							<TextBase>{title}</TextBase>
							<TextSmall className="text-light-text-muted">{description}</TextSmall>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	{/each}
</PageLayout>
