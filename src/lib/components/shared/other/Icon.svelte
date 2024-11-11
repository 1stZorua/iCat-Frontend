<script lang="ts">
import { cn } from '$lib/utils/merge';
import type { ClassType } from '$components/_types';

let { className, icon }: { className?: ClassType; icon: string } = $props();
</script>

<iconify-icon class={cn("text-xl", className)} icon={icon}></iconify-icon>
