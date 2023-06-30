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
	 * Makes the Date human readable
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

		const updateSummoner = updateSummonerById(summoner.id);
		const updateMatches = updateSummonerMatchesBySummonerId(summoner.id);

		try {
			const settledRequests = await Promise.allSettled([updateSummoner, updateMatches]);

			if (settledRequests[0].status === 'rejected') {
				const updateSummoner = settledRequests[0] as PromiseRejectedResult;
				updateSummoner.reason;

				if (updateSummoner.reason === undefined) {
					return;
				}
				displayToast({
					type: 'error',
					message: updateSummoner.reason
				});
			}

			if (settledRequests[0].status === 'rejected') {
				const updateMatches = settledRequests[1] as PromiseRejectedResult;
				updateMatches.reason;

				if (updateMatches.reason === undefined) {
					return;
				}
				displayToast({
					type: 'error',
					message: updateMatches.reason
				});
			}
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

<div class="grid grid-cols-12 gap-4 mx-auto w-full md:w-11/12 p-4">
	<div class="dark:bg-primary-700 col-span-full row-span-full md:col-span-3 order-1 md:order-1">
		<div class="grid grid-cols-12">
			<div class="row-span-1 col-span-4 p-2">
				<div>
					<img
						class="rounded-xl content-center"
						src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon{summoner.profileIconId}.png"
						alt="profile icon"
					/>
				</div>
			</div>
			<div class="p-2 col-span-8">
				<h1 class="text-2xl font-bold">{summoner.name}</h1>
				<h3 class="text-base mt-2">Last Updated: {displayDate(summoner.updatedAt)}</h3>
			</div>

			<div class="row-start-3 col-start-0 col-span-4 p-2 mx-auto">
				{#if summoner.rankSolo !== ''}
					<img
						class="rounded-xl content-center aspect-square w-24"
						src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/{summoner.rankSolo.toLocaleLowerCase()}.png"
						alt="rank icon"
					/>
				{/if}
			</div>

			<div class="col-start-5 row-start-3 pl-2 col-span-3 pt-5">
				<h1 class="text-base mt-1 font-bold">
					{summoner.rankSolo ? summoner.rankSolo : 'Rank: n/a'}
					&nbsp;
					{summoner.rank ? summoner.rank : ''}
				</h1>
				<h1 class="text-base mt-1">
					{summoner.leaguePoints ? `${summoner.leaguePoints} LP ` : 'n/a'}
				</h1>
			</div>

			<div class="col-start-8 row-start-3 col-span-4 text-right px-2 pt-5">
				<h1 class="text-base mt-1">
					W: {summoner.wins ? summoner.wins : 'n/a'}
					&nbsp; L: {summoner.losses ? summoner.losses : 'n/a'}
				</h1>
				<h1 class="text-right px-2 font-bold">{calculateWinrate(summoner)} %</h1>
			</div>

			<div class="row-span-1 col-start-5 m-2 row-start-4">
				<button
					class="rounded-lg dark:bg-primary-800 font-bold px-5 py-3 mt-4 flex content-center"
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

	<div class="dark:bg-primary-700 col-span-full md:col-span-3 order-2 md:order-3 p-2">
		<SummonerStats {summoner} />
	</div>

	<div class="dark:bg-primary-700 col-span-full row-span-6 md:col-span-9 order-3 md:order-2">
		<MatchHistory {matches} {summoner} />
	</div>
</div>
