<script lang="ts">
	import { MagnifyingGlass } from 'svelte-heros-v2';
</script>

<div>
	<!-- <div class="container mx-auto mt-4 w-10/12">
		<h3>Check any Summoner on EUW for inflation</h3>
	</div> -->
	<div
		class="container mx-auto w-10/12 md:max-w-5xl my-64 flex flex-row justify-between dark:bg-primary dark:text-white border-2 dark:border-none rounded-xl p-5"
	>
		<MagnifyingGlass variation="solid" class="mr-4" />
		<input
			class="dark:bg-primary focus:outline-none w-full"
			placeholder="Summoner Name"
			type="text"
		/>
		<button on:click={() => {}}> Search </button>
	</div>
</div>
