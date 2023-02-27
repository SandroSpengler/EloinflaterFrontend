<script lang="ts">
	import { toasts } from '../stores/NotificationToast';

	const determineBackgroundColor = (toast: toast): string => {
		if (toast.type === 'info') return 'dark:bg-blue-900';
		if (toast.type === 'error') return 'dark:bg-red-900 bg-red-400';
		if (toast.type === 'success') return 'bg-green-800';

		return 'bg-red-300';
	};
</script>

{#if $toasts.length > 0}
	<div class=" absolute bottom-4 md:bottom-12 w-full">
		{#each $toasts as toast (toast.id)}
			<div
				class="max-w-screen-md p-3 md:p-5 rounded-xl my-3 dark:border-none border-2 
				{determineBackgroundColor(toast)}"
			>
				{toast.message}
			</div>
		{/each}
	</div>
{/if}
