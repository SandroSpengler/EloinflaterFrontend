<script lang="ts">
	import { goto } from '$app/navigation';

	import type IHttpError from '../interfaces/IHttpError';

	import { MagnifyingGlass } from 'svelte-heros-v2';

	import { getSummonerByName } from '../services/HttpService';
	import { displayToast } from '../stores/NotificationToast';

	let searchedSummonerName: string = '';
	let lastSearch: string = '';

	const searchSummoner = async (): Promise<void> => {
		if (searchedSummonerName === null || searchedSummonerName === '') {
			displayToast({
				type: 'info',
				message: 'Please provide a Summoner Name'
			});

			return;
		}

		try {
			const summoner = await getSummonerByName(searchedSummonerName);

			goto(`/data/euw/summoner/${summoner.name}`);
		} catch (error: any | IHttpError) {
			displayToast({
				type: 'error',
				message: error.message
			});
		} finally {
			lastSearch = searchedSummonerName;
		}
	};

	const searchViaKeyboard = async (event: KeyboardEvent): Promise<void> => {
		if (event.key !== 'Enter') {
			return;
		}

		if (lastSearch === searchedSummonerName) {
			return;
		}

		await searchSummoner();
	};
</script>

<div>
	<!-- <div class="container mx-auto mt-4 w-10/12">
		<h3>Check any Summoner on EUW for inflation</h3>
	</div> -->
	<div
		class="container mx-auto w-10/12 md:max-w-5xl my-64 flex flex-row justify-between dark:bg-primary-700 dark:text-white border-2 dark:border-none rounded-xl p-3 md:p-5"
	>
		<input
			class="dark:bg-primary-700 focus:outline-none w-full"
			placeholder="Summoner Name"
			type="text"
			bind:value={searchedSummonerName}
			on:keydown={(event) => searchViaKeyboard(event)}
		/>
		<button class="rounded-lg dark:bg-blue-900 p-2" on:click={() => searchSummoner()}>
			<MagnifyingGlass variation="solid" /></button
		>
	</div>
</div>
