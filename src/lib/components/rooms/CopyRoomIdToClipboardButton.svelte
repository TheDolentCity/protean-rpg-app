<script lang="ts">
	import { user } from '$lib/stores/user-store';
	import { createTooltip } from '@melt-ui/svelte';
	import { Copy } from 'carbon-icons-svelte';
	import { fade } from 'svelte/transition';

	const { trigger, content, open, arrow } = createTooltip({
		positioning: {
			placement: 'top'
		},
		openDelay: 200,
		closeOnPointerDown: false
	});

	function copyRoomIdToClipboard() {
		if ($user?.roomId) {
			navigator.clipboard.writeText($user.roomId);
		}
	}
</script>

<button
	on:click={copyRoomIdToClipboard}
	melt={$trigger}
	aria-label="Copy Room ID"
	class="flex gap-3 px-3 py-2 items-center justify-center rounded-lg text-sm font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 mst"
>
	<span>{$user?.roomId}</span>
	<Copy size={16} />
</button>

{#if $open}
	<div
		melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 rounded-lg shadow-xl bg-zinc-800"
	>
		<div melt={$arrow} />
		<p class="px-3 py-2 text-sm font-medium text-focus">Copy Room ID</p>
	</div>
{/if}
