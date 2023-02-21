<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<header class="bg-white dark:bg-primary dark:text-white">
	<Header />
</header>

<body class="bg-white dark:bg-neutral-900 dark:text-white">
	<main>
		<slot />
	</main>
</body>

<style lang="postcss">
</style>
