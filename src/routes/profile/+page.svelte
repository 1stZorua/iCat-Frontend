<script lang="ts">
import { enhance } from '$app/forms';
import { PageLayout } from '$components/page';
import { ButtonAction, ButtonText } from '$components/shared/buttons';
import { Avatar, Card, Icon } from '$components/shared/other';
import { TextBase, TextHeading, TextLarge, TextSmall } from '$components/shared/text';
import * as m from '$lib/paraglide/messages';
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
			<TextBase className="text-light-text-muted font-normal">{m.profile_join_date()}</TextBase>
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
		<ButtonText className="flex items-center w-full gap-4 p-4">
			<Icon className="text-md text-light-cards-neutral-bg" icon="mingcute:shield-shape-fill"
			></Icon>
			<TextBase>{m.profile_personal()}</TextBase>
			<Icon className="text-md ml-auto" icon="lucide:chevron-right"></Icon>
		</ButtonText>
		<ButtonText href="profile/general" className="flex items-center w-full gap-4 p-4">
			<Icon className="text-md text-light-cards-primary-bg" icon="material-symbols:settings"></Icon>
			<TextBase>{m.profile_general()}</TextBase>
			<Icon className="text-md ml-auto" icon="lucide:chevron-right"></Icon>
		</ButtonText>
		<ButtonText className="flex items-center w-full gap-4 p-4">
			<Icon className="text-md text-light-cards-secondary-bg" icon="material-symbols:help"></Icon>
			<TextBase>{m.profile_help()}</TextBase>
			<Icon className="text-md ml-auto" icon="lucide:chevron-right"></Icon>
		</ButtonText>
		<ButtonText className="flex items-center w-full gap-4 p-4">
			<Icon className="text-md text-light-cards-accent-bg" icon="material-symbols:call"></Icon>
			<TextBase>{m.profile_contact()}</TextBase>
			<Icon className="text-md ml-auto" icon="lucide:chevron-right"></Icon>
		</ButtonText>
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
