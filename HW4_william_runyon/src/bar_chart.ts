// Will hold hospitalization records showing maybe died versus survived (top 5 states) or just single state

// hospitalized, death, positive

import { CSVTypes } from "./interfaces";
import * as d3 from "d3";

export const create_bar_chart = (filtered_data: CSVTypes[]) => {
  const bar_chart = d3.selectAll("#bar");

  let grouped_data = d3.rollup(
    filtered_data,
    (v) => ({
      positiveSum: d3.sum(v, (d) => d.positive),
      hospitalizeSum: d3.sum(v, (d) => d.hospitalized),
      deathSum: d3.sum(v, (d) => d.death),
    }),
    (d) => d.state
  );

  let sorted_counts = d3.sort(grouped_data, (row) => row[1].positiveSum);

  let bar_data = []; //{state: 'CA', positiveSum: 53417, hospitalizeSum: 0, deathSum: 1081}
  sorted_counts
    .slice(1)
    .slice(-5)
    .forEach((val, idx) => {
      const [key, data] = val;

      bar_data.push({ state: key, ...data });
    });

  // @ts-ignore
  const container = bar_chart.node().getBoundingClientRect();

  // const width = 1200 - margin.left - margin.right;
  // const height = 500 - margin.top - margin.bottom;
  // width = container.width - margin.left - margin.right;
  // height = 300 - margin.top - margin.bottom;

  // x = d3.scaleTime().range([0, width]);
  // y = d3.scaleLinear().range([height, 0]);
};
