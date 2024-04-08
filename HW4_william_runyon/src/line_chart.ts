import { CSVTypes } from "./interfaces";
import * as d3 from "d3";

const margin = { top: 70, right: 30, bottom: 40, left: 80 };

export const create_line_chart = (
  filtered_data: CSVTypes[],
  data_by_state: d3.InternMap<string, CSVTypes[]>,
  lines: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
) => {
  // @ts-ignore
  const container = lines.node().getBoundingClientRect();

  // const width = 1200 - margin.left - margin.right;
  // const height = 500 - margin.top - margin.bottom;
  const width = container.width - margin.left - margin.right;
  const height = container.height - margin.top - margin.bottom;

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const legend = d3.select(".legend");
  legend
    .style("display", "flex")
    .style("flex-wrap", "wrap")
    .style("gap", "5px")
    .style("margin-inline", "5px");

  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const svg = lines
    .append("svg")
    .style("display", "block")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // line generator
  const line = d3
    .line()
    .defined((d) => d.death != null)
    .x((d) => x(d.date))
    .y((d) => y(d.death));

  x.domain(d3.extent(filtered_data, (d) => d.date));
  let max_y = d3.max(filtered_data, (d) => d.death);
  if (max_y == 0 || max_y == null) max_y = 50;
  y.domain([0, max_y]);

  data_by_state.forEach((data, state) => {
    // console.log("data", data, "state", state);
    const legendItem = legend.append("div");

    // Add a colored square
    legendItem
      .append("span")
      .style("display", "inline-block")
      .style("width", "10px")
      .style("height", "10px")
      .style("margin-right", "5px")
      .style("background-color", color(state));

    // Add the state name
    legendItem.append("span").text(state);
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color(state))
      .attr("stroke-width", 1)
      .attr("d", line);
  });

  // x axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(d3.timeDay.every(1))
        .tickFormat(d3.timeFormat("%d"))
    );

  // y axis
  svg.append("g").call(d3.axisLeft(y));
};
