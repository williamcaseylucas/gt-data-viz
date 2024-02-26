<script lang="ts">
	export let data: [number, number];
	export let yScale: d3.ScaleLinear<number, number, never>;
	export let xScale: d3.ScaleLinear<number, number, never>;
</script>

<!-- put y val for top -->
<!-- put x val for left -->
<div
	class="tooltip"
	style="position: absolute; top: {yScale(data[1])}px; left: {xScale(data[0] + 1)}px"
>
	<p>
		Date: {data[0]}
	</p>
	<p>
		Measurement: {data[1]}
	</p>
</div>

<style>
	.tooltip {
		padding: 6px;
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.5);
		pointer-events: none;
		transition:
			top 300ms ease,
			left 300ms ease;
	}
</style>
