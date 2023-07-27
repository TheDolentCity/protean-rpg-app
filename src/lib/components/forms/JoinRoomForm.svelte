<script lang="ts">
	let roomId: string = "";
</script>

<form class="flex flex-col text-sm">
	<label for="roomId" class="mb-1 font-semibold font-mono text-focus">Room ID</label>
	<input
		type="text"
    id="roomId"
		name="roomId"
		bind:value={roomId}
		class="h-10 px-3 items-center rounded border border-zinc-700 font-mono text-focus placeholder:text-default bg-inherit"
	/>

  <button title="Join a room" class="flex w-full h-10 mt-4 px-3 items-center justify-center rounded font-medium border border-zinc-700 text-sm text-zinc-100 bg-inherit">
    Join a room
  </button>
</form>
