<script lang="ts">
	import type { marginType } from '$lib';
	const xTicks = Array(32)
		.fill(0)
		.map((_, i) => i)
		.filter((val) => val % 2);

	// console.log('xTicks', xTicks);
	export let height: number;
	export let xScale: d3.ScaleLinear<number, number, never>;
	export let margin: marginType;
</script>

<!-- Could also just apply to y -->
<g transform="translate(0, {-margin.bottom})">
	{#each xTicks as tick}
		<text x={xScale(tick + 0.7)} y={height} dy="2" dominant-baseline="hanging"
			>{tick} {tick == 31 ? ' Days' : ' '}</text
		>
	{/each}
</g>
