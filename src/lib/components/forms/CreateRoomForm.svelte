<script lang="ts">
	import { creatingRoom } from '$lib/stores/socket-store';
	import { nanoid } from 'nanoid';
	import { uniqueNamesGenerator, adjectives, animals, type Config } from 'unique-names-generator';
	import type { CreateRoomEvent } from '$lib/types/socket-types';
	import { validCreateRoom } from '$lib/validation/processors';
	import { socket } from '$lib/sockets/client';

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
		class="flex w-full h-10 px-3 items-center justify-center rounded-lg border border-zinc-100 font-medium text-zinc-900 bg-zinc-200 hover:bg-white mst"
	>
		{$creatingRoom ? 'Creating a room' : 'Create a room'}
	</button>
</form>
