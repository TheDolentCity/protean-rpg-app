<script lang="ts">
	import { goto } from '$app/navigation';
	import { members } from '$lib/stores/members-store';
	import { creatingRoom } from '$lib/stores/socket-store';
	import { user } from '$lib/stores/user-store';
	import { nanoid } from 'nanoid';
	import { onMount } from 'svelte';
	import { uniqueNamesGenerator, adjectives, animals, type Config } from 'unique-names-generator';
	import type {
		CreateMessageEvent,
		CreateRoomEvent,
		InvalidDataEvent,
		MessageCreatedEvent,
		RoomCreatedEvent,
		RoomNotFoundEvent
	} from '$lib/types/socket-types';
	import { validCreateMessage, validCreateRoom } from '$lib/validation/processors';
	import { socket } from '$lib/sockets/client';
	import { messages } from '$lib/stores/messages-store';

	function handleErrorMessage(message: string) {
		console.error(message);
	}

	function onMessageCreated(event: MessageCreatedEvent) {
		console.debug(event);
		$messages = $messages ? [...$messages, event.message] : [event.message];
	}

	function onInvalidData(event: InvalidDataEvent) {
		console.debug(event);
		if ($creatingRoom) {
			$creatingRoom = false;
			handleErrorMessage(event?.message);
		}
	}

	onMount(() => {
		socket.on('message-created', onMessageCreated);
		socket.on('invalid-data', onInvalidData);

		return () => {
			console.debug(`socket-off:message-created:${socket.id}`);
			console.debug(`socket-off:invalid-data:${socket.id}`);
			socket.off('message-created', onMessageCreated);
			socket.off('invalid-data', handleErrorMessage);
		};
	});

	function submit() {
		const createMessageEvent: CreateMessageEvent = {
			roomId: $user?.roomId ?? 'Invalid room',
			message: {
				text: message,
				createdAt: new Date(),
				createdBy: $user?.username ?? 'Unknown user'
			}
		};

		if (validCreateMessage(createMessageEvent)) {
			socket.emit('create-message', createMessageEvent);
		}
	}

	let message: string = '';
</script>

<form on:submit={submit} class="text-sm">
	<label for="message" class="block mb-1 font-semibold font-mono text-focus">New message</label>
	<input
		type="text"
		id="message"
		name="message"
		bind:value={message}
		class="w-full h-10 px-3 items-center rounded border border-zinc-700 font-mono text-focus placeholder:text-default bg-inherit"
	/>
</form>
