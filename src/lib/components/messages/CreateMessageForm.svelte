<script lang="ts">
	import { DiceRoll } from '@dice-roller/rpg-dice-roller';
	import { user } from '$lib/stores/user-store';
	import { onMount } from 'svelte';
	import type {
		CreateMessageEvent,
		InvalidDataEvent,
		MessageCreatedEvent
	} from '$lib/types/socket-types';
	import { validCreateMessage, validCreateRoom } from '$lib/validation/processors';
	import { socket } from '$lib/sockets/client';
	import { messages } from '$lib/stores/messages-store';

	function handleErrorMessage(message: string) {
		console.error(message);
	}

	function onMessageCreated(event: MessageCreatedEvent) {
		console.debug(event);
		event.message.createdAt = new Date(event.message.createdAt);
		$messages = $messages ? [...$messages, event.message] : [event.message];
	}

	function onInvalidData(event: InvalidDataEvent) {
		console.debug(event);
		handleErrorMessage(event?.message);
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

	function submitOnEnter(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			submit();
		}
	}

	function submit() {
		let text = message;

		try {
			text = new DiceRoll(text).output;
		} catch (error) {
			console.debug(`Text '${text}' was not a valid dice roll.`);
		}

		const createMessageEvent: CreateMessageEvent = {
			roomId: $user?.roomId ?? 'Invalid room',
			message: {
				text,
				color: $user?.color ?? '#333333',
				createdAt: new Date(),
				createdBy: $user?.username ?? 'Unknown user'
			}
		};

		if (validCreateMessage(createMessageEvent)) {
			socket.emit('create-message', createMessageEvent);
		} else {
			console.debug('INVALID MESSAGE');
			console.debug(createMessageEvent);
		}

		message = '';
	}

	let message: string = '';
</script>

<form class="flex-none pr-2 text-sm">
	<textarea
		rows={3}
		id="message"
		name="message"
		placeholder="Send a message"
		bind:value={message}
		on:keypress={submitOnEnter}
		class="w-full px-3 py-2 items-center rounded-lg text-focus bg-zinc-900 resize-none placeholder:text-zinc-500 focus:outline-none focus:bg-zinc-800"
	/>
</form>
