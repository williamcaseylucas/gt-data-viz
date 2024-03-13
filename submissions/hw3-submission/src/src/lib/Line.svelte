<script lang="ts">
  export let dropDown;
  export let useStore;
  import { states_of_interest } from ".";
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { line_height, line_margin, line_width } from ".";
  let svgRef;

  // States and their respective colors
  $: states = ["California", "Colorado", "Florida", "Georgia", "Indiana"];
  // $: console.log($states_of_interest, useStore);
  $: if ($states_of_interest != null && useStore) states = $states_of_interest;
  const colors = ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"];

  const rate_states = [
    "Data.Rates.Property.All",
    "Data.Rates.Property.Burglary",
    "Data.Rates.Property.Larceny",
    "Data.Rates.Property.Motor",
    "Data.Rates.Violent.All",
    "Data.Rates.Violent.Assault",
    "Data.Rates.Violent.Murder",
    "Data.Rates.Violent.Rape",
    "Data.Rates.Violent.Robbery",
  ];

  const titleMap = {
    "Data.Rates.Property.All": "Total Average Crime Rate",
    "Data.Rates.Property.Burglary": "Total Average Burglary Rate",
    "Data.Rates.Property.Larceny": "Total Average Larceny Rate",
    "Data.Rates.Property.Motor": "Total Average Motor Rate",
    "Data.Rates.Violent.All": "Total Average Violent Crime Rate",
    "Data.Rates.Violent.Assault": "Total Average Violent Assault Rate",
    "Data.Rates.Violent.Murder": "Total Average Violent Murder Rate",
    "Data.Rates.Violent.Rape": "Total Average Violent Rape Rate",
    "Data.Rates.Violent.Robbery": "Total Average Violent Robbery Rate",
  };
  let selected = rate_states[0];

  const mainFunc = (select, states) => {
    var main = d3.select(svgRef);
    // Refresh each time this is called
    main.selectAll("*").remove();

    const lineChartSvg = main
      .append("svg")
      .attr("width", line_width)
      .attr("height", line_height + 50);

    //line chart
    d3.csv(
      "https://raw.githubusercontent.com/fuyuGT/CS7450-data/main/state_crime.csv"
    ).then(function (data) {
      // (v) => d3.mean(v, (d) => +d["Data.Rates.Property.All"]),
      const state_group = d3.rollup(
        data,
        (v) => d3.mean(v, (d) => +d[select]),
        (d) => d.State,
        (d) => d.Year
      );

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
          d3.min(data, (d) => +d[select]),
          d3.max(data, (d) => +d[select]),
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
        .text(titleMap[select]);

      // Define the line generator
      let line = d3
        .line()
        .x((d) => xScale(d3.timeParse("%Y")(d[0])))
        .y((d) => yScale(d[1]));

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
  };

  onMount(() => mainFunc(selected, states));

  // Will rerun function every time you change the selected state
  $: mainFunc(selected, states);
</script>

<div class="wrapper">
  <div id="main" bind:this={svgRef}></div>
  {#if dropDown}
    <select bind:value={selected}>
      {#each rate_states as state}
        <option value={state}>
          {state}
        </option>
      {/each}
    </select>
  {/if}
</div>

<style>
  :root {
    --select-border: #777;
    --select-focus: blue;
    --select-arrow: var(--select-border);
  }
  select {
    width: 100%;
    border: 1px solid var(--select-border);
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 1.25rem;
    cursor: pointer;
    line-height: 1.1;
    background-color: #f3f3f3;
    background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  }
</style>
