<script lang="ts">
	import { fly } from 'svelte/transition';
	import type IMatchData from '../interfaces/IMatch';

	export let match: IMatchData;
</script>

<div class="rounded-xl bg-primary-800 p-4" transition:fly={{ y: 100, duration: 750 }}>
	{match._id}
</div>
