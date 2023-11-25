<script lang="ts">
	import { toasts } from '../stores/NotificationToast';
	import { Toast } from 'flowbite-svelte';

	import { ExclamationCircleOutline, InfoCircleOutline } from 'flowbite-svelte-icons';
	import type { toast } from '../types/toast';

	const determineIconBackgroundColor = (toast: toast): 'green' | 'red' | undefined => {
		if (toast.type === 'error') return 'red';
		if (toast.type === 'success') return 'green';

		return;
	};
</script>

{#if $toasts.length > 0}
	<div class="fixed bottom-4 w-full md:bottom-12 md:w-fit md:max-w-screen-md md:pl-4">
		{#each $toasts as toast (toast.id)}
			<div>
				<Toast color={determineIconBackgroundColor(toast)} class="mb-2 dark:text-white">
					<svelte:fragment slot="icon">
						{#if toast.type === 'info'}
							<InfoCircleOutline class="h-6 w-6" />
						{/if}

						{#if toast.type === 'error'}
							<ExclamationCircleOutline class="h-6 w-6" />
						{/if}

						<span class="sr-only">Check icon</span>
					</svelte:fragment>
					<p class="text-base">
						{toast.message}
					</p>
				</Toast>
			</div>
		{/each}
	</div>
{/if}
