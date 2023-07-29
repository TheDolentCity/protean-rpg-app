<script lang="ts">
	export let text: string;
	export let createdAt: Date;
	export let createdBy: string;
</script>

<div class="px-3 py-1 rounded-lg text-base bg-zinc-900">
	<p class="text-xs text-default">{createdAt}</p>
	<p class="text-xs text-default">{createdBy}</p>
	<p class="text-focus">{text}</p>
</div>
