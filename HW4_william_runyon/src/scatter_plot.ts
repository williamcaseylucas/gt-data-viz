import { CSVTypes } from "./interfaces";
import * as d3 from "d3";

let legend, x, y, svg, width, height, states_to_index;
const color = d3.scaleOrdinal(d3.schemeCategory10);
const margin = { top: 40, right: 30, bottom: 40, left: 30};
let data_by_state;

const ten_colors = [
  "#5ad8b5",
  "#57cae3",
  "#3884ec",
  "#c638ec",
  "#e54cb1",
  "#f2a900",
  "#00a8f3",
  "#8700f3",
  "#f30068",
  "#f3b200",
];

// positive test cases per state

export const create_scatter_plot = (filtered_data: CSVTypes[]) => {
  const scatter_plot = d3.selectAll("#scatter");
  let grouped_data = d3.group(filtered_data, (d) => d.state);

  console.log('grouped data', grouped_data);

  // @ts-ignore
  const container = scatter_plot.node().getBoundingClientRect();

  // const width = 740 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  const width = container.width - margin.left - margin.right;

  // Create X and Y scales
  const x = d3.scaleTime()
  .domain(d3.extent(filtered_data, d => d.date))
  .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(filtered_data, d => d.positive)])
    .range([height, 0]);

  const svg = scatter_plot
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

  svg
    .append("g")
    .attr('class', "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg
  .append('g')
  .attr('class', 'y-axis')
    .call(d3.axisLeft(y))

   // Add dots
   svg.selectAll('g')
   .data(grouped_data)
   .enter()
   .append('g')
   .selectAll("circle")
   .data((d) => d[1])
   .enter()
   .append('circle')
    .attr("cx", (d) => x(d.date))
    .attr("cy", (d) => y(d.positive))
    .attr("r", 1.5)
    .style("fill", "#69b3a2")

};
