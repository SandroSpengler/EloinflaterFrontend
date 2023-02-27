<script lang="ts">
	import { toasts } from '../stores/NotificationToast';

	import { XCircle, InformationCircle } from 'svelte-heros-v2';

	const determineIconBackgroundColor = (toast: toast): string => {
		if (toast.type === 'info') return 'dark:bg-orange-700 bg-orange-300';
		if (toast.type === 'error') return 'dark:bg-red-600 bg-red-300';
		if (toast.type === 'success') return 'bg-green-800';

		return 'bg-red-300';
	};
</script>

{#if $toasts.length > 0}
	<div class=" absolute w-full md:w-fit md:max-w-screen-md bottom-4 md:bottom-12 md:pl-4">
		{#each $toasts as toast (toast.id)}
			<div class="dark:border-none border-2 rounded-md flex align-middle">
				<div
					class="p-3
					{determineIconBackgroundColor(toast)}"
				>
					{#if toast.type === 'info'}
						<InformationCircle size="30" />
					{/if}
					{#if toast.type === 'error'}
						<XCircle size="30" />
					{/if}
				</div>
				<div class="p-3 dark:bg-primary">
					{toast.message}
				</div>
			</div>
		{/each}
	</div>
{/if}
