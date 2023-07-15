export interface ISummonerSpellType {
	type: string;
	version: string;
	data: Data;
}

interface Data {
	SummonerBarrier: SummonerDetails;
	SummonerBoost: SummonerDetails3;
	SummonerDot: SummonerDetails2;
	SummonerExhaust: SummonerDetails;
	SummonerFlash: SummonerDetails;
	SummonerHaste: SummonerDetails;
	SummonerHeal: SummonerDetails2;
	SummonerMana: SummonerDetails2;
	SummonerPoroRecall: SummonerDetails;
	SummonerPoroThrow: SummonerDetails;
	SummonerSmite: SummonerDetails2;
	SummonerSnowURFSnowball_Mark: SummonerDetails;
	SummonerSnowball: SummonerDetails;
	SummonerTeleport: SummonerDetails;
}

interface SummonerDetails2 {
	id: string;
	name: string;
	description: string;
	tooltip: string;
	maxrank: number;
	cooldown: number[];
	cooldownBurn: string;
	cost: number[];
	costBurn: string;
	datavalues: Datavalues;
	effect: (number[] | null)[];
	effectBurn: (null | string)[];
	vars: Var2[];
	key: string;
	summonerLevel: number;
	modes: string[];
	costType: string;
	maxammo: string;
	range: number[];
	rangeBurn: string;
	image: Image;
	resource: string;
}

interface Var2 {
	link: string;
	coeff: number[];
	key: string;
}

interface SummonerDetails3 {
	id: string;
	name: string;
	description: string;
	tooltip: string;
	maxrank: number;
	cooldown: number[];
	cooldownBurn: string;
	cost: number[];
	costBurn: string;
	datavalues: Datavalues;
	effect: (number[] | null)[];
	effectBurn: (null | string)[];
	vars: Var[];
	key: string;
	summonerLevel: number;
	modes: string[];
	costType: string;
	maxammo: string;
	range: number[];
	rangeBurn: string;
	image: Image;
	resource: string;
}

interface Var {
	link: string;
	coeff: number;
	key: string;
}

export interface SummonerDetails {
	id: string;
	name: string;
	description: string;
	tooltip: string;
	maxrank: number;
	cooldown: number[];
	cooldownBurn: string;
	cost: number[];
	costBurn: string;
	datavalues: Datavalues;
	effect: (number[] | null)[];
	effectBurn: (null | string)[];
	vars: any[];
	key: string;
	summonerLevel: number;
	modes: string[];
	costType: string;
	maxammo: string;
	range: number[];
	rangeBurn: string;
	image: Image;
	resource: string;
}

interface Image {
	full: string;
	sprite: string;
	group: string;
	x: number;
	y: number;
	w: number;
	h: number;
}

interface Datavalues {}
