<script lang="ts">
	import Tooltip from './Tooltip.svelte';
	import type Summoner from '../interfaces/ISummoner';

	export let summoner: Summoner;

	const totalMatchCount = (summoner: Summoner): Number => {
		let count = 0;

		if (summoner.inflatedMatchList && summoner.uninflatedMatchList) {
			count = summoner.inflatedMatchList.length + summoner.uninflatedMatchList.length;
		}

		return count;
	};
</script>

<div class="mb-4 grid grid-cols-2 rounded-lg bg-primary-800 p-3">
	<div class="text-xl">Matches analyzed</div>

	<div class="text-right text-xl font-bold">{totalMatchCount(summoner)}</div>
</div>

<div class="mb-4 grid grid-cols-2 rounded-lg bg-primary-800 p-3">
	<div class="text-md">Tabis bought</div>

	<div class="text-md text-right font-bold">{summoner.tabisCount}</div>
</div>

<div class="mb-4 grid grid-cols-2 rounded-lg bg-primary-800 p-3">
	<div class="text-md">Zhonya's bought</div>

	<div class="text-md text-right font-bold">{summoner.zhonaysCount}</div>
</div>

<div class="grid grid-cols-2 rounded-lg bg-primary-800 p-3">
	<div class="text-md">Exhaust picked</div>

	<div class="text-md text-right font-bold">{summoner.exhaustCount}</div>

	<div class="text-md mt-5">Casted</div>

	<div class="text-md mt-5 text-right font-bold">{summoner.exhaustCastCount}</div>
</div>
