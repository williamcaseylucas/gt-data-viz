import { CSVTypes } from "./interfaces";
import * as d3 from "d3";
import { HEIGHT, STATES_TO_COLORS } from "./constants";
import { getKStates } from "./functions";

let svg;
const margin = { top: 40, right: 30, bottom: 40, left: 50 };

// positive test cases per state

export const create_scatter_plot = (filtered_data: CSVTypes[]) => {
  const scatter_plot = d3.selectAll("#scatter");
  let grouped_data = d3.group(filtered_data, (d) => d.state);

  let counts_of_positive_per_state = d3.rollup(
    filtered_data,
    (v) => d3.sum(v, (d) => d.positiveIncrease),
    (d) => d.state
  );

  const data_by_state = getKStates(
    10,
    counts_of_positive_per_state,
    grouped_data
  );

  // @ts-ignore
  const container = scatter_plot.node().getBoundingClientRect();

  // const width = 740 - margin.left - margin.right;
  // const height = HEIGHT - margin.top - margin.bottom;
  const height = container.height - margin.top - margin.bottom;
  const width = container.width - margin.left - margin.right;

  // // Create X and Y scales
  const x = d3
    .scaleTime()
    .domain(d3.extent(filtered_data, (d) => d.date))
    .range([0, width]);

  let maxY = 0;
  data_by_state.forEach(([state, array], idx) => {
    maxY = Math.max(
      maxY,
      d3.max(array, (d) => d.positive)
    );
  });

  console.log("data_by_state", data_by_state);
  console.log("max_y", maxY);

  const y = d3.scaleLinear().domain([0, maxY]).range([height, 0]);

  if (!svg) {
    svg = scatter_plot
      .append("svg")
      .style("display", "block")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  }

  d3.select(".x-axis").remove();
  d3.select(".y-axis").remove();

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

  d3.selectAll(".circles").remove();

  // Add dots
  svg
    .selectAll(".circles")
    .append("g")
    .attr("class", "circles")
    .data(data_by_state, (d) => {
      console.log("scatter data", d);
      return d;
    })
    .enter()
    .append("g")
    .attr("class", "circles")
    .selectAll("circles")
    .data((d) => d[1])
    .join("circle")
    .attr("cx", (d) => x(d.date))
    .attr("cy", (d) => y(d.positive))
    .attr("r", 3)
    .style("fill", (d) => STATES_TO_COLORS[d.state]); // "#69b3a2"

  // legends
  const legend = d3.select(".legend-3");

  legend
    .style("display", "flex")
    .style("flex-wrap", "wrap")
    .style("gap", "5px")
    .style("margin-inline", "5px");

  legend.selectAll("div").remove();
  const legends = legend
    .selectAll("div")
    .data(data_by_state, (row, idx) => row[0])
    .enter()
    .append("div")
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "center")
    .style("margin-inline", "auto")
    .attr("class", "legend");

  const color_legends = legends
    .append("div")
    .style("width", "10px")
    .style("height", "10px")
    .style("margin-right", "5px")
    .style("background-color", (state) => STATES_TO_COLORS[state[0]]);

  legends.append("span").text((state) => state[0]);
};
