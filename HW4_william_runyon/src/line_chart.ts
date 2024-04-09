import { CSVTypes } from "./interfaces";
import * as d3 from "d3";

let legend, x, y, svg, width, height, states_to_index;
const color = d3.scaleOrdinal(d3.schemeCategory10);
const margin = { top: 40, right: 30, bottom: 40, left: 50 };
let data_by_state;

const five_colors = ["#5ad8b5", "#57cae3", "#3884ec", "#c638ec", "#e54cb1"];

// line generator
const line = d3
  .line()
  .defined((d) => d.death != null)
  .x((d) => x(d.date))
  .y((d) => y(d.death));

export const create_line_chart = (filtered_data: CSVTypes[]) => {
  const line_chart = d3.selectAll("#lines");
  let grouped_data = d3.group(filtered_data, (d) => d.state);

  if (grouped_data.size === 1) {
    data_by_state = [];
    grouped_data.forEach((vals, state) => {
      data_by_state.push([state, vals]);
      states_to_index[state] = 0
      d3.select('#lines-heading').text(`COVID Deaths in ${state}`)
      });

  } else {
    d3.select('#lines-heading').text(`Top 5 States with COVID Deaths`)
    // group by state but get sum of each
    let counts_of_positives_per_state = d3.rollup(
      filtered_data,
      (v) => d3.sum(v, (d) => d.positive),
      (d) => d.state
    );
  
    let sorted_counts = d3.sort(counts_of_positives_per_state, (row) => row[1]);
    let top_5_states = new Set();
    sorted_counts
      .slice(1)
      .slice(-5)
      .forEach((val, state) => top_5_states.add(val[0]));
  
    let i = 0;
    states_to_index = {};
    top_5_states.forEach((state) => {
      states_to_index[state] = i;
      i += 1;
    });
  
    // console.log('top_10_states', top_10_states);
  
    data_by_state = [];
    grouped_data.forEach((vals, state) => {
      if (top_5_states.has(state)) {
        data_by_state.push([state, vals]);
      }
    });
  }

  // @ts-ignore
  const container = line_chart.node().getBoundingClientRect();

  // const width = 1200 - margin.left - margin.right;
  // const height = 500 - margin.top - margin.bottom;
  width = container.width - margin.left - margin.right;
  height = 300 - margin.top - margin.bottom;

  x = d3.scaleTime().range([0, width]);
  y = d3.scaleLinear().range([height, 0]);

  if (!svg) {
    svg = line_chart
      .append("svg")
      .style("display", "block")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  }

  x.domain(d3.extent(filtered_data, (d) => d.date));
  let max_y = 0
  data_by_state.forEach((state) => {
    const data_array = state[1]
    max_y = Math.max(max_y, d3.max(data_array, (d) => d.death));
  })
  
  if (max_y == 0 || max_y == null) max_y = 50;
  y.domain([0, max_y]);

  // legends
  legend = d3.select(".legend");

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
    .style("align-items", "center");

  const getColors = (state) => {
    return five_colors[states_to_index[state[0].toString()]];
  };

  const color_legends = legends
    .append("div")
    .style("width", "10px")
    .style("height", "10px")
    .style("margin-right", "5px")
    .style("background-color", (state) => getColors(state));

  legends.append("span").text((state) => state[0]);

  // // tooltip
  const circle = svg
    .append("circle")
    .attr("fill", "steelblue")
    .style("stroke", "white")
    .attr("opacity", 0)
    .style("pointer-events", "none");

  const tooltip = line_chart.append("div").attr("class", "tooltip");

  // let tooltipText = svg.append("text").style("opacity", 0);

  // actual data
  svg
    .selectAll(".line")
    .data(data_by_state, (state, idx) => state)
    .join("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", (state, idx) => getColors(state))
    .attr("stroke-width", 2)
    .attr("d", (row, idx) => line(row[1]))
    .on("mouseover", (e, data, i) => {
      const [state, d] = data;
      const [xCoordinates, yCoordinates] = d3.pointer(e, this);
      circle
        .attr("cx", xCoordinates)
        .attr("cy", yCoordinates)
        .style("opacity", 1);

      circle.transition().duration(50).attr("r", 5);

      const x0 = x.invert(xCoordinates); // gives date

      const data_from_date = d.find((row) => row.date.getDay() === x0.getDay());
      // console.log(data_from_date.state, data_from_date.death);

      tooltip
        .style("display", "block")
        .style("left", `${xCoordinates + 50}px`)
        .style("top", `${yCoordinates + 50}px`)
        .html(
          `<strong>State: </strong> ${data_from_date.state}<br><strong>Death: </strong> ${data_from_date.death}`
        );
    })
    .on("mouseout", (e, data, i) => {
      circle.style("opacity", 0);
      tooltip.style("display", "none");
    });

  svg.select("#y-axis").remove();
  svg.select("#x-axis").remove();

  // x axis
  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(d3.timeDay.every(1))
        .tickFormat(d3.timeFormat("%d"))
    );

  // y axis
  svg.append("g").attr("id", "y-axis").call(d3.axisLeft(y));
};
