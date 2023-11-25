<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
</script>

<Navbar fluid={true}>
	<NavBrand href="/">
		<h1 class="self-center whitespace-nowrap font-bold sm:text-xl md:text-2xl">Eloinflater</h1>
	</NavBrand>
	<NavHamburger />
	<NavUl class="sm:mx-8 md:mx-0">
		<NavLi href="/data/euw/leaderboard" class="sm:text-base md:text-xl">Leaderboard</NavLi>
		<NavLi href="/" class="sm:text-base md:text-xl">Live Game</NavLi>
	</NavUl>
</Navbar>

<style lang="postcss">
</style>
