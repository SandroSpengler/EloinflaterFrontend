<script lang="ts">
	// import type ISummoner from 'src/Interfaces/ISummoner';

	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.summoner.length);
</script>

<h2>Summoner Page!</h2>

<h2>Summoner Leaderboard {data.summoner.length}</h2>
