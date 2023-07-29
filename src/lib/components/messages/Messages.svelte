<script lang="ts">
	import { messages } from '$lib/stores/messages-store';
	import Message from '$lib/components/messages/Message.svelte';
</script>

<div class="flex flex-col w-full">
	{#if $messages}
		{#each $messages as message}
			<Message text={message?.text} createdAt={message?.createdAt} createdBy={message?.createdBy} />
		{/each}
	{:else}
		<div
			class="flex px-20 py-10 items-center justify-center rounded-lg border border-dashed border-zinc-500"
		>
			<h1 class="text-xl text-focus">No messages</h1>
		</div>
	{/if}
</div>
