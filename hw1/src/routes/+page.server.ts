import type { PageServerLoad } from './$types';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import * as d3 from 'd3';

export const prerender = true;

export const load: PageServerLoad = async ({ route }) => {
	let csvPath = '';

	// If it contains this, then pre render static
	if (path.resolve(fileURLToPath(import.meta.url)).indexOf('/.svelte-kit') != -1) {
		const val = path
			.resolve(fileURLToPath(import.meta.url))
			.replace('/.svelte-kit/output/server/entries/pages/_page.server.ts.js', '');
		csvPath = val + '/src/lib/assets/data/hw2-papers.csv';
	}

	// Then prerender dynamic
	if (path.resolve(fileURLToPath(import.meta.url)).indexOf('src/routes') != -1) {
		csvPath = `${path.resolve(fileURLToPath(import.meta.url)).replace('/routes/+page.server.ts', '')}/lib/assets/data/hw2-papers.csv`;
	}

	const csv = fs.readFileSync(csvPath, 'utf-8');
	const data = d3.csvParse(csv);
	// Gran columns out since we have TS types anyways
	const { columns, ...rest } = data;
	return { ...rest };
};
