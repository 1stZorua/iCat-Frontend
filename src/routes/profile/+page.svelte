<script lang="ts">
import { page } from '$app/stores';
import { enhance } from '$app/forms';
import { PageLayout } from '$components/page';
import { getFlash } from 'sveltekit-flash-message';
import { ButtonAction, ButtonText } from '$components/shared/buttons';
import { Avatar, Card, Icon } from '$components/shared/other';
import { TextBase, TextHeading, TextLarge, TextSmall } from '$components/shared/text';
import * as m from '$lib/paraglide/messages';
import { formatDate } from '$lib/utils';

const flash = getFlash(page);
const items: { text: string; icon: string; color: string; href: string }[] = [
	{
		text: m.profile_personal(),
		icon: 'mingcute:shield-shape-fill',
		color: 'text-light-cards-neutral-bg',
		href: ''
	},
	{
		text: m.profile_general(),
		icon: 'material-symbols:settings',
		color: 'text-light-cards-primary-bg',
		href: 'profile/general'
	},
	{
		text: m.profile_help(),
		icon: 'material-symbols:help',
		color: 'text-light-cards-secondary-bg',
		href: ''
	},
	{
		text: m.profile_contact(),
		icon: 'material-symbols:call',
		color: 'text-light-cards-accent-bg',
		href: ''
	}
];

const formattedDate = formatDate(
	$page.data.user?.joinedDate as string,
	$page.data.user?.language?.lang as string
);
</script>

<PageLayout page={m.profile_page()}>
	<div class="flex w-full flex-col items-center gap-5">
		<div class="relative w-max">
			<Avatar
				className={`justify-center items-end bg-light-cards-neutral-bg h-28 w-28`}
				imageClassName="h-5/6"
				src="/images/icat.png"
			></Avatar>
			<ButtonAction className="absolute -right-1 -bottom-1">
				<Icon className="text-md" icon="majesticons:pencil"></Icon>
			</ButtonAction>
		</div>
		<div class="flex flex-col text-center">
			<TextLarge className="font-semibold">Emma</TextLarge>
			<TextBase className="text-light-text-muted font-normal"
				>{m.profile_join_date({ date: formattedDate})}</TextBase
			>
		</div>
	</div>
	<div class="flex w-full gap-4">
		<Card
			className="flex flex-col justify-center text-center w-full rounded-md p-6"
			props={{ color: 'primary' }}
		>
			<TextHeading>7</TextHeading>
			<TextSmall className="">{m.profile_correct_answers()}</TextSmall>
		</Card>
		<Card
			className="flex flex-col justify-center text-center w-full rounded-md p-6"
			props={{ color: 'accent' }}
		>
			<TextHeading>105</TextHeading>
			<TextSmall className="">{m.profile_total_coins()}</TextSmall>
		</Card>
	</div>
	<div class="w-full rounded-md bg-light-background-secondary">
		{#each items as { text, icon, color, href }}
			<ButtonText
				onclick={() => {
					if (href) return;
					$flash = { type: 'info', message: m.error_maintenance()}
				}}
				href={href}
				className="flex items-center w-full gap-4 p-4"
			>
				<Icon className="text-md {color}" icon={icon}></Icon>
				<TextBase>{text}</TextBase>
				<Icon className="text-md ml-auto" icon="lucide:chevron-right"></Icon>
			</ButtonText>
		{/each}
		<form action="?/logout" method="post" use:enhance>
			<ButtonText className="flex items-center w-full gap-4 p-4">
				<Icon
					className="text-md text-light-cards-background-bg"
					icon="material-symbols:logout-rounded"
				></Icon>
				<TextBase>{m.profile_logout()}</TextBase>
				<Icon className="text-md ml-auto" icon="lucide:chevron-right"></Icon>
			</ButtonText>
		</form>
	</div>
</PageLayout>
