<script lang="ts">
	import { goto } from '$app/navigation';

	import type IHttpError from '../interfaces/IHttpError';

	import { getSummonerByName } from '../services/HttpService';
	import { displayToast } from '../stores/NotificationToast';

	import { Button, ButtonGroup, Card, GradientButton, Input, Label, Select } from 'flowbite-svelte';

	import { SearchOutline } from 'flowbite-svelte-icons';
	import { ceil, debounce, throttle } from 'lodash';
	import { fade, fly } from 'svelte/transition';
	import type ISummoner from '../interfaces/ISummoner';
	import type { regions } from '../types/region';

	let searchedSummonerName: string = '';
	let lastSearch: string = '';
	let summonerSuggestions: ISummoner[] = [];
	let searchRegion: regions = 'euw';

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
		if (searchedSummonerName === '') {
			summonerSuggestions = [];

			return;
		}

		if (lastSearch === searchedSummonerName) {
			return;
		}

		if (event.key === 'Enter') {
			await searchSummoner();

			return;
		}

		summonerSuggestions = [];
		summonerSuggestions = [
			...summonerSuggestions,
			{ name: searchedSummonerName } as any,
			{ name: searchedSummonerName + 'XD' } as any
		];
	};
</script>

<div class="mt-64 w-full">
	<div class="mx-4 dark:border-none dark:text-white md:mx-auto md:max-w-5xl md:p-3">
		<ButtonGroup class=" w-full bg-gray-200">
			<Label
				class="w-6/12 rounded-l-lg p-2 font-bold dark:bg-primary-600 dark:text-white md:w-2/12"
			>
				Region
				<Select
					class="visible m-0 mb-1 mt-2 content-center rounded-none rounded-r-none border-none bg-gray-200 p-0 font-normal dark:bg-primary-600 dark:text-gray-400 dark:outline-none sm:text-sm md:text-lg"
					placeholder="EUW"
				></Select>
			</Label>
			<Label class="w-full p-2 font-bold dark:bg-primary-700 dark:text-white">
				Search
				<Input
					class="m-0 mb-1 mt-2 w-full rounded-none border-none bg-gray-200 p-0 font-normal dark:border-none dark:bg-primary-700 dark:text-gray-400 sm:text-sm md:text-lg"
					placeholder="Summoner Name"
					bind:value={searchedSummonerName}
					on:keyup={debounce(searchViaKeyboard, 200)}
				/>
			</Label>

			<GradientButton
				color="purpleToBlue"
				disabled={searchedSummonerName === '' ? true : false}
				on:click={() => searchSummoner()}
			>
				<SearchOutline class="h-5 w-5" />
			</GradientButton>
		</ButtonGroup>

		{#if summonerSuggestions.length > 0}
			<div
				class="mt-4 max-h-96 overflow-auto rounded-lg bg-gray-200 p-3 dark:bg-primary-700"
				in:fade={{
					duration: 200
				}}
				out:fade={{
					duration: 200
				}}
			>
				{#each summonerSuggestions as suggestion}
					<div>
						<Card size="xl" class="mt-3 hover:bg-primary-500 hover:text-white">
							<figure class="flex flex-col text-center md:rounded-t-none">
								<figcaption class="flex items-center space-x-3">
									<img
										class="h-12 w-12 rounded-lg"
										src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon0.png"
										alt="SummonerProfilePicture"
									/>
									<div class="space-y-0.5 text-left font-medium dark:text-white">
										<div class="text-base font-bold md:text-lg">{suggestion.name}</div>
										<div class="text-sm font-light">Level 578</div>
									</div>
								</figcaption>
							</figure>
						</Card>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
