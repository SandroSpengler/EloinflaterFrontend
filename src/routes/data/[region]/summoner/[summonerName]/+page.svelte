<script lang="ts">
	import type ISummoner from 'src/Interfaces/ISummoner';

	export let data: { summoner: ISummoner };

	const summoner: ISummoner = data.summoner;
</script>

<h2>Summoner Page!</h2>

<h2>{summoner.name}</h2>
