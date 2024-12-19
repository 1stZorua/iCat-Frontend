<script lang="ts">
import type { ClassType } from '$components/_types';
import type { HTMLButtonAttributes } from 'svelte/elements';
import { Button } from '../index';
import { cn } from '$lib/utils';

function onStateChange() {
	state = !state;
	switchState?.(state);
}

interface Props extends HTMLButtonAttributes {
	className?: ClassType;
	state?: boolean;
	switchState?: (state: boolean) => void;
}

let { className, state, switchState, ...rest }: Props = $props();
</script>

<Button
	{...rest}
	onclick={onStateChange}
	className={cn(state ? 'bg-light-btn-primary-bg' : 'bg-light-background-secondary', className)}
	props={{ variant: 'switch' }}
>
	<div
		class="absolute inset-0 h-full w-1/2 rounded-full bg-light-background-primary transition-transform {state ? 'translate-x-full' : 'translate-x-0'}"
	></div>
</Button>
