<script lang="ts">
	import * as d3 from 'd3';
	import { csvData } from '$lib';
	import { onMount } from 'svelte';
	import type { CSVTypes } from '$lib';

	let svgRef;

	console.log($csvData);

	// 30th array value stops january

	// const data = [25, 50, 35, 15, 94, 10];
	const data: CSVTypes[] = $csvData.slice(0, 31);
	console.log(data);
	onMount(() => {
		// console.log(rolledUpVals);
		const MONTHS = [
			'Jan',
			'Feb',
			'March',
			'April',
			'May',
			'June',
			'July',
			'Aug',
			'Sep',
			'October',
			'Nov',
			'Dec'
		];

		const width = 1200;
		const height = 400;

		const margin = { top: 0, left: 0, right: 0, bottom: 0 };

		const svg = d3
			.select(svgRef)
			.attr('width', width)
			.attr('height', height)
			.style('background', '#f4f4f4')
			.style('overflow', 'visible');

		const xScale = d3
			.scaleLinear()
			.domain([0, 30])
			.range([0, width - margin.left - margin.right]);

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.Dewpoint) + 1])
			.range([height - margin.top - margin.bottom, 0]);

		const windspeedPoints = data.map((d, i) => [i, d.Windspeed]);
		const dewpointPoints = data.map((d, i) => [i, d.Dewpoint]);

		const line = d3
			.line()
			.x((d) => xScale(d[0]))
			.y((d) => yScale(d[1]));

		svg
			.append('path')
			.datum(windspeedPoints)
			.attr('fill', 'none')
			.attr('stroke', 'steelblue')
			.attr('stroke-width', 1.5)
			.attr('d', line);

		svg
			.append('path')
			.datum(dewpointPoints)
			.attr('fill', 'none')
			.attr('stroke', 'red')
			.attr('stroke-width', 1.5)
			.attr('d', line);

		const xAxis = d3
			.axisBottom(xScale)
			.ticks(data.length)
			.tickFormat((i) => i + 1);
		const yAxis = d3.axisLeft(yScale).ticks(5);

		svg.append('g').call(xAxis).attr('transform', `translate(0, ${height})`);
		svg.append('g').call(yAxis);

		// Add xlabel
		svg
			.append('text')
			.attr('class', 'x label')
			.attr('text-anchor', 'end')
			.attr('x', width)
			.attr('y', height + 35)
			.text('Days of January');

		// Add ylabel
		svg
			.append('text')
			.attr('class', 'y label')
			.attr('text-anchor', 'end')
			.attr('y', 6)
			.attr('dy', '0.75em')
			.attr('transform', 'rotate(-90)')
			.text('Metric');
	});
</script>

<!-- 
1. The well-designed chart
2. Necessary axes, legends for reading the chart
3. Proper titles and text to help guide the viewer (and us) as to what you are trying to show
 -->

<!-- Use d3.timeParse() or d3.scaleTime() -->

<div class="container">
	<h1>Actual Dewpoint and Wind Speed in January 2020</h1>
	<svg bind:this={svgRef}></svg>
	<div style="margin-top: 25px; font-size: 24px;">
		<span style="color: red; font-weight: bold; ">Red: </span> Dew
	</div>
	<div style="font-size: 24px;">
		<span style="color: steelblue; font-weight: bold">Blue: </span> Windspeed
	</div>
	<!-- Blue wind ,Red Dew -->
</div>

<style>
</style>
