<script lang="ts">
	import { goto } from '$app/navigation';
	import { socket } from '$lib/sockets/client';
	import { members } from '$lib/stores/members-store';
	import { joiningRoom } from '$lib/stores/socket-store';
	import { user } from '$lib/stores/user-store';
	import { onMount } from 'svelte';
	import { uniqueNamesGenerator, adjectives, animals, type Config } from 'unique-names-generator';
	import type {
		InvalidDataEvent,
		JoinRoomEvent,
		RoomJoinedEvent,
		RoomNotFoundEvent
	} from '$lib/types/socket-types';
	import { validJoinRoom } from '$lib/validation/processors';

	function handleErrorMessage(message: string) {
		console.error(message);
	}

	function onRoomJoined(event: RoomJoinedEvent) {
		console.debug(event);
		$user = event?.user;
		$members = event?.members;
		$joiningRoom = false;
		goto(`/${event?.roomId}`);
	}

	function onRoomNotFound(event: RoomNotFoundEvent) {
		console.debug(event);
		if ($joiningRoom) {
			$joiningRoom = false;
			handleErrorMessage(event?.message);
		}
	}

	function onInvalidData(event: InvalidDataEvent) {
		console.debug(event);
		if ($joiningRoom) {
			$joiningRoom = false;
			handleErrorMessage(event?.message);
		}
	}

	onMount(() => {
		socket.on('room-joined', onRoomJoined);
		socket.on('room-not-found', onRoomNotFound);
		socket.on('invalid-data', onInvalidData);

		return () => {
			socket.off('room-joined', onRoomJoined);
			socket.off('room-not-found', onRoomNotFound);
			socket.off('invalid-data', handleErrorMessage);
		};
	});

	function submit() {
		$joiningRoom = true;
		const nameConfig: Config = {
			dictionaries: [adjectives, animals],
			separator: '-'
		};
		const username: string = uniqueNamesGenerator(nameConfig);
		const joinRoomEvent: JoinRoomEvent = { roomId, username };

		if (validJoinRoom(joinRoomEvent)) {
			socket.emit('join-room', joinRoomEvent);
		} else {
			$joiningRoom = false;
		}
	}

	let roomId: string = '';
</script>

<form on:submit={submit} class="text-sm">
	<label for="roomId" class="block mb-1 font-semibold font-mono text-focus">Room ID</label>
	<input
		type="text"
		id="roomId"
		name="roomId"
		bind:value={roomId}
		class="w-full h-10 px-3 items-center rounded border border-zinc-700 font-mono text-focus placeholder:text-default bg-inherit"
	/>

	<button
		title="Join a room"
		class="flex w-full h-10 mt-4 px-3 items-center justify-center rounded font-medium border border-zinc-700 text-sm text-zinc-100 bg-inherit hover:bg-zinc-700 mst"
	>
		Join a room
	</button>
</form>
