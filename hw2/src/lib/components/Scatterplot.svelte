<script lang="ts">
	import * as d3 from 'd3';
	import { csvData } from '$lib';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';
	import Tooltip from './Tooltip.svelte';

	const aggregatedData = d3.rollups(
		$csvData,
		(v) => ({
			// count: v.length,
			// medianInvoice: d3.median(v, (d) => d.Dewpoint),
			// avgWeight: d3.mean(v, (d) => d.Pressure)
			modeDewpoint: d3.mode(v, (d) => d.Dewpoint),
			meanWind: d3.mean(v, (d) => d.Windspeed)
		}), // Aggregators
		(d) => d.Date.getDate() // use this as a key to fill into 'v'
	);

	// console.log('aggData', aggregatedData);

	const maxMaxTempVal = d3.max($csvData.map((item) => item.Dewpoint)) as number;
	const maxMinTempVal = d3.max($csvData.map((item) => item.Windspeed)) as number;

	let width = 600;
	let height = 600;

	const daysInAMonth = 31;

	const margin = { top: 20, right: 70, left: 0, bottom: 20 };

	const xScale = d3
		.scaleLinear()
		.domain([0, daysInAMonth])
		.range([0, width - margin.left - margin.right]);

	const yScale = d3
		.scaleLinear()
		.domain([0, Math.max(maxMaxTempVal, maxMinTempVal)])
		.range([height - margin.top - margin.bottom, 0]);

	// Use temp max and temp min
	let hoverData;
	$: console.log('hoverData', hoverData);
</script>

<!-- 
	1. You will need to choose at least two numeric variables to display. To receive full credit, do not simply put dots on your screen. Instead, experiment with the size, opacity, color, and other encodings of the circles to demonstrate some interesting patterns/trends. Use solid visualization design principles.

	2. Again, you have to freedom to manipulate your data by any means that you are comfortable with.
 -->

<!-- 
1. The well-designed chart
2. Necessary axes, legends for reading the chart
3. Proper titles and text to help guide the viewer (and us) as to what you are trying to show
 -->

<div class="container">
	<div>
		<h1>Average Wind Speed per day vs Most Frequent Dewpoint per day from 2020 - 2022</h1>
	</div>
	<div class="box">
		<svg {width} {height}>
			<AxisX {height} {xScale} {margin} />
			<AxisY {height} {width} {yScale} {margin} />

			<g class="circles" transform="translate({margin.left}, {margin.top})">
				{#each aggregatedData as data}
					<circle
						role="button"
						tabindex="0"
						cx={xScale(data[0] + 1)}
						cy={yScale(data[1].modeDewpoint)}
						r={data[1].modeDewpoint * 0.15}
						fill="purple"
						stroke="black"
						on:mouseover={() => {
							hoverData = [data[0], data[1].modeDewpoint];
						}}
						on:focus={() => {}}
					/>

					<circle
						role="button"
						tabindex="0"
						cx={xScale(data[0] + 1)}
						cy={yScale(data[1].meanWind)}
						r={data[1].meanWind}
						fill="red"
						stroke="black"
						on:mouseover={() => {
							hoverData = [data[0], data[1].meanWind];
						}}
						on:focus={() => {}}
					/>
					<!-- <circle cx={data[0]} cy={data[1].avgMax} r="1"></circle> -->
				{/each}
			</g>
		</svg>
		{#if hoverData}
			<Tooltip data={hoverData} {yScale} {xScale} />
		{/if}
	</div>
	<div>
		<span style="color: red; font-weight: bold">Red: </span> Mean Wind per day
	</div>
	<div>
		<span style="color: purple; font-weight: bold">Purple: </span> Most occurring dew per day
	</div>
</div>

<style>
	.box {
		position: relative;
	}
</style>
