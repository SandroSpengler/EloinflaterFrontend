import { PUBLIC_HOST_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type ISummoner from '../../../../interfaces/ISummoner';

import type { PageLoad } from './$types';

// Useful for the Leaderboard
// Summoners are requests after search action is triggered by the client
export const load = (async ({ params }): Promise<{ summoner: ISummoner[] }> => {
	// const { region, summonerName } = loadEvent.params;

	const url = `${PUBLIC_HOST_URL}/api/data/summoner/rank/CHALLENGER`;

	const res: Response = await fetch(url);

	if (res.status === 404) {
		throw error(404, 'Not found 😢');
	}

	if (res.status !== 200) {
		throw new Error(`HTTP: ${res.text}`);
	}

	const summoner: ISummoner[] = await res.json();

	return { summoner };
}) satisfies PageLoad;
