<script lang="ts">
import { PageLayout } from '$components/page';
import { page } from '$app/stores';
import { toProperCase } from '$lib/utils';
import { ButtonText } from '$components/shared/buttons';
import { Icon } from '$components/shared/other';
import { TextBase } from '$components/shared/text';
import { fade } from 'svelte/transition';
import { enhance } from '$app/forms';

let selectedIndex = $state($page.data.user?.cosmetics.selectedBackground);
</script>

<PageLayout className="" href="/cosmetics" page={toProperCase(Object.values($page.params))}>
	<form
		class="grid h-max grid-cols-3 justify-items-center gap-10"
		method="post"
		action="?/select"
		use:enhance
	>
		<input type="hidden" name="id" value={selectedIndex} />
		{#each Array(5) as _, index}
			{@const isSelected = selectedIndex == index}
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
							class="bg-light-background-tertiary absolute inset-0 h-full w-full bg-opacity-50"
						>
							<Icon
								className="flex items-center justify-center h-full text-light-text-accent text-xl"
								icon="lucide:check"
							></Icon>
						</div>
					{/if}
				</div>
				<TextBase>{isSelected? 'Selected' : 'Owned'}</TextBase>
			</ButtonText>
		{/each}
	</form>
</PageLayout>
