<script lang="ts">
	import type { CSVTypes } from '$lib';
	import { csvData } from '$lib';

	export let data;
	// @ts-ignore
	const csv: CSVTypes[] = Object.values(data);

	csvData.set(csv);

	import Bar from '$lib/components/Bar.svelte';
	import Linechart from '$lib/components/Linechart.svelte';
	import Scatterplot from '$lib/components/Scatterplot.svelte';
</script>

<!-- <div class="container">
	<div class="grid">
		{#each $csvData as item}
			<div class="card">
				{item.City}
				{item.Date}
				{item.Dewpoint}
				{item.MaxSpeed}
				{item.Precip}
				{item.Pressure}
				{item.TempMax}
				{item.TempMin}
				{item.Visibility}
				{item.Weather}
				{item.Windspeed}
			</div>
		{/each}
	</div>
</div> -->

<Bar />
<Linechart />
<Scatterplot />

<style>
</style>
