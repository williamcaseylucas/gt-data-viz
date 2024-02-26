<script lang="ts">
	import * as d3 from 'd3';
	import { csvData } from '$lib';
	import { onMount } from 'svelte';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';
	import Tooltip from './Tooltip.svelte';
	import type internal from 'stream';
	import { scale } from 'svelte/transition';

	// Group by month
	// Average Precip, Dewpoint, Pressure

	// Groups each Origin and gives the count, median invoice, and average weight of each
	let svgRef;

	onMount(() => {
		const rolledUpVals = d3.rollups(
			$csvData,
			(v) => ({
				// count: v.length,
				// medianInvoice: d3.median(v, (d) => d.Dewpoint),
				// avgWeight: d3.mean(v, (d) => d.Pressure)
				avgMaxSpeed: d3.mean(v, (d) => d.MaxSpeed),
				avgDewpoint: d3.mean(v, (d) => d.Dewpoint)
			}), // Aggregators
			(d) => d.Date.getMonth() // use this as a key to fill into 'v'
		);

		const maxVal = d3.max($csvData, (d) => {
			return Math.max(d.MaxSpeed, d.Dewpoint);
		}) as number;

		// onMount(() => {
		// 	var svg = d3.select('div').select('svg').attr('width', width).attr('height', height);
		// 	// console.log('svg', svg);
		// });

		const width = 1200;
		const height = 600;

		const margin = { top: 20, right: 50, left: 20, bottom: 20 };

		const months = 12;

		const svg = d3
			.select(svgRef)
			.attr('width', width)
			.attr('height', height)
			.style('overflow', 'visible')
			.style('margin-top', '75px');

		const xScale = d3
			.scaleBand()
			.domain(d3.range(12).map(String))
			.range([0, width - margin.left - margin.right])
			.padding(0.5);

		const yScale = d3
			.scaleLinear()
			.domain([0, maxVal])
			.range([height - margin.top - margin.bottom, 0]);

		const xAxis = d3.axisBottom(xScale).ticks(12);
		const yAxis = d3.axisLeft(yScale).ticks(5);

		const scaleAmount = 1;
		svg
			.selectAll('.bar')
			.data(rolledUpVals)
			.join('rect')
			.attr('x', (v) => xScale(String(v[0] || 0)))
			.attr('y', (v) => yScale((v[1].avgDewpoint || 0) * scaleAmount))
			.attr('width', xScale.bandwidth())
			.attr('height', (val) => height - yScale((val[1].avgDewpoint || 0) * scaleAmount))
			.attr('fill', 'red');
		svg
			.selectAll('.bar')
			.data(rolledUpVals)
			.join('rect')
			.attr('x', (v) => xScale(String(v[0] || 0)))
			.attr('y', (v) => yScale((v[1].avgMaxSpeed || 0) * scaleAmount))
			.attr('width', xScale.bandwidth())
			.attr('height', (val) => height - yScale((val[1].avgMaxSpeed || 0) * scaleAmount))
			.attr('fill', 'blue');

		// Add xlabel
		svg
			.append('text')
			.attr('class', 'x label')
			.attr('text-anchor', 'end')
			.attr('x', width)
			.attr('y', height + 5)
			.text('Months');

		// Add ylabel
		svg
			.append('text')
			.attr('class', 'y label')
			.attr('text-anchor', 'end')
			.attr('y', 6)
			.attr('dy', '0.75em')
			.attr('transform', 'rotate(-90)')
			.text('Metric');

		svg.append('g').call(xAxis).attr('transform', `translate(0, ${height})`);
		svg.append('g').call(yAxis);
	});
</script>

<div class="container">
	<div class="box">
		<h1>Average Max Speed vs Average Dewpoint per Month from 2020 - 2022</h1>
		<svg bind:this={svgRef}> </svg>
	</div>
	<div style="margin-top: 25px; font-size: 24px;">
		<span style="color: red; font-weight: bold; ">Red: </span> Average Dewpoint
	</div>
	<div style="font-size: 24px;">
		<span style="color: blue; font-weight: bold">Blue: </span> Average MaxSpeed
	</div>
</div>

<style>
	.box {
		position: relative;
	}
</style>
