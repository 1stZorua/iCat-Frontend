<script lang="ts">
import { page } from '$app/stores';
import { getFlash } from 'sveltekit-flash-message';
import { ButtonSecondary } from '$components/shared/buttons';
import { Avatar, Card } from '$components/shared/other';
import { Text, TextBase, TextLarge, TextSmall } from '$components/shared/text';
import type { CardProps } from '$components/shared/other/Card/variants';

const flash = getFlash(page);
const cards: { color: CardProps['color']; href: string; text: string }[] = [
	{
		color: 'primary',
		href: 'chat',
		text: 'Chat'
	},
	{
		color: 'secondary',
		href: 'scan',
		text: 'Scan'
	},
	{
		color: 'accent',
		href: 'cosmetics',
		text: 'Cosmetics'
	},
	{
		color: 'background',
		href: 'profile',
		text: 'Settings'
	}
];
</script>

<section class="wrapper m-auto flex h-full max-h-[100rem] max-w-[100rem] flex-col gap-4">
	<div class="flex items-center justify-between">
		<div class="flex flex-col">
			<TextLarge>Hi, Emma</TextLarge>
			<TextBase className="text-light-text-muted font-normal">Good morning!</TextBase>
		</div>
		<Avatar src="/images/avatar.png"></Avatar>
	</div>
	<div class="grid h-full w-full grid-cols-2 gap-4 rounded-lg">
		<Card className="relative p-4 col-span-2">
			<div class="z-10 flex flex-col items-start justify-center gap-4">
				<div class="flex flex-col items-start gap-0.5">
					<Text
						className="inline-block rotate-180"
						props={{ family: 'palanquin', size: 'xl', weight: 'bold' }}>"</Text
					>
					<TextBase>Got questions?</TextBase>
					<TextBase>Purr-haps I can help!</TextBase>
				</div>
				<ButtonSecondary href="chat">
					<TextSmall>Start a Chat</TextSmall>
				</ButtonSecondary>
			</div>
			<img
				class="absolute bottom-0 right-4 h-full pt-[2.5%] xs:mix-blend-luminosity"
				src="/images/icat.png"
				alt="iCat"
			/>
		</Card>
		{#each cards as { color, href, text }, index}
			<Card
				onclick={() => {
					if (href != "#") return;
					$flash = { type: 'info', message: 'This page is currently under maintenance.' }
				}}
				className="relative flex-col justify-center items-center gap-2 p-8"
				props={{ color }}
				href={href}
			>
				<img
					class={index == 2 ? 'absolute mb-7 h-[15vw] max-h-16 w-[14vw] max-w-[4.5rem]' : 'h-[12vw] max-h-12'}
					src="/images/{text.toLowerCase()}.png"
					alt="chat"
				/>
				{#if index == 2}
					<div class="h-[2.75rem]"></div>
				{/if}
				<TextBase>{text}</TextBase>
			</Card>
		{/each}
	</div>
</section>
