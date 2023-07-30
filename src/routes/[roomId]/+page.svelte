<script lang="ts">
	import CreateMessageForm from './../../lib/components/messages/CreateMessageForm.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/user-store';
	import CopyRoomIdToClipboardButton from '$lib/components/rooms/CopyRoomIdToClipboardButton.svelte';
	import LeaveRoomButton from '$lib/components/rooms/LeaveRoomButton.svelte';
	import MembersPersona from '$lib/components/members/MembersPersona.svelte';
	import UserPersona from '$lib/components/users/UserPersona.svelte';
	import Messages from '$lib/components/messages/Messages.svelte';

	onMount(() => {
		if (!$user) {
			goto('/');
		}
	});
</script>

<div
	class="flex flex-col w-screen h-[100svh] items-center justify-center text-default bg-zinc-950"
	style:colorScheme="dark"
>
	<header class="flex w-full gap-3 px-8 py-4 items-center justify-between">
		<h1 class="text-2xl font-semibold tracking-tight text-focus">Protean</h1>
		<CopyRoomIdToClipboardButton />
		<div class="flex gap-2 items-center">
			<LeaveRoomButton />
			<MembersPersona />
			<UserPersona />
		</div>
	</header>
	<main class="relative flex-auto flex flex-col w-full max-w-xl gap-4 px-4 pb-8 overflow-hidden">
		<Messages />
		<CreateMessageForm />
	</main>
</div>
