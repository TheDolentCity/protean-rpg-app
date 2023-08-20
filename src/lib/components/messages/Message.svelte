<script lang="ts">
	import { CssBuilder } from '$lib/builders/css-builder';
	import { members } from '$lib/stores/members-store';
	import type { User } from '$lib/types/socket-types';
	import snarkdown from 'snarkdown';
	import Time from 'svelte-time';
	import { sanitize } from 'isomorphic-dompurify';

	export let text: string;
	export let createdAt: Date;
	export let createdBy: string;
	export let starting: boolean = false;
	export let ending: boolean = false;
	let author: User | undefined;
	let authorName: string;
	let color: string;
	let markdown: string;

	$: markdown = sanitize(snarkdown(text));
	$: author = $members?.find((user) => user?.id && user.id === createdBy);
	$: authorName = author?.username ?? 'Unknown user';
	$: color = author?.color ?? '#00FF00';
	$: contentCss = new CssBuilder()
		.addClass('prose prose-invert px-5 [overflow-anchor:none] text-base bg-zinc-900')
		.addClass('py-0.5', !starting && !ending)
		.addClass('pt-5 pb-0.5 rounded-t-lg', starting)
		.addClass('pt-0.5 pb-5 rounded-b-lg', ending)
		.build();
</script>

{#if starting}
	<span class="flex mt-4 mb-1 justify-between">
		<div class="flex gap-2 pl-0.5 items-center">
			<span class="flex-none w-2 h-2 rounded-full" style="background-color: {color};" />
			<p class="truncate text-xs text-default">{authorName}</p>
		</div>
		<Time relative timestamp={createdAt} class="truncate text-xs text-default" />
	</span>
{/if}
<div class={contentCss}>
	{@html markdown}
</div>
