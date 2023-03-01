<script lang="ts">
	import type ISummoner from 'src/interfaces/ISummoner';

	export let data: { summoner: ISummoner };

	const summoner: ISummoner = data.summoner;
</script>

<div class="grid grid-cols-12 gap-4 mx-auto w-full md:w-10/12 p-4">
	<div class="dark:bg-primary-700 col-span-full md:col-span-4 order-1 md:order-1">
		<h2>{summoner.name}</h2>
	</div>

	<div class="dark:bg-primary-700 col-span-full md:col-span-4 order-2 md:order-3">
		Summoner Stats
	</div>

	<div class="dark:bg-primary-700 col-span-full md:col-span-8 order-3 md:order-2">Matches</div>
</div>
