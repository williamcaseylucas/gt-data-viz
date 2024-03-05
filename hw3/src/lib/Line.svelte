<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { line_height, line_margin, line_width } from ".";
  let svgRef;
  onMount(() => {
    var main = d3.select(svgRef);
    const lineChartSvg = main
      .append("svg")
      .attr("width", line_width + line_margin.left + line_margin.right)
      .attr("height", line_height + line_margin.top + line_margin.bottom);

    //line chart
    d3.csv(
      "https://raw.githubusercontent.com/fuyuGT/CS7450-data/main/state_crime.csv"
    ).then(function (data) {
      const state_group = d3.rollup(
        data,
        (v) => d3.mean(v, (d) => +d["Data.Rates.Property.All"]),
        (d) => d.State,
        (d) => d.Year
      );
      console.log(state_group);

      const lineChartWidth = 500,
        lineChartHeight = 400;
      let lineChart = lineChartSvg
        .append("g")
        .attr("transform", "translate(" + 100 + "," + 50 + ")");

      // Define the time scale for the X-axis
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d3.timeParse("%Y")(d.Year)))
        .range([0, lineChartWidth]);

      // Append X-axis to the chart
      lineChart
        .append("g")
        .attr("transform", `translate(0, ${lineChartHeight})`)
        .call(d3.axisBottom(xScale));

      // Label for X-axis
      lineChart
        .append("text")
        .attr(
          "transform",
          `translate(${lineChartWidth / 2}, ${lineChartHeight + 40})`
        )
        .text("Year");

      // Define the linear scale for the Y-axis
      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(data, (d) => +d["Data.Rates.Property.All"]),
          d3.max(data, (d) => +d["Data.Rates.Property.All"]),
        ])
        .range([lineChartHeight, 0]);

      // Append Y-axis to the chart
      lineChart.append("g").call(d3.axisLeft(yScale));

      // Label for Y-axis
      lineChart
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -45)
        .attr("x", 0 - lineChartHeight / 2)
        .text("Total Average Crime Rate");

      // Define the line generator
      let line = d3
        .line()
        .x((d) => xScale(d3.timeParse("%Y")(d[0])))
        .y((d) => yScale(d[1]));

      // States and their respective colors
      const states = [
        "California",
        "Colorado",
        "Florida",
        "Georgia",
        "Indiana",
      ];
      const colors = ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"];

      // Scale for line colors
      var colorScale = d3.scaleOrdinal().domain(states).range(colors);

      // Append lines for each state
      states.forEach((state, index) => {
        lineChart
          .append("path")
          .datum(state_group.get(state))
          .attr("fill", "none")
          .attr("stroke", colorScale(state))
          .attr("stroke-width", 2.5)
          .attr("d", line);
      });

      // Legend
      lineChart
        .selectAll(".legend")
        .data(states)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`)
        .append("text")
        .attr("x", lineChartWidth + 20)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text((d) => d)
        .attr("fill", (d) => colorScale(d));

      // Append circles for legend
      lineChart
        .selectAll(".legend-circle")
        .data(states)
        .enter()
        .append("circle")
        .attr("cx", lineChartWidth + 10)
        .attr("cy", (d, i) => i * 20 + 10)
        .attr("r", 4)
        .style("fill", (d) => colorScale(d));
    });
  });
</script>

<div class="wrapper">
  <div id="main" bind:this={svgRef}></div>
</div>
