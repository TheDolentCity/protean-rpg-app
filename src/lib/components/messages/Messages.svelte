<script lang="ts">
	import { messages } from '$lib/stores/messages-store';
	import Message from '$lib/components/messages/Message.svelte';

	function messagesFarApart(earlierDate: Date, laterDate: Date): boolean {
		console.log(earlierDate);
		console.log(laterDate);
		const differenceInMinutes = 3;
		const differenceInMilliseconds = 60000 * differenceInMinutes;
		let comparison = earlierDate.getUTCMilliseconds();
		comparison += differenceInMilliseconds;

		return laterDate.getUTCMilliseconds() > comparison;
	}
</script>

<div class="flex-auto flex flex-col w-full pr-2 overflow-y-scroll">
	{#if $messages}
		{#each $messages as message, i}
			<Message
				text={message?.text}
				createdAt={message?.createdAt}
				createdBy={message?.createdBy}
				starting={i - 1 < 0 ||
					$messages[i - 1].createdBy !== message.createdBy ||
					messagesFarApart($messages[i - 1].createdAt, message.createdAt)}
				ending={i + 1 >= $messages.length || $messages[i + 1].createdBy !== message.createdBy}
			/>
		{/each}
	{:else}
		<div
			class="flex-auto flex px-20 py-10 items-center justify-center rounded-lg border border-dashed border-zinc-500"
		>
			<h1 class="text-xl text-focus">No messages</h1>
		</div>
	{/if}
</div>
