<script lang="ts">
import { enhance } from '$app/forms';
import { PageLayout } from '$components/page';
import { ButtonPrimary } from '$components/shared/buttons';
import { Avatar } from '$components/shared/other';
import Icon from '$components/shared/other/Icon.svelte';
import { TextBase, TextHeading } from '$components/shared/text';
import { cn } from '$lib/utils';
import emblaCarouselSvelte from 'embla-carousel-svelte';

let emblaApi: any;
let age = $state(2);

const onInit = (event: CustomEvent) => {
	emblaApi = event.detail;
	emblaApi.on('select', onSelect);
	onSelect();
};

const onSelect = () => {
	if (!emblaApi) return;
	age = emblaApi.selectedScrollSnap();
};
</script>

{#snippet arrow(icon: string, isSelected: boolean)}
	{#if isSelected}
		<Icon icon={icon}></Icon>
	{/if}
{/snippet}

<PageLayout parentClassName="h-full" href="/introduction" page="Create Profile">
	<div class="flex h-full w-full flex-col items-center justify-between gap-8">
		<div class="my-auto flex h-[22.5rem] w-full flex-col items-center gap-6">
			<Avatar
				className={`justify-center items-end bg-light-background-secondary h-56 w-56`}
				imageClassName="h-5/6"
				src="/images/icat.png"
			></Avatar>
			<div class="flex w-full flex-col gap-2 text-center">
				<TextHeading>Your Age</TextHeading>
				<div
					class="embla cursor-grab overflow-hidden"
					use:emblaCarouselSvelte={{ options: { loop: true, skipSnaps: true, align: 'center', startIndex: 2  }, plugins: [] }}
					onemblaInit={onInit}
				>
					<div class="embla__container flex items-center">
						{#each Array.from({length: 97}, (v, k) => k + 1) as _, i}
							{@const isSelected = age === i}
							<div
								class="embla__slide relative flex min-w-0 flex-[0_0_20%] items-center justify-center"
							>
								{@render arrow('material-symbols:arrow-right-rounded', isSelected)}
								<TextHeading
									className={cn('transition-colors select-none', isSelected ? 'text-[2.5rem]' : 'text-light-text-muted text-opacity-50')}
									>{i + 3}</TextHeading
								>
								{@render arrow('material-symbols:arrow-left-rounded', isSelected)}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<form method="post" action="?/create" class="flex w-full justify-center" use:enhance>
			<input type="hidden" name="age" value={age + 3} required />
			<ButtonPrimary className="max-w-52 w-full">
				<TextBase>Next</TextBase>
			</ButtonPrimary>
		</form>
	</div>
</PageLayout>
