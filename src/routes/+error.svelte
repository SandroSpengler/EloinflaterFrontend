<script lang="ts">
	import { page } from '$app/stores';

	const emojis: any = {
		// TODO add the rest!
		404: '🫠',
		500: ''
	};
</script>

<div
	class="flex mx-auto my-64 dark:bg-primary-700 max-w-3xl p-4 border-2 dark:border-none rounded-sm"
>
	{#if $page.status === 500}
		<h2 class="text-lg">
			An Error has occured while requesting data from the server. Please try again later.
		</h2>
	{/if}
</div>
