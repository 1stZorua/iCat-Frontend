<script lang="ts">
import { page } from '$app/stores';
import { PageLayout } from '$components/page';
import { Card, Icon } from '$components/shared/other';
import { TextBase, TextSmall } from '$components/shared/text';
import * as m from '$lib/paraglide/messages';

const icon = $derived($page.data.user?.language?.icon);
</script>

<PageLayout href="/profile" page={m.profile_general()}>
	<Card
		href="general/language"
		className="rounded-md bg-light-background-primary flex items-center gap-3"
	>
		<div
			class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm bg-light-background-secondary"
		>
			<Icon icon="emojione-v1:flag-for-{icon}"></Icon>
		</div>
		<div class="flex flex-col text-light-text-primary">
			<TextBase>{m.profile_language_name()}</TextBase>
			<TextSmall className="text-light-text-muted">{m.profile_language_description()}</TextSmall>
		</div>
	</Card>
	<Card
		href="general/preferences"
		className="rounded-md bg-light-background-primary flex items-center gap-3"
	>
		<div
			class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm bg-light-background-secondary"
		>
			<Icon icon="flat-color-icons:settings"></Icon>
		</div>
		<div class="flex flex-col text-light-text-primary">
			<TextBase>{m.profile_preferences_name()}</TextBase>
			<TextSmall className="text-light-text-muted">{m.profile_preferences_description()}</TextSmall>
		</div>
	</Card>
</PageLayout>
