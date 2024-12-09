<script lang="ts">
import { PageLayout } from '$components/page';
import { ButtonPrimary } from '$components/shared/buttons';
import { Avatar } from '$components/shared/other';
import { TextBase, TextHeading, TextSmall } from '$components/shared/text';
import * as m from '$lib/paraglide/messages';
</script>

<PageLayout parentClassName="h-full" href="/introduction" header={{ state: false }}>
	<div class="flex h-full w-full flex-col items-center justify-between gap-8">
		<div class="my-auto flex h-[22.5rem] flex-col items-center gap-6">
			<Avatar
				className={`justify-center items-end bg-light-background-secondary h-56 w-56`}
				imageClassName="h-5/6"
				src="/images/icat.png"
			></Avatar>
			<div class="flex flex-col items-center gap-2 text-center">
				<TextHeading>{m.introduction_heading()}</TextHeading>
				<TextSmall className="w-[90%]">{m.introduction_description()}</TextSmall>
			</div>
		</div>
		<ButtonPrimary className="max-w-52 w-full" href="/introduction/create">
			<TextBase className="text-nowrap">{m.introduction_button()}</TextBase>
		</ButtonPrimary>
	</div>
</PageLayout>
