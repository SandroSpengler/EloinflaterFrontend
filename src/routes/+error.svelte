<script lang="ts">
	import { page } from '$app/stores';

	const emojis: any = {
		// TODO add the rest!
		404: '🫠',
		500: ''
	};
</script>

<div
	class="mx-auto my-64 flex max-w-3xl rounded-sm border-2 p-4 dark:border-none dark:bg-primary-700"
>
	{#if $page.status === 500}
		<h2 class="text-lg">
			An Error has occured while requesting data from the server. Please try again later.
		</h2>
	{/if}
	{#if $page.status === 404}
		<h2 class="text-lg">The requested ressource has not been found</h2>
	{/if}
</div>
