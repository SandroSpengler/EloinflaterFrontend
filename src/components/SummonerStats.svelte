<script lang="ts">
	import Tooltip from './Tooltip.svelte';
	import type Summoner from '../interfaces/ISummoner';

	export let summoner: Summoner;

	const totalMatchCount = (): Number => {
		let count = summoner.inflatedMatchList.length + summoner.uninflatedMatchList.length;

		return count;
	};
</script>

<div class="grid grid-cols-2 bg-primary-800 p-3 mb-4">
	<div class="text-xl">Matches analyzed</div>

	<div class="text-xl text-right font-bold">{totalMatchCount()}</div>
</div>

<div class="grid grid-cols-2 bg-primary-800 p-3 mb-4">
	<div class="text-md">Tabis bought</div>

	<div class="text-md text-right font-bold">{summoner.tabisCount}</div>
</div>

<div class="grid grid-cols-2 bg-primary-800 p-3 mb-4">
	<div class="text-md">Zhonya's bought</div>

	<div class="text-md text-right font-bold">{summoner.zhonaysCount}</div>
</div>

<div class="grid grid-cols-2 bg-primary-800 p-3">
	<div class="text-md">Exhaust picked</div>

	<div class="text-md text-right font-bold">{summoner.exhaustCount}</div>

	<div class="text-md mt-5">Casted</div>

	<div class="text-md text-right mt-5 font-bold">{summoner.exhaustCastCount}</div>
</div>
