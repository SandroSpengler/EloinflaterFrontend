<script lang="ts">
	import type IMatchData from '../interfaces/IMatch';
	import type ISummoner from '../interfaces/ISummoner';
	import Match from './MatchSummary.svelte';

	export let matches: IMatchData[];
	export let summoner: ISummoner;
</script>

<div class="container mx-auto px-2 py-12">
	<div class="md:mx-4 grid gap-4 sm:grid-cols-12">
		<div class="relative col-span-12 space-y-6 md:px-4">
			<div
				class="relative col-span-12 space-y-12 md:px-4 before:dark:bg-gray-700 sm:col-span-8 sm:space-y-8 before:absolute sm:before:-left-3 sm:before:bottom-0 sm:before:top-2 sm:before:w-0.5"
			>
				{#each matches as match}
					<Match {match} {summoner} />
				{/each}
			</div>
		</div>
	</div>
</div>
