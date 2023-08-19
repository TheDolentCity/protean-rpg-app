<script lang="ts">
	import { onMount } from 'svelte';
	import CreateRoomForm from '$lib/components/forms/CreateRoomForm.svelte';
	import JoinRoomForm from '$lib/components/forms/JoinRoomForm.svelte';
	import { socket } from '$lib/sockets/client';
	import { creatingRoom, joiningRoom, requestingAppState } from '$lib/stores/socket-store';
	import type {
		InvalidDataEvent,
		RoomCreatedEvent,
		RoomJoinedEvent,
		RoomNotFoundEvent
	} from '$lib/types/socket-types';
	import { user } from '$lib/stores/user-store';
	import { members } from '$lib/stores/members-store';
	import { goto } from '$app/navigation';

	function handleErrorMessage(message: string) {
		console.error(message);
	}

	function onRoomCreated(event: RoomCreatedEvent) {
		console.debug(event);
		$user = event?.user;
		$members = [event?.user];
		goto(`/${event?.roomId}`);
	}

	function onRoomJoined(event: RoomJoinedEvent) {
		console.debug(event);
		$user = event?.user;
		$members = event?.members;
		goto(`/${event?.roomId}`);
		$joiningRoom = false;
	}

	function onRoomNotFound(event: RoomNotFoundEvent) {
		console.debug(event);
		if ($creatingRoom) {
			$creatingRoom = false;
			handleErrorMessage(event?.message);
		}
	}

	function onInvalidData(event: InvalidDataEvent) {
		console.debug(event);
		$creatingRoom = $creatingRoom ? false : $creatingRoom;
		$joiningRoom = $joiningRoom ? false : $joiningRoom;
		handleErrorMessage(event?.message);
	}

	onMount(() => {
		$requestingAppState = false;

		socket.on('room-created', onRoomCreated);
		socket.on('room-joined', onRoomJoined);
		socket.on('room-not-found', onRoomNotFound);
		socket.on('invalid-data', onInvalidData);

		return () => {
			socket.off('room-created', onRoomCreated);
			socket.off('room-joined', onRoomJoined);
			socket.off('room-not-found', onRoomNotFound);
			socket.off('invalid-data', handleErrorMessage);
			console.debug(`socket-off:room-created:${socket.id}`);
			console.debug(`socket-off:room-joined:${socket.id}`);
			console.debug(`socket-off:room-not-found:${socket.id}`);
			console.debug(`socket-off:invalid-data:${socket.id}`);
		};
	});
</script>

<div class="flex w-screen h-[100svh] p-8 items-center justify-center text-default bg-zinc-950">
	<div class="max-w-sm p-6 rounded-lg bg-zinc-900">
		<h1 class="mb-1 text-2xl tracking-tight font-semibold text-focus">Protean</h1>
		<p class="mb-8 text-base">Send messages and roll dice in real-time with friends.</p>
		<CreateRoomForm />
		<div class="flex gap-2 my-6 items-center">
			<div class="w-full h-[1px] bg-zinc-700" />
			<span class="text-xs font-semibold uppercase">OR</span>
			<div class="w-full h-[1px] bg-zinc-700" />
		</div>
		<JoinRoomForm />
	</div>
</div>
