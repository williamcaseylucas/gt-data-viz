<script lang="ts">
	import { csvData } from '$lib';
</script>

<div class="content">
	<h1>List of Readings</h1>
	<p class="card">
		The list of readings for this class are below. For each topic, there is one reading that is
		expected to be covered in class (presented by the group presenting, and read by the entire class
		for discussion). Then, there are a list of optional relevant other readings about the topic in
		case you are particularly interested in learning more.
	</p>

	<!-- <h2>{$csvData[0].Topic}</h2>
	<p><b>Reading for today:</b></p>
	<ul>
		<li>{$csvData[0].Paper}</li>
	</ul>
	<p><i>Other relevant readings:</i></p> -->

	<table>
		<thead>
			<tr>
				<th>Topic</th>
				<th>Paper</th>
				<th>Date</th>
				<th>Week</th>
				<th>Link</th>
			</tr>
		</thead>
		<tbody>
			<!-- <tr>
				<td>1/9</td>
			</tr> -->
			{#each $csvData as row}
				<tr>
					<td>{row.Topic}</td>
					<td>{row.Paper}</td>
					<td>{row.Date}</td>
					<td>{row.Week}</td>
					<td>{row.Link}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	table {
		width: 100%;
	}
</style>
