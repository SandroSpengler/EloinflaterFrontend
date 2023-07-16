<script lang="ts">
	import moment from 'moment';

	import { ArrowDownCircle, ArrowUpCircle } from 'svelte-heros-v2';

	import maps from '../ressources/maps.json';
	import queues from '../ressources/queues.json';
	import champion from '../ressources/champion.json';
	import summonerSpell from '../ressources/summoner.json';

	import MatchDetail from './MatchDetail.svelte';
	import type ISummoner from '../interfaces/ISummoner';
	import type IMatchData from '../interfaces/IMatch';
	import type { IMapType } from '../interfaces/IMapType';
	import type { IQueueType } from '../interfaces/IQueueType';
	import type { IChampionType, ChampionDetails } from '../interfaces/IChampionType';
	import type { ISummonerSpellType, SummonerDetails } from '../interfaces/ISummonerSpellType';
	import type { Champion, Participant } from '../interfaces/IMatch';

	export let summoner: ISummoner;
	export let match: IMatchData;

	const mapTypes = maps as [IMapType];
	const queueTypes = queues as [IQueueType];
	const championType = champion as IChampionType;
	const summonerSpellType = summonerSpell as ISummonerSpellType;

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

	const getParticipant = (match: IMatchData): Participant => {
		const participant = match.info[0].participants.find((participant) => {
			return participant.puuid === summoner.puuid;
		});

		return participant!;
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
		const participantInfo = getParticipant(match);

		const participantTeam = match.info[0].teams.find((team) => {
			return team.teamId === participantInfo?.teamId;
		});

		return participantTeam?.win!;
	};

	const determineGameQueue = (queueId: number): string => {
		if (queueId === undefined) {
			return 'n/a';
		}

		const queueType = queueTypes.find((queueType) => {
			return queueType.queueId === queueId;
		});

		if (queueType === undefined || queueType.description === undefined) {
			return 'n/a';
		}

		return queueType?.displayName;
	};

	const getChampionIconUrl = (match: IMatchData): string => {
		const participantInfo = getParticipant(match);

		const playedChampion: ChampionDetails = (championType.data as any)[
			participantInfo.championName
		];

		return `http://ddragon.leagueoflegends.com/cdn/
		13.13.1
		/img/champion/
		${playedChampion.image.full}`;
	};

	const getSummonerSpellUrl = (match: IMatchData, summonerSpellOrder: 1 | 2): string => {
		const participantInfo = getParticipant(match);

		// const equippedSummoner: SummonerDetails = summonerSpellType.data.map;

		for (const [key, value] of Object.entries(summonerSpellType.data)) {
			const castedValue: SummonerDetails = value;

			const firstSummonerSpell = 1;
			const secondSummonerSpell = 2;

			if (summonerSpellOrder === firstSummonerSpell) {
				if (castedValue.key === participantInfo.summoner1Id.toString()) {
					return `http://ddragon.leagueoflegends.com/cdn/13.13.1/img/spell/${castedValue.id}.png`;
				}
			}

			if (summonerSpellOrder === secondSummonerSpell) {
				if (castedValue.key === participantInfo.summoner2Id.toString()) {
					return `http://ddragon.leagueoflegends.com/cdn/13.13.1/img/spell/${castedValue.id}.png`;
				}
			}
		}

		return ``;
	};
</script>

<div
	class="rounded-xl bg-primary-800 px-4 pt-4 sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2/4 sm:before:h-4 sm:before:w-4 sm:before:rounded-full {checkHasSummonerWon(
		match
	)
		? 'before:bg-green-200'
		: 'before:bg-red-300'}"
>
	<div class="grid h-48 grid-cols-12">
		<div class="col-span-2 grid grid-cols-12 grid-rows-4">
			<div class="col-span-12 col-start-1 row-start-1">
				<h3 class="font-bold md:text-xl">{determineGameQueue(match.info[0].queueId)}</h3>
			</div>

			<div class="col-span-12 col-start-1 row-start-2">
				<h3 class="md:text-md font-semibold">
					{displayDate(match.info[0].gameEndTimestamp)}
				</h3>
			</div>

			<div class="col-span-12 col-start-1 row-start-3">
				<time class="mt-2 text-sm uppercase dark:text-gray-100"
					>{new Date(convertTimestamp(match)).toLocaleTimeString()}</time
				>
			</div>

			<div class="col-span-12 col-start-1 row-start-4">
				<time class="mt-2 text-sm uppercase dark:text-gray-100">
					{calculateGameLength(match)}
				</time>
			</div>
		</div>

		<div class="col-span-3 col-start-3 grid grid-cols-12 grid-rows-4 p-3">
			<div class="col-span-4 col-start-1 row-span-4 row-start-1 min-w-[48px] rounded-sm">
				<div class="relative">
					<img
						class="content-center rounded-xl"
						src={getChampionIconUrl(match)}
						alt="champion icon"
					/>

					<span class="absolute bottom-0 right-0 mx-auto rounded-full bg-primary-900 p-1">
						{getParticipant(match)?.champLevel}
					</span>
				</div>
			</div>

			<div class="bg-green-40 col-span-2 row-span-1 min-w-[32px] rounded-sm p-1 md:row-span-2">
				<img
					class="content-center rounded-xl"
					src={getSummonerSpellUrl(match, 1)}
					alt="profile icon"
				/>
			</div>
			<div class="col-span-2 row-span-1 min-w-[32px] rounded-sm p-1 md:row-span-2 md:row-start-3">
				<img
					class="content-center rounded-xl"
					src={getSummonerSpellUrl(match, 2)}
					alt="profile icon"
				/>
			</div>
			<div class="col-span-2 row-span-1 min-w-[32px] rounded-sm p-1 md:row-span-2">
				<img
					class="content-center rounded-xl"
					src={getSummonerSpellUrl(match, 2)}
					alt="profile icon"
				/>
			</div>
			<div
				class="col-span-2 row-span-1 row-start-2 min-w-[32px] rounded-sm p-1 md:row-span-2 md:row-start-3"
			>
				<img
					class="content-center rounded-xl"
					src={getSummonerSpellUrl(match, 2)}
					alt="profile icon"
				/>
			</div>
		</div>

		<div class="col-span-2 col-start-6 row-start-4 mx-auto">
			<button
				on:click={() => {
					showMatchDetail = !showMatchDetail;
				}}
			>
				{#if showMatchDetail}
					<ArrowUpCircle class=" mx-auto mt-2 h-10 w-10 rounded-full bg-primary-600" />
				{:else}
					<ArrowDownCircle class=" mx-auto mt-2 h-10 w-10 rounded-full bg-primary-600" />
				{/if}
			</button>
		</div>
	</div>
</div>

{#if showMatchDetail}
	<MatchDetail {match} />
{/if}
