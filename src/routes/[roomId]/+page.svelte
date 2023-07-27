<script lang="ts">
	import { user } from '$lib/stores/user-store';
</script>

<div class="flex w-screen h-[100svh] items-center justify-center text-default bg-zinc-950">
	<div class="max-w-sm p-6 rounded">
		<h1 class="mb-1 text-2xl tracking-tight font-semibold text-focus">Protean</h1>
		<h2 class="text-lg">
			Room <span class="text-focus">{$user?.roomId}</span>
		</h2>
		<h2 class="text-lg">
			Logged in as <span class="text-focus">{$user?.username}</span>
		</h2>
	</div>
</div>
