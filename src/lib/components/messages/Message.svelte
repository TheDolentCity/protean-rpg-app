<script lang="ts">
	import { CssBuilder } from '$lib/builders/css-builder';
	import Time from 'svelte-time';

	export let text: string;
	export let createdAt: Date;
	export let createdBy: string;
	export let starting: boolean = false;
	export let ending: boolean = false;

	$: contentCss = new CssBuilder()
		.addClass('px-3 text-base bg-zinc-900')
		.addClass('py-0.5', !starting && !ending)
		.addClass('pt-2 rounded-t-lg', starting)
		.addClass('pb-2 rounded-b-lg', ending)
		.build();
</script>

{#if starting}
	<span class="flex mt-4 mb-1 justify-between">
		<p class="text-xs text-default">{createdBy}</p>
		<Time relative timestamp={createdAt} class="text-xs text-default" />
	</span>
{/if}
<div class={contentCss}>
	<p class="text-focus">{text}</p>
</div>
