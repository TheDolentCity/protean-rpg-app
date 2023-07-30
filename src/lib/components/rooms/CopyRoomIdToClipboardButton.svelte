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
	class="grow sm:grow-0 flex order-last sm:order-none h-8 gap-3 px-3 items-center justify-center rounded-lg border border-dashed border-zinc-500 text-sm font-mono text-zinc-300 hover:text-white bg-zinc-950 hover:bg-zinc-800 mst"
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
