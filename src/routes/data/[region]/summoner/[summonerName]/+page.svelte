<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import { RingLoader } from 'svelte-loading-spinners';

	import moment from 'moment';
	import type ISummoner from '../../../../../interfaces/ISummoner';

	import { getSummonerByName, updateSummonerById } from '../../../../../services/HttpService';
	import { displayToast } from '../../../../../stores/NotificationToast';
	import type IHttpError from '../../../../../interfaces/IHttpError';
	import { load } from '../../leaderboard/+page';
	import Error from '../../../../+error.svelte';
	import type { TestStatus } from '@playwright/test';

	export let data: { summoner: ISummoner };

	let summoner: ISummoner = data.summoner;
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
		const updateMatches = updateSummonerById(summoner.id);

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
			summoner = await getSummonerByName(summoner.name);
		} catch (error: any) {
			displayToast({
				type: 'error',
				message: error.message
			});
		} finally {
			loading = false;
		}
	};
</script>

<div class="grid grid-cols-12 gap-4 mx-auto w-full md:w-11/12 p-4">
	<div class="dark:bg-primary-700 col-span-full row-span-full md:col-span-4 order-1 md:order-1">
		<div class="grid grid-cols-12">
			<div class="row-span-1 col-span-4 p-2">
				<img
					class="rounded-xl content-center"
					src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon{summoner.profileIconId}.png"
					alt="profile icon"
				/>
			</div>
			<div class="p-2 col-span-8">
				<h1 class="text-2xl font-bold">{summoner.name}</h1>
				<h3 class="text-base mt-2">Last Updated: {displayDate(summoner.updatedAt)}</h3>
				<h1 class="text-base mt-1">
					{summoner.rankSolo ? summoner.rankSolo : 'Rank: n/a'}
					&nbsp;
					{summoner.rank ? summoner.rank : ''}
				</h1>
				<h1 class="text-base mt-1">
					{summoner.leaguePoints ? `${summoner.leaguePoints} LP ` : 'n/a'}
				</h1>
				<h1 class="text-base mt-1">
					W: {summoner.wins ? summoner.wins : 'n/a'}
					&nbsp; L: {summoner.losses ? summoner.losses : 'n/a'}
				</h1>
			</div>

			<div class="row-span-1 col-start-5 m-2">
				<button
					class="rounded-lg dark:bg-blue-900 font-bold px-5 py-3 mt-4 flex content-center"
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

	<div class="dark:bg-primary-700 col-span-full md:col-span-4 order-2 md:order-3">
		Summoner Stats
	</div>

	<div class="dark:bg-primary-700 col-span-full row-span-6 md:col-span-8 order-3 md:order-2">
		<h1 class="text-2xl font-bold">Inflated Matches: {summoner.inflatedMatchList.length}</h1>

		{#each summoner.uninflatedMatchList as match}
			{match} <br />
		{/each}
	</div>
</div>
