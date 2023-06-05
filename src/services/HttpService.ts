import type ISummoner from 'src/interfaces/ISummoner';

import { PUBLIC_HOST_URL } from '$env/static/public';
import type { HttpError } from '@sveltejs/kit';
import type IHttpError from 'src/interfaces/IHttpError';

const getSummonerByName = async (summonerName: string): Promise<ISummoner> => {
	const url = `${PUBLIC_HOST_URL}/api/data/summoner/${summonerName}`;

	const response = await fetch(url);

	if (response.status !== 200) {
		const httpError: IHttpError = await response.json();

		throw new Error(httpError.message);
	}

	const responseBody: ISummoner = await response.json();

	return responseBody;
};

export { getSummonerByName };
