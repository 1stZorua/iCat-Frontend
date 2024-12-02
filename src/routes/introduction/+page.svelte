<script lang="ts">
import { PageLayout } from '$components/page';
import { ButtonPrimary } from '$components/shared/buttons';
import { Avatar } from '$components/shared/other';
import { TextBase, TextHeading, TextSmall } from '$components/shared/text';
</script>

<PageLayout href="/introduction" header={false}>
	<div class="flex h-full w-full flex-col items-center justify-between gap-8">
		<div class="my-auto flex flex-col items-center gap-6">
			<Avatar
				className={`justify-center items-end bg-light-background-secondary h-56 w-56`}
				imageClassName="h-5/6"
				src="/images/icat.png"
			></Avatar>
			<div class="flex flex-col items-center gap-2 text-center">
				<TextHeading>Interactive Experience</TextHeading>
				<TextSmall className="w-[90%]"
					>Ask questions, scan exhibits, and discover stories behind every display.</TextSmall
				>
			</div>
		</div>
		<ButtonPrimary href="/introduction/create">
			<TextBase>Get Started</TextBase>
		</ButtonPrimary>
	</div>
</PageLayout>
