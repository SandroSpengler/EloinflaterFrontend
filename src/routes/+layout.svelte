<script>
	import Header from './Header.svelte';
	import '../app.css';
	import ToastComponent from '../components/ToastComponent.svelte';
</script>

<header>
	<Header />
</header>

<body
	class="bg-white focus:outline-none dark:bg-neutral-900 dark:text-white sm:text-base md:text-lg"
>
	<main>
		<slot />
	</main>
</body>

<ToastComponent />

<style lang="postcss">
</style>
