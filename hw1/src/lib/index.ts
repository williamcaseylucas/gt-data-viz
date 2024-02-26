// place files you want to import through the `$lib` alias in this folder.

export interface CSVTypes {
	Week: string;
	Date: string;
	Paper: string;
	Topic: string;
	Link: string;
}

import { writable } from 'svelte/store';

// export const navbar_elments = writable<string[] | null>([
// 	'Syllabus',
// 	'Schedule Table',
// 	'Readings',
// 	'Assignments'
// ]);

export const navbar_elments = ['Syllabus', 'Schedule Table', 'Readings', 'Assignments'];

export const csvData = writable<CSVTypes[] | []>([]);
