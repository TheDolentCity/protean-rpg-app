<script lang="ts">
	import { user } from '$lib/stores/user-store';
	import { createPopover } from '@melt-ui/svelte';
	import { UserProfile } from 'carbon-icons-svelte';
	import { fade } from 'svelte/transition';
	import type { UpdateUserEvent } from '$lib/types/socket-types';
	import { validUpdateUser } from '$lib/validation/processors';
	import { socket } from '$lib/sockets/client';
	import { onMount } from 'svelte';
	import { messages } from '$lib/stores/messages-store';

	const { trigger, content, open, arrow, close } = createPopover();

	function submit() {
		const updateUserEvent: UpdateUserEvent = {
			id: $user?.id ?? 'Unknown user',
			roomId: $user?.roomId ?? 'Invalid room',
			username,
			color
		};

		if (validUpdateUser(updateUserEvent) && $user) {
			console.log(updateUserEvent);

			$messages?.forEach((message) => {
				if (message && message.createdBy === $user?.username) {
					message.createdBy = username;
					message.color = color;
				}
			});
			$messages = $messages;
			$user.username = username;
			$user.color = color;

			socket.emit('update-user', updateUserEvent);
		} else {
			console.debug('INVALID MESSAGE');
			console.debug(updateUserEvent);
		}
	}

	onMount(() => {
		username = $user?.username ?? 'Unknown user';
		color = $user?.color ?? '#333333';
	});

	let username: string;
	let color: string;
</script>

<button
	type="button"
	class="p-1.5 rounded-lg text-zinc-300 bg-zinc-800 hover:bg-zinc-700"
	melt={$trigger}
	title="User"
	aria-label="User"
>
	<UserProfile size={20} />
</button>

{#if $open}
	<div
		melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 w-30 p-4 rounded-lg bg-zinc-900"
	>
		<div melt={$arrow} />
		<form on:submit|preventDefault={submit} class="text-sm text-focus">
			<label for="username" class="block mb-1 font-semibold">Username</label>
			<input
				type="text"
				id="username"
				name="username"
				bind:value={username}
				class="appearance-none w-full h-10 px-3 items-center rounded-lg placeholder:text-default bg-zinc-950"
			/>
			<label for="color" class="block mt-4 mb-1 font-semibold">Color</label>
			<input type="color" id="color" name="color" bind:value={color} class="color-swatch" />
			<button
				type="submit"
				class="flex w-full h-10 mt-4 px-3 items-center justify-center rounded-lg border border-zinc-100 font-medium text-zinc-900 bg-zinc-200 hover:bg-white mst"
			>
				Save changes
			</button>
		</form>
	</div>
{/if}
