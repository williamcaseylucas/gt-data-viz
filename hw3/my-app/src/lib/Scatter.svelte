<script lang="ts">
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { scatter_height, scatter_margin, scatter_width } from ".";

  let svgRef;

  onMount(() => {
    var main = d3.select(svgRef);

    const scatterPlotSvg = main
      .append("svg")
      .attr("width", scatter_width + scatter_margin.left + scatter_margin.right)
      .attr(
        "height",
        scatter_height + scatter_margin.top + scatter_margin.bottom
      );

    // Scatterplot
    // based on https://d3-graph-gallery.com/graph/scatter_basic.html
    d3.csv(
      "https://raw.githubusercontent.com/fuyuGT/CS7450-data/main/state_crime.csv"
    ).then(function (data) {
      let state_data = data.filter((d) => d.State == "Georgia");
      console.log("scatter", state_data);

      const maxHeight = 400,
        maxWidth = 500;

      let xMax = d3.max(
        state_data.map((d) => +d["Data.Rates.Property.Burglary"])
      );

      const x = d3.scaleLinear().domain([0, xMax]).range([0, maxWidth]);

      let yMax = d3.max(
        state_data.map((d) => +d["Data.Rates.Property.Larceny"])
      );
      let yMin = d3.min(
        state_data.map((d) => +d["Data.Rates.Property.Larceny"])
      );

      const y = d3.scaleLinear().domain([yMin, yMax]).range([maxHeight, 0]);

      let sizeMax = d3.max(
        state_data.map((d) => +d["Data.Rates.Property.Burglary"])
      );
      const s = d3.scaleLinear().domain([0, sizeMax]).range([2.5, 6]);

      let scatterPlot = scatterPlotSvg
        .append("g")
        .attr("transform", "translate(" + 100 + "," + 50 + ")");

      scatterPlot
        .append("g")
        .selectAll(".myCircles")
        .data(state_data)
        .enter()
        .append("circle")
        .attr("class", "myCircles")
        .attr("cx", (d) => x(d["Data.Rates.Property.Burglary"]))
        .attr("cy", (d) => y(d["Data.Rates.Property.Larceny"]))
        .attr("r", (d) => s(d["Data.Population"]) * 0.0007)
        .attr("opacity", 0.8)
        .style("fill", "#fc8d62");

      //add x axis
      scatterPlot
        .append("g")
        .attr("transform", `translate(0, ${maxHeight})`)
        .call(d3.axisBottom(x));

      scatterPlot
        .append("text")
        .attr("class", "my-axis-label")
        .attr("transform", `translate(${maxWidth / 3}, ${maxHeight + 40})`)
        .text("Larcency Rate");

      //add y axis
      scatterPlot.append("g").call(d3.axisLeft(y));

      scatterPlot
        .append("text")
        .attr("class", "my-axis-label")
        .attr("transform", `translate(-45,${maxHeight / 2 + 50})rotate(-90)`)
        .text("Burglary Rate");

      // Title
      scatterPlot
        .append("text")
        .attr("class", "my-title")
        .attr("transform", `translate(120, -20)`)
        .text("Yearly Larcency Rate over Burglary Rate for Georgia");
      scatterPlot
        .append("text")
        .attr("class", "my-title")
        .attr("transform", `translate(120, 0)`)
        .text("(Size based on population)");
    });
  });
</script>

<div class="wrapper">
  <div id="main" bind:this={svgRef}></div>
</div>
