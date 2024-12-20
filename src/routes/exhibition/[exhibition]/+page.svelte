<script lang="ts">
import { PageLayout } from '$components/page';
import { page } from '$app/stores';
import { TextBase } from '$components/shared/text';
import { Card, Icon } from '$components/shared/other';
import { ButtonPrimary } from '$components/shared/buttons';
import type { Quiz } from '$lib/types/types';
import { goto } from '$app/navigation';
import * as m from '$lib/paraglide/messages';
import { applyAction, enhance } from '$app/forms';
import { getFlash } from 'sveltekit-flash-message';
import { cn } from '$lib/utils';
import type { PageData } from './$types';

const flash = getFlash(page);

let { data, form }: { data: PageData; form: { correct: boolean } } = $props();

let selectedAnswer: Quiz['correctAnswer'] | undefined = $state();
let isCorrect: boolean = $derived(JSON.parse((form?.correct as unknown as string) || 'false'));
</script>

<PageLayout parentClassName="h-full" className="justify-between" href="/scan" page={m.quiz_name()}>
	{#await data.quiz}
		<div class="flex items-center justify-center h-full">
			<Icon icon="svg-spinners:90-ring-with-bg"></Icon>
		</div>
	{:then data}
		<TextBase>{data.question}</TextBase>
		<form
			class="flex h-full flex-col"
			method="POST"
			action="?/answer"
			use:enhance={() => {
                return async ({result}) => {
                    if (result.type === 'redirect') {
                        await goto(result.location);
                    } else {
                        await applyAction(result);
                    }
                }
            }}
		>
			<input type="hidden" name="isCorrectAnswer" value={selectedAnswer === data.correctAnswer} />
			<div class="my-auto flex flex-col gap-3">
				{#each Object.entries(data.answers) as [key, value]}
					{@const answer = key as Quiz['correctAnswer']}
					{@const isSelected = selectedAnswer === answer}
					<Card
						onclick={(e: Event) => { 
                        e.preventDefault();
                        if (form?.correct) return;
                        selectedAnswer = answer;
                    }}
						className={cn(
                        'rounded-md p-4 transition-shadow bg-light-background-primary text-light-text-muted bg-opacity-10',
                        {
                          'shadow-light-cards-neutral-bg bg-light-cards-neutral-bg': isSelected,
                          'shadow-light-cards-background-bg bg-light-cards-background-bg text-light-cards-background-fg': isSelected && form?.correct !== undefined && !isCorrect,
                          'shadow-light-cards-secondary-bg bg-light-cards-secondary-bg text-light-cards-secondary-fg': (isSelected && isCorrect) || (!isSelected && form?.correct !== undefined && answer === data.correctAnswer),
                        }
                      )}
					>
						<div class="flex gap-2 text-left">
							<TextBase>{key}.</TextBase>
							<TextBase>{value}</TextBase>
						</div>
					</Card>
				{/each}
			</div>
			<ButtonPrimary
				onclick={() => {
                    if (!selectedAnswer) {
                        $flash = { type: 'error', message: m.quiz_error_selection() }
                        return;
                    }
                }}
				disabled={form?.correct !== undefined}>{m.quiz_button()}</ButtonPrimary
			>
		</form>
	{:catch error}
		<TextBase>{m.quiz_error_empty()}</TextBase>
	{/await}
</PageLayout>
