<script lang="ts">
	import { members } from '$lib/stores/members-store';
	import { createPopover } from '@melt-ui/svelte';
	import { Group } from 'carbon-icons-svelte';
	import { fade } from 'svelte/transition';

	const { trigger, content, open, arrow, close } = createPopover();
</script>

<button
	type="button"
	class="p-1.5 rounded-lg text-zinc-300 bg-zinc-800 hover:bg-zinc-700"
	melt={$trigger}
	title="Members"
	aria-label="Members"
>
	<Group size={20} />
</button>

{#if $open}
	<div
		melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 w-30 p-4 rounded-lg bg-zinc-800 shadow-xl"
	>
		<div melt={$arrow} />
		<ul class="flex flex-col gap-1 text-focus">
			{#if $members}
				{#each $members as member}
					<li>{member?.username}</li>
				{/each}
			{/if}
		</ul>
	</div>
{/if}
