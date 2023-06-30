<script lang="ts">
	import { fly } from 'svelte/transition';
	import type IMatchData from '../interfaces/IMatch';

	export let match: IMatchData;
</script>

<div class="p-4 bg-primary-800 rounded-xl" transition:fly={{ y: 100, duration: 750 }}>
	{match._id}
</div>
