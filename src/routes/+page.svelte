<script lang="ts">
	import CreateRoomForm from "$lib/components/forms/CreateRoomForm.svelte";
</script>

<div class="flex w-screen h-[100svh] items-center justify-center text-default bg-zinc-900">
  <div class="max-w-sm p-6 rounded border border-zinc-700">
    <h1 class="mb-1 text-2xl tracking-tight font-semibold text-focus">Protean</h1>
    <p class="text-base">Send messages and roll dice in real-time with friends.</p>
    <CreateRoomForm />

    <div class="flex gap-2 mt-4 items-center">
      <div class="w-full h-[1px] bg-zinc-700" />
      <span class="text-xs font-semibold uppercase">OR</span>
      <div class="w-full h-[1px] bg-zinc-700" />
    </div>
  
    <button title="Join a room" class="flex w-full h-10 mt-4 px-3 items-center justify-center rounded font-medium border border-zinc-700 text-sm text-zinc-100 bg-inherit">
      Join a room
    </button>
  </div>
</div>