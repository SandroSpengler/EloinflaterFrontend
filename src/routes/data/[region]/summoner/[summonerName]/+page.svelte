<script lang="ts">
	import { RingLoader } from 'svelte-loading-spinners';

	import moment from 'moment';
	import type ISummoner from '../../../../../interfaces/ISummoner';

	import SummonerStats from '../../../../../components/SummonerStats.svelte';
	import {
		getSummonerByName,
		updateSummonerById,
		updateSummonerMatchesBySummonerId
	} from '../../../../../services/HttpService';
	import { displayToast } from '../../../../../stores/NotificationToast';
	import MatchHistory from '../../../../../components/MatchHistory.svelte';

	export let data: { summoner: ISummoner; matches: any };

	let summoner = data.summoner;
	let matches = data.matches;

	let loading: boolean = false;

	/**
	 * Makes the date human readable
	 *
	 * @param dateToDisplay
	 */
	const displayDate = (dateToDisplay: number | undefined) => {
		if (dateToDisplay) {
			let s = moment(dateToDisplay).fromNow();

			return s;
		}

		return 'n/a';
	};

	const updateSummoner = async (): Promise<void> => {
		loading = true;

		try {
			await updateSummonerById(summoner.id);
		} catch (error: any) {
			displayToast({
				type: 'error',
				message: error.message
			});
		}

		try {
			await updateSummonerMatchesBySummonerId(summoner.id);
		} catch (error: any) {
			displayToast({
				type: 'error',
				message: error.message
			});
		} finally {
			summoner = await getSummonerByName(summoner.name);
			loading = false;
		}
	};

	const calculateWinrate = (summoner: ISummoner): Number => {
		const totalMatches = summoner.wins + summoner.losses;

		if (totalMatches === 0) {
			return 0;
		}

		if (summoner.wins === 0) {
			return 0;
		}

		if (summoner.losses === 0) {
			return 100;
		}

		return parseInt(((summoner.wins / totalMatches) * 100).toFixed(0));
	};
</script>

<div class="mx-auto grid w-full grid-cols-12 gap-4 p-4 md:w-11/12">
	<div class="order-1 col-span-full row-span-full rounded-lg dark:bg-primary-700 md:col-span-3 ">
		<div class="grid max-h-72 grid-cols-12 grid-rows-3">
			<div class="col-span-4 row-span-1 row-start-1 p-2">
				<div>
					<img
						class="content-center rounded-xl"
						src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon{summoner.profileIconId}.png"
						alt="profile icon"
					/>
				</div>
			</div>

			<div class="col-span-8 row-start-1 p-2">
				<h1 class="text-2xl font-bold">{summoner.name}</h1>
				<h3 class="mt-2 text-base">Last Updated: {displayDate(summoner.updatedAt)}</h3>
			</div>

			<div class="col-span-4 row-span-1 row-start-3 m-2 p-2">
				{#if summoner.rankSolo !== ''}
					<img
						class="w-24content-center aspect-square rounded-xl"
						src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/{summoner.rankSolo.toLocaleLowerCase()}.png"
						alt="rank icon"
					/>
				{/if}
			</div>

			<div
				class="col-span-8 col-start-5 row-start-3 grid grid-cols-12 grid-rows-3 gap-y-6 pl-2 pt-5 pr-2 text-base"
			>
				<h1 class="col-span-12 font-bold">
					{summoner.rankSolo ? summoner.rankSolo : 'Rank: n/a'}
					&nbsp;
					{summoner.rank ? summoner.rank : ''}
				</h1>

				<h1 class="col-span-4">
					{summoner.leaguePoints ? `${summoner.leaguePoints} LP ` : 'n/a'}
				</h1>

				<div class="col-span-8 text-right">
					<h1 class="flex justify-end text-right text-base">
						<h1>W:</h1>
						&nbsp;
						<h1 class="font-bold">
							{summoner.wins ? summoner.wins : 'n/a'}
						</h1>
						&nbsp;
						<h1>L:</h1>
						&nbsp;
						<h1 class="font-bold">
							{summoner.losses ? summoner.losses : 'n/a'}
						</h1>
					</h1>
				</div>

				<h1 class="col-span-12 text-right font-bold">{calculateWinrate(summoner)} %</h1>
			</div>

			<div class="col-start-5 row-span-1 row-start-4 m-2">
				<button
					class="mt-4 flex content-center rounded-lg px-5 py-3 font-bold dark:bg-primary-800"
					on:click={() => updateSummoner()}
					disabled={loading}
					><p>Update</p>
					{#if loading}
						<div class="ml-4">
							<RingLoader size="30" color="green" />
						</div>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<div class="order-2 col-span-full rounded-lg p-2 dark:bg-primary-700 md:order-3 md:col-span-3">
		<SummonerStats {summoner} />
	</div>

	<div
		class="order-3 col-span-full row-span-6 rounded-lg dark:bg-primary-700 md:order-2 md:col-span-9"
	>
		<MatchHistory {matches} {summoner} />
	</div>
</div>
