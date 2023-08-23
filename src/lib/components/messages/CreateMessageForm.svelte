<script lang="ts">
	import { socket } from '$lib/sockets/client';
	import { user } from '$lib/stores/user-store';
	import type { CreateMessageEvent } from '$lib/types/socket-types';
	import { validCreateMessage } from '$lib/validation/processors';
	import { DiceRoll } from '@dice-roller/rpg-dice-roller';

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
			text = text.replaceAll('[', '{');
			text = text.replaceAll(']', '}');
		} catch (error) {
			console.debug(`Text '${text}' was not a valid dice roll.`);
		}

		const createMessageEvent: CreateMessageEvent = {
			roomId: $user?.roomId ?? 'Invalid room',
			message: {
				text,
				createdAt: new Date(),
				createdBy: $user?.id ?? 'Unknown'
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
