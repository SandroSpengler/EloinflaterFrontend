import { PUBLIC_HOST_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

import type IHttpError from '../interfaces/IHttpError';
import type ISummoner from '../interfaces/ISummoner';

import type { requestEndpoint } from '../types/endpoint';

const getSummonerByName = async (summonerName: string): Promise<ISummoner> => {
	const url = `${PUBLIC_HOST_URL}/api/data/summoner/${summonerName}`;

	const response = await fetch(url);

	if (response.status === 404) {
		return await postSummonerByName(summonerName);
	}

	if (response.status !== 200) {
		throw new Error(await handleHTTPError(response, 'summoner'));
	}

	const responseBody: ISummoner = await response.json();

	return responseBody;
};

/**
 * Checks if Riot Games finds a Summoner with that name
 *
 * @param summonerName
 * @returns The Riot Games Summoner
 */
const postSummonerByName = async (summonerName: string): Promise<ISummoner> => {
	const url = `${PUBLIC_HOST_URL}/api/data/summoner/${summonerName}`;

	const options: RequestInit = {
		method: 'POST'
	};

	const response = await fetch(url, options);

	if (response.status !== 200) {
		throw new Error(await handleHTTPError(response, 'summoner'));
	}
	const responseBody: ISummoner = await response.json();

	return responseBody;
};

const updateSummonerById = async (summonerId: string): Promise<void> => {
	const url = `${PUBLIC_HOST_URL}/api/data/summoner/${summonerId}`;

	const options: RequestInit = {
		method: 'PUT'
	};

	const response = await fetch(url, options);

	if (response.status !== 204) {
		throw new Error(await handleHTTPError(response, 'summoner'));
	}
};

const updateSummonerMatchesBySummonerId = async (summonerId: string): Promise<void> => {
	const url = `${PUBLIC_HOST_URL}/api/data/match/${summonerId}`;

	const options: RequestInit = {
		method: 'PUT'
	};

	const response = await fetch(url, options);

	if (response.status !== 204) {
		throw new Error(await handleHTTPError(response, 'match'));
	}
};

const handleHTTPError = async (response: Response, endpoint: requestEndpoint): Promise<string> => {
	const httpError: IHttpError = await response.json();

	if (httpError.httpStatusCode === 500) {
		return `Please try again later: ${httpError.message}`;
	}
	if (httpError.httpStatusCode === 400 || httpError.httpStatusCode === 409) {
		if (endpoint === 'match') {
			return 'Matches already updated recently';
		}

		return 'Summoner was already updated recently';
	}

	if (httpError.httpStatusCode === 404) {
		if (endpoint === 'match') {
			return 'No matches found for this summoner';
		}
		return 'The requested Summoner does not exist';
	}

	return `Please try again later: ${httpError.message}`;
};

export {
	getSummonerByName,
	updateSummonerById,
	postSummonerByName,
	updateSummonerMatchesBySummonerId
};
