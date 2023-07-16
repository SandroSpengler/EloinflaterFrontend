<script lang="ts">
	import { toasts } from '../stores/NotificationToast';

	import { XCircle, InformationCircle } from 'svelte-heros-v2';
	import { fly } from 'svelte/transition';
	import type { toast } from '../types/toast';

	const determineIconBackgroundColor = (toast: toast): string => {
		if (toast.type === 'info') return 'dark:bg-orange-700 bg-orange-300';
		if (toast.type === 'error') return 'dark:bg-red-600 bg-red-300';
		if (toast.type === 'success') return 'bg-green-800';

		return 'bg-red-300';
	};
</script>

{#if $toasts.length > 0}
	<div class="fixed bottom-4 w-full md:bottom-12 md:w-fit md:max-w-screen-md md:pl-4 ">
		{#each $toasts as toast (toast.id)}
			<div
				class="my-3 flex rounded-md border-black align-middle dark:border-none"
				transition:fly={{ y: 30, duration: 350 }}
			>
				<div
					class="rounded-l-md p-3
					{determineIconBackgroundColor(toast)}"
				>
					{#if toast.type === 'info'}
						<InformationCircle size="30" />
					{/if}
					{#if toast.type === 'error'}
						<XCircle size="30" />
					{/if}
				</div>
				<div class="rounded-r-md p-3 dark:bg-primary-800">
					{toast.message}
				</div>
			</div>
		{/each}
	</div>
{/if}
