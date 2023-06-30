import { PUBLIC_HOST_URL } from '$env/static/public';
import type ISummoner from '../../../../../interfaces/ISummoner';
import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';
import { getMatchesBySummonerPUUID, getSummonerByName } from '../../../../../services/HttpService';

// Useful for the Leaderboard
// Summoners are requested after search action is triggered by the client
export async function load({ params }): Promise<{ summoner: ISummoner; matches: any }> {
	const { region, summonerName } = params;

	const summoner = await getSummonerByName(summonerName);

	const matches = await getMatchesBySummonerPUUID(summoner.puuid, 0, 30);

	return { summoner, matches };
}
