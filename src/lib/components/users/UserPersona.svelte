<script lang="ts">
	import { user } from '$lib/stores/user-store';
	import { createPopover } from '@melt-ui/svelte';
	import { UserProfile } from 'carbon-icons-svelte';
	import { fade } from 'svelte/transition';

	const { trigger, content, open, arrow, close } = createPopover();
</script>

<button
	type="button"
	class="p-1.5 rounded-lg text-zinc-300 bg-zinc-800 hover:bg-zinc-700"
	melt={$trigger}
	aria-label="User persona"
>
	<UserProfile size={20} />
</button>

{#if $open}
	<div
		melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 w-30 p-4 rounded-lg bg-zinc-800 shadow-xl"
	>
		<div melt={$arrow} />
		<form class="text-sm text-focus">
			<label for="username" class="block mb-1 font-semibold">Username</label>
			<input
				type="text"
				id="username"
				name="username"
				disabled
				value={$user?.username}
				class="w-full h-10 px-3 items-center rounded-lg border border-zinc-600 placeholder:text-default bg-zinc-900"
			/>
		</form>
	</div>
{/if}
