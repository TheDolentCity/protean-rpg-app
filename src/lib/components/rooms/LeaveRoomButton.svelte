<script lang="ts">
	import { goto } from '$app/navigation';
	import { socket } from '$lib/sockets/client';
	import { createTooltip } from '@melt-ui/svelte';
	import { Exit } from 'carbon-icons-svelte';
	import { fade } from 'svelte/transition';
	import { members } from '$lib/stores/members-store';
	import { messages } from '$lib/stores/messages-store';
	import { user } from '$lib/stores/user-store';

	const { trigger, content, open, arrow } = createTooltip({
		positioning: {
			placement: 'top'
		},
		openDelay: 200,
		closeOnPointerDown: false
	});

	function leave() {
		$user = null;
		$members = null;
		$messages = null;
		socket?.emit('leave-room');
		console.debug(`leave-room:${socket.id}`);
		goto('/');
	}
</script>

<button
	on:click={leave}
	melt={$trigger}
	aria-label="Leave room"
	class="p-1.5 rounded-lg text-zinc-300 bg-zinc-800 hover:bg-zinc-700"
>
	<Exit size={20} />
</button>

{#if $open}
	<div
		melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 rounded-lg shadow-xl bg-zinc-800"
	>
		<div melt={$arrow} />
		<p class="px-3 py-2 text-sm font-medium text-focus">Leave room</p>
	</div>
{/if}
