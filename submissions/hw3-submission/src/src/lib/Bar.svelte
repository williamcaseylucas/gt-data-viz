<script lang="ts">
  import { states_of_interest } from ".";

  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { bar_height, bar_margin, bar_width } from ".";
  let svgRef;
  let x, y;

  const maxBarHeight = 200;
  const barChartWidth = 800;

  const invertScale = (val) => {
    const domain = x.domain();
    const paddingOuter = x(domain[0]);
    const eachBand = x.step();
    const index = Math.floor((val - paddingOuter) / eachBand);
    return Math.max(0, Math.min(index, domain.length - 1)); // gives indicies
    // return domain[Math.max(0, Math.min(index, domain.length - 1))]; // gives start and end state
  };
  let state_data: d3.InternMap;
  let state_keys = [];

  $: brush = d3
    .brushX()
    .extent([
      [0, 0],
      [bar_width, bar_height],
    ])
    .on("start brush end", (e) => {
      if (e.selection) {
        const range = e.selection.map(invertScale);

        states_of_interest.set(state_keys.slice(range[0], range[1]));
        // selection = e.selection.map(invertScale);
      }
    });

  $: if (brush) mainFunc(brush);

  const mainFunc = (brush) => {
    var main = d3.select(svgRef);
    main.selectAll("*").remove();
    const barChartSvg = main
      .append("svg")
      .attr("width", bar_width + bar_margin.left + bar_margin.right)
      .attr("height", bar_height + bar_margin.top + bar_margin.bottom);

    // Bar chart
    // Based on https://d3-graph-gallery.com/graph/barplot_basic.html
    d3.csv(
      "https://raw.githubusercontent.com/fuyuGT/CS7450-data/main/state_crime.csv"
    ).then(function (data) {
      // Bars

      let barChart = barChartSvg
        .append("g")
        .attr("transform", "translate(" + 100 + "," + 50 + ")");

      // Data
      state_data = d3.rollup(
        data,
        (v) => d3.mean(v, (d) => +d["Data.Rates.Violent.Murder"]),
        (d) => d.State
      );

      if (state_keys.length == 0) {
        state_keys = [...state_data.keys()];
      }

      // console.log("bar data", state_data);

      x = d3
        .scaleBand()
        .range([0, barChartWidth])
        .domain(data.map((d) => d.State))
        .padding(0.2);

      let yMax = d3.max(state_data.values());

      y = d3.scaleLinear().domain([0, yMax]).range([maxBarHeight, 0]);

      barChart
        .selectAll(".myBar")
        .data(state_data)
        .enter()
        .append("rect")
        .attr("class", "myBar")
        .attr("x", (d) => x(d[0]))
        .attr("y", (d) => y(d[1]))
        .attr("width", x.bandwidth())
        .attr("height", (d) => maxBarHeight - y(d[1]))
        .attr("fill", "#8da0cb");

      // Adding axes
      barChart
        .append("g")
        .attr("transform", `translate(0, ${maxBarHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      barChart
        .append("text")
        .attr("class", "my-axis-label")
        .attr(
          "transform",
          `translate(${barChartWidth / 2}, ${maxBarHeight + 75})`
        )
        .text("States");

      // add y axis
      barChart.append("g").call(d3.axisLeft(y));

      barChart
        .append("text")
        .attr("class", "my-axis-label")
        .attr("transform", "translate(-40,165)rotate(-90)")
        .text("Average Murder Rate");

      // Title
      barChart
        .append("text")
        .attr("class", "my-title")
        .attr("transform", `translate(200,-10)`)
        .text("Average Murder Rate Across States from 1960 to 2015");

      // Add brush
      barChart.append("g").call(brush).call(brush.move, [0, 100]);
    });
  };

  onMount(() => mainFunc(brush));
</script>

<div class="wrapper">
  <div id="main" bind:this={svgRef}></div>
</div>
