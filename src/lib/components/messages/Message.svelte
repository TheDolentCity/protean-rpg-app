<script lang="ts">
	import { CssBuilder } from '$lib/builders/css-builder';
	import Time from 'svelte-time';

	export let text: string;
	export let color: string = '#00FF00';
	export let createdAt: Date;
	export let createdBy: string;
	export let starting: boolean = false;
	export let ending: boolean = false;

	$: contentCss = new CssBuilder()
		.addClass('px-3 [overflow-anchor:none] text-base bg-zinc-900')
		.addClass('py-0.5', !starting && !ending)
		.addClass('pt-2 pb-0.5 rounded-t-lg', starting)
		.addClass('pt-0.5 pb-2 rounded-b-lg', ending)
		.build();
</script>

{#if starting}
	<span class="flex mt-4 mb-1 justify-between">
		<div class="flex gap-2 pl-0.5 items-center">
			<span class="flex-none w-2 h-2 rounded-full" style="background-color: {color};" />
			<p class="truncate text-xs text-default">{createdBy}</p>
		</div>
		<Time relative timestamp={createdAt} class="truncate text-xs text-default" />
	</span>
{/if}
<div class={contentCss}>
	<p class="text-focus whitespace-pre-line">{text}</p>
</div>
