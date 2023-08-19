<script lang="ts">
	import { members } from '$lib/stores/members-store';
	import { messages } from '$lib/stores/messages-store';
	import { creatingRoom, joiningRoom, requestingAppState } from '$lib/stores/socket-store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/user-store';
	import MembersPersona from '$lib/components/members/MembersPersona.svelte';
	import CreateMessageForm from '$lib/components/messages/CreateMessageForm.svelte';
	import Messages from '$lib/components/messages/Messages.svelte';
	import CopyRoomIdToClipboardButton from '$lib/components/rooms/CopyRoomIdToClipboardButton.svelte';
	import LeaveRoomButton from '$lib/components/rooms/LeaveRoomButton.svelte';
	import UserPersona from '$lib/components/users/UserPersona.svelte';
	import { socket } from '$lib/sockets/client';
	import type {
		AppStatePreparedEvent,
		AppStateRequestedEvent,
		InvalidDataEvent,
		MembersUpdatedEvent,
		PrepareAppStateEvent,
		RequestAppStateEvent,
		UserUpdatedEvent
	} from '$lib/types/socket-types';
	import { validAppStatePrepared, validRequestAppState } from '$lib/validation/processors';

	function userIsAdmin() {
		return $members?.at(0)?.id == $user?.id;
	}

	function handleErrorMessage(message: string) {
		console.error(message);
	}

	function requestAppState() {
		$requestingAppState = true;

		const event: RequestAppStateEvent = { roomId: $user?.roomId ?? '', userId: $user?.id ?? '' };

		if (validRequestAppState(event)) {
			socket.emit('request-app-state', event);
			socket.on('app-state-requested', onAppStateRequested);
		} else {
			goto('/');
		}
	}

	function onAppStateRequested(event: AppStateRequestedEvent) {
		console.debug(event);
		$members = event.members;
		$messages = event.messages;

		console.debug(`socket-off:app-state-requested:${socket.id}`);
		socket.off('app-state-requested', onAppStateRequested);

		$requestingAppState = false;
	}

	function prepareAppState(event: PrepareAppStateEvent) {
		// Only admin needs to send state
		if (!userIsAdmin()) {
			return;
		}

		const appStatePreparedEvent: AppStatePreparedEvent = {
			roomId: event.roomId,
			userId: event.userId,
			members: $members ?? [],
			messages: $messages ?? []
		};

		console.debug(appStatePreparedEvent);

		if (validAppStatePrepared(appStatePreparedEvent)) {
			socket.emit('app-state-prepared', appStatePreparedEvent);
		}
	}

	function onMembersUpdated(event: MembersUpdatedEvent) {
		console.debug(event);
		$members = event.members;
	}

	function onUserUpdated(event: UserUpdatedEvent) {
		console.debug('onUserUpdated');
		console.debug(event);
		const found = $members?.find((user) => user?.id && user.id === event?.id);
		console.debug(found);
		if (found) {
			found.username = event?.username;
			found.color = event?.color;
			const copy = $members ?? [];
			$members = [...copy];
			console.log($members);
		}
	}

	function onInvalidData(event: InvalidDataEvent) {
		console.debug(event);
		$creatingRoom = $creatingRoom ? false : $creatingRoom;
		$joiningRoom = $joiningRoom ? false : $joiningRoom;
		$requestingAppState = $requestingAppState ? false : $requestingAppState;
		handleErrorMessage(event?.message);
	}

	onMount(() => {
		$creatingRoom = false;
		$joiningRoom = false;

		if (!$user) {
			goto('/');
		}

		socket.on('prepare-app-state', prepareAppState);
		socket.on('members-updated', onMembersUpdated);
		socket.on('user-updated', onUserUpdated);
		socket.on('invalid-data', onInvalidData);

		// Listen to prepare app state if we are an admin user
		if (userIsAdmin()) {
		}
		// Request initial app state if we are not an admin user
		else {
			requestAppState();
		}

		return () => {
			socket.off('prepare-app-state', prepareAppState);
			socket.off('members-updated', onMembersUpdated);
			socket.off('user-updated', onUserUpdated);
			socket.off('invalid-data', onInvalidData);
			console.debug(`socket-off:prepare-app-state:${socket.id}`);
			console.debug(`socket-off:members-updated:${socket.id}`);
			console.debug(`socket-off:user-updated:${socket.id}`);
			console.debug(`socket-off:invalid-data:${socket.id}`);
		};
	});
</script>

<div
	class="flex flex-col w-screen h-[100svh] items-center justify-center overscroll-none text-default bg-zinc-950"
	style:colorScheme="dark"
>
	<header class="flex flex-wrap w-full gap-3 px-8 py-4 items-center justify-between">
		<h1 class="text-2xl font-semibold tracking-tight text-focus">Protean</h1>
		<CopyRoomIdToClipboardButton />
		<div class="flex gap-2 items-center">
			<LeaveRoomButton />
			<MembersPersona />
			<UserPersona />
		</div>
	</header>
	<main class="relative flex-auto flex flex-col w-full max-w-xl gap-4 px-8 pb-8 overflow-hidden">
		<Messages />
		<CreateMessageForm />
	</main>
</div>
