<script lang="ts">
import { PageLayout } from '$components/page';
import { Avatar, Card, Switch } from '$components/shared/other';
import type { CardProps } from '$components/shared/other/Card/variants';
import { TextBase, TextSmall } from '$components/shared/text';
import { fade } from 'svelte/transition';
import * as m from '$lib/paraglide/messages';

let activeSwitchIndex = $state(0);

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
				href: `cosmetics/chat/${m.cosmetics_href()}`,
				title: m.cosmetics_heading(),
				description: m.cosmetics_description()
			}
		]
	},
	{
		name: m.cosmetics_icat(),
		items: []
	}
];
</script>

<PageLayout page={m.cosmetics_name()}>
	<Switch
		items={categories.map((c) => c.name)}
		changeSwitch={(activeIndex) => activeSwitchIndex = activeIndex}
	></Switch>
	{#each categories as cat, index}
		{#if index === activeSwitchIndex}
			<div in:fade>
				{#each cat.items as item}
					<Card
						href={item.href}
						className="rounded-md bg-light-background-primary flex items-center gap-3"
					>
						<Avatar
							className="flex-shrink-0 justify-center items-center bg-light-cards-{item.color}-bg rounded-sm"
							imageClassName="h-1/2"
							src="/images/{item.src}.png"
						></Avatar>
						<div class="flex flex-col text-light-text-primary">
							<TextBase>{item.title}</TextBase>
							<TextSmall className="text-light-text-muted">{item.description}</TextSmall>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	{/each}
</PageLayout>
