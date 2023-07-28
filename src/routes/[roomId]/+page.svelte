<script lang="ts">
	import Copy from 'carbon-icons-svelte/lib/Copy.svelte';
	import Exit from 'carbon-icons-svelte/lib/Exit.svelte';
	import Group from 'carbon-icons-svelte/lib/Group.svelte';
	import UserProfile from 'carbon-icons-svelte/lib/UserProfile.svelte';
	import { user } from '$lib/stores/user-store';
	import { socket } from '$lib/sockets/client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import UserPersona from '$lib/components/users/UserPersona.svelte';
	import LeaveRoomButton from '$lib/components/rooms/LeaveRoomButton.svelte';
	import CopyRoomIdToClipboardButton from '$lib/components/rooms/CopyRoomIdToClipboardButton.svelte';
	import MembersPersona from '$lib/components/members/MembersPersona.svelte';

	onMount(() => {
		if (!$user) {
			goto('/');
		}
	});
</script>

<div class="flex flex-col w-screen h-[100svh] items-center justify-center text-default bg-zinc-950">
	<header class="flex w-full gap-3 px-4 py-4 items-center justify-between">
		<h1 class="text-2xl font-semibold tracking-tight text-focus">Protean</h1>
		<CopyRoomIdToClipboardButton />
		<div class="flex gap-2 items-center">
			<LeaveRoomButton />
			<MembersPersona />
			<UserPersona />
		</div>
	</header>
	<main class="flex-auto w-full px-4 pb-4">
		<!-- <div class="flex flex-col w-full h-full gap-3">
			<div class="w-64 h-20 rounded-lg bg-zinc-900" />
			<div class="w-64 h-20 rounded-lg bg-zinc-900" />
			<div class="w-64 h-20 rounded-lg bg-zinc-900" />
			<div class="w-64 h-20 rounded-lg bg-zinc-900" />
			<div class="w-64 h-20 rounded-lg bg-zinc-900" />
		</div> -->
	</main>
</div>
