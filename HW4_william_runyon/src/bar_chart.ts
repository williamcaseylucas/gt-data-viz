// Will hold hospitalization records showing maybe died versus survived (top 5 states) or just single state

// hospitalized, death, positive

import { CSVTypes } from "./interfaces";
import * as d3 from "d3";

let svg;

const margin = {
  top: 20,
  right: 50,
  bottom: 100,
  left: 75,
};

export const create_bar_chart = (filtered_data: CSVTypes[]) => {
  const bar_chart = d3.selectAll("#bar");

  // Get data setup
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
  let groups = [];
  let subgroups;
  sorted_counts
    .slice(1)
    .slice(-5)
    .forEach((val, idx) => {
      const [key, data] = val;
      subgroups = Object.keys(data);
      bar_data.push({ state: key, ...data });
      groups.push(key);
    });

  console.log(bar_data, "groups", groups, "subgroups", subgroups);
  // Create SVG

  // @ts-ignore
  const container = bar_chart.node().getBoundingClientRect();
  const width = 740 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // console.log(subgroups, groups);

  if (!svg) {
    svg = bar_chart
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left + "," + margin.top})`);
  }

  // Add X axis
  const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);

  const vals_to_check = bar_data.map((item) => item.state);

  svg.select("#bar-x-axis").remove();
  svg.select("#bar-y-axis").remove();

  svg
    .append("g")
    .attr("id", "bar-x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 60]).range([height, 0]);
  svg.append("g").attr("id", "bar-y-axis").call(d3.axisLeft(y));

  // color palette = one color per subgroup
  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#e41a1c", "#377eb8", "#4daf4a"]);

  console.log(bar_data);
  //stack the data? --> stack per subgroup

  const stackedData = d3.stack().keys(subgroups)(bar_data);

  console.log("union", d3.union(bar_data.map((row) => row.state)));

  console.log("stacked_data", stackedData);

  svg
    .append("g")
    .selectAll("g")
    .data(stackedData)
    .join("g")
    .attr("fill", (d) => color(d.key)) //
    .selectAll("rect")
    .data((d) => d)
    .join("rect")
    .attr("x", (d) => x(d.data.state))
    .attr("y", (d) => y(d[1]))
    .attr("height", (d) => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth());

  // const width = 1200 - margin.left - margin.right;
  // const height = 500 - margin.top - margin.bottom;
  // width = container.width - margin.left - margin.right;
  // height = 300 - margin.top - margin.bottom;

  // x = d3.scaleTime().range([0, width]);
  // y = d3.scaleLinear().range([height, 0]);
};
