<script lang="ts">
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { scatter_height, scatter_margin, scatter_width } from ".";

  // let svgRef;

  let data;
  let state_data;
  onMount(async () => {
    data = await d3.csv(
      "https://raw.githubusercontent.com/fuyuGT/CS7450-data/main/state_crime.csv"
    );
  });

  let x, y, s;
  let svgRef;

  $: if (data) {
    state_data = data.filter((d) => d.State == "Georgia");

    // --- Scaling ---
    const maxHeight = 400,
      maxWidth = 750;

    let xMax = d3.max(
      state_data.map((d) => +d["Data.Rates.Property.Burglary"])
    );

    let yMax = d3.max(state_data.map((d) => +d["Data.Rates.Property.Larceny"]));
    let yMin = d3.min(state_data.map((d) => +d["Data.Rates.Property.Larceny"]));

    x = d3.scaleLinear().domain([0, xMax]).range([0, maxWidth]);
    y = d3.scaleLinear().domain([yMin, yMax]).range([maxHeight, 0]);

    let sizeMax = d3.max(
      state_data.map((d) => +d["Data.Rates.Property.Burglary"])
    );
    s = d3.scaleLinear().domain([0, sizeMax]).range([2.5, 6]);

    // --- Axis ---
    const scatterPlot = d3.select(svgRef).selectAll(".myCircles");

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
  }

  let hoverData;
</script>

<div class="wrapper">
  {#if state_data}
    <svg
      width={scatter_width + scatter_margin.left + scatter_margin.right}
      height={scatter_height + scatter_margin.top + scatter_margin.bottom}
      bind:this={svgRef}
      on:mouseleave={() => {
        hoverData = null;
      }}
      style="position:relative"
    >
      <g transform="translate(100,50)">
        <g class="myCircles">
          {#each state_data as d}
            <circle
              class="myCircles"
              cx={x(d["Data.Rates.Property.Burglary"])}
              cy={y(d["Data.Rates.Property.Larceny"])}
              r={s(d["Data.Population"]) * 0.0007}
              opacity="0.8"
              style="fill: #fc8d62"
              on:mouseover={() => {
                hoverData = d;
              }}
            />
          {/each}
        </g>
      </g>
    </svg>
    {#if hoverData}
      <div
        class="tooltip"
        style="position: absolute; top: {y(
          hoverData['Data.Rates.Property.Larceny']
        )}px; left: {x(hoverData['Data.Rates.Property.Burglary'])}px;"
      >
        <p>Population:</p>
        <b>{hoverData["Data.Population"]}</b>
        <p>Year:</p>
        <b>{hoverData["Year"]}</b>
      </div>
    {/if}
  {/if}
</div>

<style>
  .wrapper {
    position: relative;
  }

  .tooltip {
    padding: 2px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    pointer-events: none;
    transition:
      top 300ms ease,
      left 300ms ease;

    border-radius: 5px;
    opacity: 75%;
  }
</style>
