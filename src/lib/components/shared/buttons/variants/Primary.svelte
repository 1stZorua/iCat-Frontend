<script lang="ts">
import type { ClassType } from '$components/_types';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import { Button } from '../index';

interface Props extends HTMLButtonAttributes {
	className?: ClassType;
	href?: string;
	children?: Snippet;
}

let { className, href, children, ...rest }: Props = $props();
</script>

<Button {...rest} className={className} href={href} props={{ variant: 'primary' }}>
	{@render children?.()}
</Button>
