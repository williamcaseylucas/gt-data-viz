import { CSVTypes } from "./interfaces";
import * as d3 from "d3";

let legend, x, y, svg, width, height, states_to_index;
const color = d3.scaleOrdinal(d3.schemeCategory10);
const margin = { top: 40, right: 30, bottom: 40, left: 50 };
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
  // @ts-ignore
  const container = scatter_plot.node().getBoundingClientRect();
  // const width = 740 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  const width = container.width - margin.left - margin.right;
  const xDomain = d3.extent(filtered_data, (d) => d.date);
  const x = d3.scaleLinear().domain(xDomain).range([0, width]);
  const yDomain = d3.extent(filtered_data, (d) => d.positive);
  const y = d3.scaleLinear().domain(yDomain).range([height, 0]);
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);
  const svg = scatter_plot
    .append("svg")
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`);
  svg
    .select("x-axis")
    .append("g")
    .call(xAxis.ticks(5).tickFormat((d) => d));

  // console.log("grouped_data", grouped_data);
  // legends
  // legend = d3.select(".legend-3");
  // legend
  //   .style("display", "flex")
  //   .style("flex-wrap", "wrap")
  //   .style("gap", "5px")
  //   .style("margin-inline", "5px");
  // legend.selectAll("div").remove();
  // const legends = legend
  //   .selectAll("div")
  //   .data(data_by_state, (row, idx) => row[0])
  //   .enter()
  //   .append("div")
  //   .style("display", "flex")
  //   .style("align-items", "center");
  // const getColors = (state) => {
  //   return ten_colors[states_to_index[state[0].toString()]];
  // };
  // const color_legends = legends
  //   .append("div")
  //   .style("width", "10px")
  //   .style("height", "10px")
  //   .style("margin-right", "5px")
  //   .style("background-color", (state) => getColors(state));
  // legends.append("span").text((state) => state[0]);
};
