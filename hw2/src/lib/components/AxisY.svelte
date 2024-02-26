<script lang="ts">
	import type { marginType } from '$lib';
	// Max from before
	const yTicks = Array(72)
		.fill(0)
		.map((_, i) => i + 1)
		.filter((val) => val % 2);

	export let height: number;
	export let width: number;
	export let yScale: d3.ScaleLinear<number, number, never>;
	export let margin: marginType;
</script>

<!-- Can add margin to x and y or by transform on the group -->
<g transform="translate({margin.left}, {margin.top})">
	{#each yTicks as tick}
		<text x={0} y={yScale(tick)} dy="-3">{tick} {tick == 71 ? ' Measurement' : ' '}</text>
		<line x1="0" y1={yScale(tick)} x2={width} y2={yScale(tick)} stroke="#cecece" />
	{/each}
</g>
