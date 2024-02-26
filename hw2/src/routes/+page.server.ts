import type { PageServerLoad } from './$types';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import * as d3 from 'd3';
import type { CSVTypes } from '$lib';

export const prerender = true;

export const load: PageServerLoad = async () => {
	let csvPath = '';

	// If it contains this, then pre render static
	if (path.resolve(fileURLToPath(import.meta.url)).indexOf('/.svelte-kit') != -1) {
		const val = path
			.resolve(fileURLToPath(import.meta.url))
			.replace('/.svelte-kit/output/server/entries/pages/_page.server.ts.js', '');
		csvPath = val + '/src/lib/data/atl_weather_20to22.csv';
	}

	// Then prerender dynamic
	if (path.resolve(fileURLToPath(import.meta.url)).indexOf('src/routes') != -1) {
		csvPath = `${path.resolve(fileURLToPath(import.meta.url)).replace('/routes/+page.server.ts', '')}/lib/data/atl_weather_20to22.csv`;
	}

	const csv = fs.readFileSync(csvPath, 'utf-8');

	const data = d3.csvParse(
		csv,
		(row) =>
			<CSVTypes>{
				...d3.autoType(row),
				Date: new Date(row.Date)
			}
	);

	// Grab columns out since we have TS types anyways
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { columns, ...rest } = data;

	return { ...rest };
};
