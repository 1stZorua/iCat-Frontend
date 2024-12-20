<script lang="ts">
import { page } from '$app/stores';
import { enhance } from '$app/forms';
import { PageLayout } from '$components/page';
import type { Preference } from '$lib/types/types';
import * as m from '$lib/paraglide/messages';
import { ButtonSwitch } from '$components/shared/buttons';
import { TextBase, TextSmall } from '$components/shared/text';

const preferences: Preference[] = [
	{
		state: 'camera',
		name: m.profile_preferences_camera_name(),
		description: m.profile_preferences_camera_description()
	}
];

let elForm: HTMLFormElement;

let states = $state(
	preferences.reduce(
		(acc, preference) => {
			acc[preference.state] =
				($page.data.user?.preferences[preference.state.toLowerCase()] as boolean) || false;
			return acc;
		},
		{} as Record<string, boolean>
	)
);
let activeState: { name: string; value: boolean } = $state({ name: '', value: false });

function onCardClick(e: Event) {
	e.preventDefault();
	e.stopPropagation();

	(e.target as HTMLElement).querySelector('button')?.click();
}

$effect(() => {
	if (activeState.name) {
		elForm.requestSubmit();
	}
});
</script>

<PageLayout href="/profile/general" page={m.profile_preferences_name()}>
	<form bind:this={elForm} class="flex flex-col gap-5" method="post" action="?/switch" use:enhance>
		<input type="hidden" name="state" value={JSON.stringify(activeState)} />
		{#each preferences as preference}
			<div
				onclick={onCardClick}
				onkeydown={(e: KeyboardEvent) => {
					if (e.key !== 'Enter' && e.key !== ' ') return;
					onCardClick(e);
				}}
				class="flex items-center gap-3 rounded-md bg-light-background-primary p-3 text-light-text-primary shadow-md"
				role="button"
				tabindex="0"
			>
				<div class="flex h-12 w-12 items-center justify-center">
					<ButtonSwitch
						className="pointer-events-none"
						tabindex={-1}
						state={JSON.parse(states[preference.state.toLowerCase()] as unknown as string)}
						switchState={(s) => {
                            activeState = { name: preference.state, value: s };
                            states.camera = s;
                        }}
					></ButtonSwitch>
				</div>
				<div class="pointer-events-none flex flex-col items-start text-left">
					<TextBase>{preference.name}</TextBase>
					<TextSmall className="text-light-text-muted">{preference.description}</TextSmall>
				</div>
			</div>
		{/each}
	</form>
</PageLayout>
