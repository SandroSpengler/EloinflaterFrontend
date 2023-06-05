<script>
	import Header from './Header.svelte';
	import '../app.css';
	import ToastComponent from '../components/ToastComponent.svelte';
</script>

<header class="bg-white dark:bg-primary-800 dark:text-white">
	<Header />
</header>

<body
	class="bg-white dark:bg-neutral-900 dark:text-white sm:text-base md:text-lg focus:outline-none"
>
	<main>
		<slot />
	</main>
</body>

<ToastComponent />

<style lang="postcss">
</style>
