<script lang="ts">
	import { onMount } from 'svelte';
	import { messages } from '$lib/stores/messages-store';
	import Message from '$lib/components/messages/Message.svelte';

	function messagesFarApart(earlierDate: Date, laterDate: Date): boolean {
		const differenceInMinutes = 5;
		const differenceInMilliseconds = 60000 * differenceInMinutes;
		let comparison = earlierDate.getTime();
		comparison += differenceInMilliseconds;

		return laterDate.getTime() > comparison;
	}

	let container: HTMLElement;

	onMount(() => {
		container.scrollTop = container.scrollHeight;
	});
</script>

<div
	bind:this={container}
	class="flex-auto flex flex-col w-full pr-2 rounded-b-lg overflow-y-scroll"
>
	{#if $messages}
		{#each $messages as message, i}
			<Message
				text={message?.text}
				createdAt={message?.createdAt}
				createdBy={message?.createdBy}
				starting={i - 1 < 0 ||
					$messages[i - 1].createdBy !== message.createdBy ||
					messagesFarApart($messages[i - 1].createdAt, message.createdAt)}
				ending={i + 1 >= $messages.length ||
					$messages[i + 1].createdBy !== message.createdBy ||
					messagesFarApart(message.createdAt, $messages[i + 1].createdAt)}
			/>
		{/each}
		<hr class="h-px invisible [overflow-anchor:auto]" />
	{:else}
		<div
			class="flex-auto flex px-20 py-10 items-center justify-center rounded-lg border border-dashed border-zinc-500"
		>
			<h1 class="text-xl text-focus">No messages</h1>
		</div>
	{/if}
</div>
