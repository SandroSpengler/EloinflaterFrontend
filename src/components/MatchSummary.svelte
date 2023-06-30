<script lang="ts">
	import moment from 'moment';

	import { ArrowDownCircle, ArrowUpCircle } from 'svelte-heros-v2';

	import MatchDetail from './MatchDetail.svelte';
	import type ISummoner from '../interfaces/ISummoner';
	import type IMatchData from '../interfaces/IMatch';

	export let summoner: ISummoner;
	export let match: IMatchData;

	let showMatchDetail: boolean = false;

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

	const convertTimestamp = (match: IMatchData): string => {
		const converted = moment(match.info[0].gameEndTimestamp).toISOString();

		return converted;
	};

	const calculateGameLength = (match: IMatchData): string => {
		const duration = moment.duration(match.info[0].gameDuration, 'seconds');

		const hours = duration.hours();
		const minutes = duration.minutes();
		const seconds = duration.seconds();

		return `${hours === 0 ? '' : hours + ':'}${minutes < 10 ? '0' + minutes : minutes}:${
			seconds < 10 ? '0' + seconds : seconds
		}`;
	};

	const checkHasSummonerWon = (match: IMatchData): boolean => {
		const participantInfo = match.info[0].participants.find((participant) => {
			return participant.puuid === summoner.puuid;
		});

		const participantTeam = match.info[0].teams.find((team) => {
			return team.teamId === participantInfo?.teamId;
		});

		return participantTeam?.win!;
	};
</script>

<div
	class="flex flex-col p-4 sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2/4 sm:before:h-4 sm:before:w-4 sm:before:rounded-full rounded-xl bg-primary-800 {checkHasSummonerWon(
		match
	)
		? 'before:bg-green-200'
		: 'before:bg-red-300'}"
>
	<div class="grid grid-cols-12 grid-rows-4 h-32">
		<div class="row-start-1 col-start-1 col-span-2">
			<h3 class="md:text-xl font-bold">{match.info[0].gameType}</h3>
		</div>

		<div class="row-start-2 col-start-1 col-span-4 md:col-span-3">
			<h3 class="md:text-md font-semibold">{displayDate(match.info[0].gameEndTimestamp)}</h3>
		</div>

		<div class="row-start-3 col-start-1 col-span-3 md:col-span-3">
			<time class="text-sm uppercase dark:text-gray-100 mt-2"
				>{new Date(convertTimestamp(match)).toLocaleTimeString()}</time
			>
		</div>

		<div class="row-start-4 col-start-1 col-span-3">
			<time class="text-sm uppercase dark:text-gray-100 mt-2">
				{calculateGameLength(match)}
			</time>
		</div>

		<div class="row-start-4 col-start-6 col-span-2 mx-auto">
			<button
				on:click={() => {
					showMatchDetail = !showMatchDetail;
				}}
			>
				{#if showMatchDetail}
					<ArrowUpCircle class=" mx-auto mt-2 w-10 h-10 rounded-full bg-primary-600" />
				{:else}
					<ArrowDownCircle class=" mx-auto mt-2 w-10 h-10 rounded-full bg-primary-600" />
				{/if}
			</button>
		</div>
	</div>
</div>

{#if showMatchDetail}
	<MatchDetail {match} />
{/if}
