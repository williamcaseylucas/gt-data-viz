import { CSVTypes } from "./interfaces";
import * as d3 from "d3";

let legend, x, y, svg, width, height;
const color = d3.scaleOrdinal(d3.schemeCategory10);
const margin = { top: 40, right: 30, bottom: 40, left: 50 };
let data_by_state

// line generator
const line = d3
  .line()
  .defined((d) => d.death != null)
  .x((d) => x(d.date))
  .y((d) => y(d.death));


export const create_line_chart = (
  filtered_data: CSVTypes[],
) => {
  const line_chart = d3.selectAll("#lines");
  let grouped_data = d3.group(filtered_data, (d) => d.state)
  // group by state but get sum of each
  let counts_of_positives_per_state = d3.rollup(filtered_data, v => d3.sum(v, d => d.positive), d => d.state)
  
  let sorted_counts = d3.sort(counts_of_positives_per_state, (row) => row[1])
  let top_10_states = new Set()
  sorted_counts.slice(1).slice(-5).forEach((val, state) => top_10_states.add(val[0]))

  // console.log('top_10_states', top_10_states);

  data_by_state = []
  grouped_data.forEach((vals, state) => {
    if (top_10_states.has(state)) {
      data_by_state.push([state, vals])
    }
  })

  // console.log('data_by_state', data_by_state);
  

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
  let max_y = d3.max(filtered_data, (d) => d.death);
  if (max_y == 0 || max_y == null) max_y = 50;
  y.domain([0, max_y]);



  // legends
  legend = d3.select(".legend");
  
  legend
  .style("display", "flex")
  .style("flex-wrap", "wrap")
  .style("gap", "5px")
  .style("margin-inline", "5px");
  
  legend.selectAll('div').remove()
  const legends = legend.selectAll('div')
    .data(data_by_state, (row, idx) => row[0])
    .enter()
    .append('div')
    .style('display', 'flex')
    .style('align-items', 'center')
  
  const color_legends = legends
  .append('div')
  .style("width", "10px")
  .style("height", "10px")
  .style("margin-right", "5px")
  .style("background-color", (state) => color(state));
  

  legends.append("span").text((state) => state[0]);


  // actual data
  svg.selectAll('.line')
      .data(data_by_state, (state, idx) => console.log('state', state))
      .join('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', (state, idx) => color(state[0]))
      .attr('stroke-width', 1)
      .attr('d', (row, idx) => {
        return line(row[1])
      })

  svg.select('#y-axis').remove()
  svg.select('#x-axis').remove()

  
  // x axis
  svg
  .append("g")
  .attr('id', 'x-axis')
  .attr("transform", `translate(0, ${height})`)
  .call(
    d3
      .axisBottom(x)
      .ticks(d3.timeDay.every(1))
      .tickFormat(d3.timeFormat("%d"))
  );


  // y axis
  svg.append("g").attr('id', 'y-axis').call(d3.axisLeft(y));
};