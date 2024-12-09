<script lang="ts">
import { enhance } from '$app/forms';
import { page } from '$app/stores';
import { PageLayout } from '$components/page';
import { Card, Icon } from '$components/shared/other';
import { TextBase } from '$components/shared/text';
import type { Language } from '$lib/types/types';
import { fade } from 'svelte/transition';
import * as m from '$lib/paraglide/messages';

const languages: Language[] = [
	{
		name: m.profile_language_dutch(),
		lang: 'nl-nl',
		icon: 'netherlands'
	},
	{
		name: m.profile_language_english(),
		lang: 'en-us',
		icon: 'united-states'
	}
];

let selectedLanguage = $state($page.data.user?.language);
</script>

<PageLayout href="/profile/general" page={m.profile_language_name()}>
	<form class="flex flex-col gap-5" method="post" action="?/select" use:enhance>
		<input type="hidden" name="language" value={JSON.stringify(selectedLanguage)} />
		{#each languages as lang}
			{@const isSelected = selectedLanguage?.lang === lang.lang}
			<Card
				onclick={() => selectedLanguage = lang}
				className="relative rounded-md bg-light-background-primary flex items-center gap-3 overflow-hidden"
			>
				{#if isSelected}
					<div
						transition:fade
						class="absolute inset-0 h-full w-full bg-light-background-tertiary bg-opacity-50"
					>
						<Icon
							className="flex items-center justify-center h-full text-light-text-accent text-xl"
							icon="lucide:check"
						></Icon>
					</div>
				{/if}
				<div
					class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm bg-light-background-secondary"
				>
					<Icon icon={`emojione-v1:flag-for-${lang.icon}`}></Icon>
				</div>
				<div class="flex flex-col items-start text-light-text-primary">
					<TextBase>{lang.name}</TextBase>
				</div>
			</Card>
		{/each}
	</form>
</PageLayout>
