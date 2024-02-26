// place files you want to import through the `$lib` alias in this folder.

export interface CSVTypes {
	City: string;
	Date: Date;
	Precip: number;
	Weather: string;
	Dewpoint: number;
    Pressure: number;
    Visibility: number;
    Windspeed: number;
    MaxSpeed: number;
    TempMax: number;
    TempMin: number;

}

export interface marginType {
    top: number,
    bottom: number,
    left: number,
    right: number
}

export type scatterType = [number, {
    modeDewpoint: number;
    meanWind: number | undefined;
}]

import { writable } from 'svelte/store';

export const csvData = writable<CSVTypes[] | []>([]);