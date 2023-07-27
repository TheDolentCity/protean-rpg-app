<script lang="ts">
  import { nanoid } from 'nanoid';
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";

	let username: string;
	let roomId: string = nanoid();
</script>

<form class="flex flex-col mt-8 text-sm">
	<label for="username" class="mb-1.5 font-semibold text-focus">Username</label>
	<input
		type="text"
		name="username"
    placeholder="Mysterious Stranger"
		bind:value={username}
		class="h-10 px-3 items-center rounded border border-zinc-700 text-focus placeholder:text-default bg-inherit"
	/>

	<div class="mt-4 mb-1.5 font-semibold text-focus">Room ID</div>
	<div class="flex h-10 pl-3 pr-1 items-center justify-between rounded border border-zinc-700 bg-inherit">
    <span class="select-none">{roomId}</span>
    <button title="Copy room ID to clipboard" class="p-2 rounded hover:bg-zinc-700">
      <Copy size={16} />
    </button>
  </div>

  <button title="Create a room" class="flex h-10 mt-4 px-3 items-center justify-center rounded font-medium text-zinc-900 bg-zinc-100">
    Create a room
  </button>
</form>
