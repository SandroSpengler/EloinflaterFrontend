<script lang="ts">
	export let title = '';
	let isHovered = false;
	let x: any;
	let y: any;

	function mouseOver(event: any) {
		isHovered = true;
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseMove(event: any) {
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseLeave() {
		isHovered = false;
	}
</script>

<div
	on:mouseover={mouseOver}
	on:focus={mouseOver}
	on:mouseleave={mouseLeave}
	on:mousemove={mouseMove}
>
	<slot />
</div>

{#if isHovered}
	<div style="top: {y}px; left: {x}px;" class="absolute rounded-md bg-primary-800 p-2 text-base">
		{title}
	</div>
{/if}
