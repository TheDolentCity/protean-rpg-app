<script lang="ts">
	import CreateRoomForm from '$lib/components/forms/CreateRoomForm.svelte';
	import JoinRoomForm from '$lib/components/forms/JoinRoomForm.svelte';
</script>

<div class="flex w-screen h-[100svh] items-center justify-center text-default bg-zinc-950">
	<div class="max-w-sm p-6 rounded-lg bg-zinc-900">
		<h1 class="mb-1 text-2xl tracking-tight font-semibold text-focus">Protean</h1>
		<p class="mb-8 text-base">Send messages and roll dice in real-time with friends.</p>
		<CreateRoomForm />
		<div class="flex gap-2 my-6 items-center">
			<div class="w-full h-[1px] bg-zinc-700" />
			<span class="text-xs font-semibold uppercase">OR</span>
			<div class="w-full h-[1px] bg-zinc-700" />
		</div>
		<JoinRoomForm />
	</div>
</div>
