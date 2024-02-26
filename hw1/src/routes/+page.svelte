<script lang="ts">
	import type { CSVTypes } from '$lib';
	import type { PageServerData } from './$types';
	import Assignments from '$lib/components/assignments.svelte';
	import Readings from '$lib/components/readings.svelte';
	import ScheduleTable from '$lib/components/schedule-table.svelte';
	import Syllabus from '$lib/components/syllabus.svelte';
	import { csvData } from '$lib';

	export let data: PageServerData;

	// @ts-ignore
	const csv: CSVTypes[] = Object.values(data);
	csvData.set(csv);
</script>

<!-- {#each csv as row}
	{row.Week}
	{row.Date}
	{row.Paper}
	{row.Topic}
	{row.Link}
{/each} -->

<!-- 'Syllabus', 'Schedule Table', 'Readings', 'Assignments' -->
<section id="syllabus">
	<Syllabus />
</section>
<section id="schedule-table">
	<ScheduleTable />
</section>
<section id="readings">
	<Readings />
</section>
<section id="assignments">
	<Assignments />
</section>

<style>
	section {
		scroll-margin-top: var(--nav-height);
		min-height: 100vh;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	section .syllabus {
		margin-top: var(--nav-height);
	}

	section:nth-child(odd) {
		background: var(--gradient-1);
	}

	section:nth-child(even) {
		background: var(--gradient-17);
	}
</style>
