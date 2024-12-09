<script lang="ts">
import { PageLayout } from '$components/page';
import { page } from '$app/stores';
import { toProperCase } from '$lib/utils';
import { ButtonText } from '$components/shared/buttons';
import { Icon } from '$components/shared/other';
import { TextBase } from '$components/shared/text';
import { fade } from 'svelte/transition';
import { enhance } from '$app/forms';
import * as m from '$lib/paraglide/messages';

let selectedIndex = $state($page.data.user?.cosmetics.selectedBackground);
</script>

<PageLayout href="/cosmetics" page={toProperCase(Object.values($page.params))}>
	<form
		class="grid h-max grid-cols-3 justify-items-center gap-10"
		method="post"
		action="?/select"
		use:enhance
	>
		<input type="hidden" name="id" value={selectedIndex} />
		{#each Array(5) as _, index}
			{@const isSelected = selectedIndex === index}
			<ButtonText
				onclick={() => selectedIndex = index}
				className="flex-col items-center gap-4 max-w-max"
			>
				<div class="relative overflow-hidden rounded-full">
					<img
						class="h-20 w-20 object-cover"
						src="/images/cosmetics/background_{index}.svg"
						alt="cosmetic"
					/>
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
				</div>
				<TextBase>{isSelected? m.cosmetics_selected() : m.cosmetics_owned()}</TextBase>
			</ButtonText>
		{/each}
	</form>
</PageLayout>
