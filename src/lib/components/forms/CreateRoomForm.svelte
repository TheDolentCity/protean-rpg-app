<script lang="ts">
	import { goto } from '$app/navigation';
	import { socket } from '$lib/sockets/client';
	import { members } from '$lib/stores/members-store';
	import { creatingRoom } from '$lib/stores/socket-store';
	import { user } from '$lib/stores/user-store';
	import { nanoid } from 'nanoid';
	import { onMount } from 'svelte';
	import { uniqueNamesGenerator, adjectives, animals, type Config } from 'unique-names-generator';
	import type {
		CreateRoomEvent,
		InvalidDataEvent,
		RoomCreatedEvent,
		RoomNotFoundEvent
	} from '$lib/types/socket-types';
	import { validCreateRoom } from '$lib/validation/processors';

	function handleErrorMessage(message: string) {
		console.error(message);
	}

	function onRoomCreated(event: RoomCreatedEvent) {
		console.debug(event);
		$user = event?.user;
		$members = [event?.user];
		$creatingRoom = false;
		goto(`/${event?.roomId}`);
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
		if ($creatingRoom) {
			$creatingRoom = false;
			handleErrorMessage(event?.message);
		}
	}

	onMount(() => {
		socket.on('room-created', onRoomCreated);
		socket.on('room-not-found', onRoomNotFound);
		socket.on('invalid-data', onInvalidData);

		return () => {
			socket.off('room-created', onRoomCreated);
			socket.off('room-not-found', onRoomNotFound);
			socket.off('invalid-data', handleErrorMessage);
		};
	});

	function submit() {
		$creatingRoom = true;
		const roomId: string = nanoid();
		const nameConfig: Config = {
			dictionaries: [adjectives, animals],
			separator: '-'
		};
		const username: string = uniqueNamesGenerator(nameConfig);
		const createRoomEvent: CreateRoomEvent = { roomId, username };

		if (validCreateRoom(createRoomEvent)) {
			socket.emit('create-room', createRoomEvent);
		} else {
			$creatingRoom = false;
		}
	}
</script>

<form on:submit={submit} class="text-sm">
	<button
		type="submit"
		title="Create a room"
		disabled={$creatingRoom}
		class="flex w-full h-10 px-3 items-center justify-center rounded border border-zinc-100 font-medium text-zinc-900 bg-zinc-200 hover:bg-white mst"
	>
		{$creatingRoom ? 'Creating a room' : 'Create a room'}
	</button>
</form>
