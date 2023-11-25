<script lang="ts">
	import moment from 'moment';

	import champion from '../ressources/champion.json';
	import maps from '../ressources/maps.json';
	import queues from '../ressources/queues.json';
	import summonerSpell from '../ressources/summoner.json';

	import type { ChampionDetails, IChampionType } from '../interfaces/IChampionType';
	import type { IMapType } from '../interfaces/IMapType';
	import type IMatchData from '../interfaces/IMatch';
	import type { Participant } from '../interfaces/IMatch';
	import type { IQueueType } from '../interfaces/IQueueType';
	import type ISummoner from '../interfaces/ISummoner';
	import type { ISummonerSpellType, SummonerDetails } from '../interfaces/ISummonerSpellType';
	import MatchDetail from './MatchDetail.svelte';

	export let summoner: ISummoner;
	export let match: IMatchData;

	const mapTypes = maps as [IMapType];
	const queueTypes = queues as [IQueueType];
	const championType = champion as IChampionType;
	const summonerSpellType = summonerSpell as ISummonerSpellType;

	let showMatchDetail: boolean = false;

	/**
	 * converts the timestamp to a human readable date
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
	class="rounded-xl bg-primary-800 p-4 before:left-[-38px] before:top-2/4 before:h-6 before:w-6 before:rounded-full sm:relative sm:before:absolute {checkHasSummonerWon(
		match
	)
		? 'before:bg-green-200'
		: 'before:bg-red-300'}"
>
	<div class="grid grid-cols-12 gap-0">
		<div class="col-span-4 grid grid-rows-4 md:col-span-2">
			<div class="col-start-1 row-start-1">
				<h3 class="text-sm">{determineGameQueue(match.info[0].queueId)}</h3>
			</div>

			<div class="col-start-1 row-start-2">
				<h3 class="text-sm">
					{displayDate(match.info[0].gameEndTimestamp)}
				</h3>
			</div>

			<div class="col-start-1 row-start-3">
				<time class="mt-2 text-sm uppercase dark:text-gray-100"
					>{new Date(convertTimestamp(match)).toLocaleTimeString()}</time
				>
			</div>

			<div class="col-start-1 row-start-4">
				<time class="mt-2 text-sm uppercase dark:text-gray-100">
					{calculateGameLength(match)}
				</time>
			</div>
		</div>

		<div class="col-span-3 my-auto grid md:col-span-1">
			<div class="relative">
				<img
					class="h-full w-full content-center rounded-xl object-cover"
					src={getChampionIconUrl(match)}
					alt="champion icon"
				/>
				<span class="absolute bottom-0 rounded-full bg-primary-900 p-1 text-sm">
					{getParticipant(match)?.champLevel}
				</span>
			</div>
		</div>

		<div class="col-span-2 my-auto grid grid-cols-2 grid-rows-2 gap-1 md:h-20 md:w-20">
			<img
				class="h-full w-full content-center rounded-sm"
				src={getSummonerSpellUrl(match, 1)}
				alt="profile icon"
			/>
			<img
				class=" h-full w-full content-center rounded-sm object-cover"
				src={getSummonerSpellUrl(match, 1)}
				alt="profile icon"
			/>

			<img
				class=" h-full w-full content-center rounded-sm object-cover"
				src={getSummonerSpellUrl(match, 1)}
				alt="profile icon"
			/>
			<img
				class=" h-full w-full content-center rounded-sm object-cover"
				src={getSummonerSpellUrl(match, 1)}
				alt="profile icon"
			/>
		</div>
	</div>
</div>

{#if showMatchDetail}
	<MatchDetail {match} />
{/if}
