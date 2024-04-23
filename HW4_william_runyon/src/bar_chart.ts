// Will hold hospitalization records showing maybe died versus survived (top 5 states) or just single state

// hospitalized, death, positive

import { BAR_DATA, CSVTypes } from "./interfaces";
import * as d3 from "d3";

let svg;

const margin = {
  top: 20,
  right: 50,
  bottom: 50,
  left: 75,
};

const colors = ["#C7EFCF", "#FE5F55", "#000000"];

const label_to_color = {
  positiveSum: colors[0],
  negativeSum: colors[1],
  // deathSum: colors[2],
};

export const create_bar_chart = (
  filtered_data: CSVTypes[],
  slider_value: number
) => {
  const bar_chart = d3.selectAll("#bar");

  const bar_data: BAR_DATA[] = []; //{state: 'CA', positiveSum: 53417, negativeSum: 0, deathSum: 1081}
  let groups = [];
  let subgroups;

  // Get data setup
  let grouped_data = d3.rollup(
    filtered_data,
    (v) => ({
      positiveSum: d3.sum(v, (d) => d.positiveIncrease),
      negativeSum: d3.sum(v, (d) => d.negativeIncrease),
      // deathSum: d3.sum(v, (d) => d.deathIncrease),
    }),
    (d) => d.state
  );

  if (grouped_data.size == 1) {
    grouped_data.forEach((row, state) => {
      d3.select("#bar-heading").text(`Positive vs Negative ${state}`);
      subgroups = Object.keys(row);
      // @ts-ignore
      bar_data.push({ state, ...row });
      groups.push(state);
    });
  } else {
    let sorted_counts = d3.sort(grouped_data, (row) => row[1].positiveSum);

    sorted_counts
      .slice(1)
      .slice(-slider_value)
      .forEach((val, _) => {
        const [key, data] = val;
        subgroups = Object.keys(data);
        // @ts-ignore
        bar_data.push({ state: key, ...data });
        groups.push(key);
      });
    const sliderVal = +d3.select(".slider").property("value");
    d3.select("#bar-heading").text(
      `Top ${sliderVal} Most Positive Tests (Positive vs Negative) by State`
    );
  }

  // console.log(bar_data, "groups", groups, "subgroups", subgroups);

  // @ts-ignore
  const container = bar_chart.node().getBoundingClientRect();
  // const width = 740 - margin.left - margin.right;
  // const height = 500 - margin.top - margin.bottom;
  // const height = container.bottom - margin.top - margin.bottom;
  // console.log("container height", container);

  const width = container.width - margin.left - margin.right;
  // const height = HEIGHT - margin.top - margin.bottom;
  const height = container.height - margin.top - margin.bottom;

  // console.log(subgroups, groups);

  if (!svg) {
    svg = bar_chart
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left + "," + margin.top})`);
  }

  // // Add X axis
  // @ts-ignore
  const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);

  svg.select("#bar-x-axis").remove();
  svg.select("#bar-y-axis").remove();
  d3.select(".bar-x-axis-label").remove();
  d3.select(".bar-y-axis-label").remove();

  // x axis text label
  svg
    .append("text")
    .attr("class", "bar-x-axis-label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 20)
    .text("State");

  // y axis text label
  svg
    .append("text")
    .attr("class", "bar-y-axis-label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("People Affected");

  svg
    .append("g")
    .attr("id", "bar-x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  let y_max = d3.max(bar_data, (d) => d.positiveSum + d.negativeSum);
  const y = d3.scaleLinear().domain([0, y_max]).range([height, 0]);
  svg.append("g").attr("id", "bar-y-axis").call(d3.axisLeft(y));

  // color palette = one color per subgroup
  const color = d3.scaleOrdinal().domain(subgroups).range(colors);

  // @ts-ignore
  const stackedData = d3.stack().keys(subgroups)(bar_data);

  // Add the legend
  const legend = d3.select(".legend-2");

  legend
    .style("display", "flex")
    .style("flex-wrap", "wrap")
    .style("gap", "5px")
    .style("margin-inline", "5px");

  legend.selectAll("div").remove();

  const legends = legend
    .selectAll("div")
    .data(Object.keys(label_to_color))
    .enter()
    .append("div")
    .style("display", "flex")
    .style("align-items", "center")
    .style("margin-inline", "auto");

  legends
    .append("div")
    .style("width", "10px")
    .style("height", "10px")
    .style("margin-right", "5px")
    .style("background-color", (subgroup) => label_to_color[subgroup]);

  legends.append("span").text((state) => state);

  svg.selectAll("rect").remove();

  const tooltip = bar_chart
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px");
  // @ts-ignore
  const mouseover = function (e, d) {
    // @ts-ignore
    const subgroupName = d3.select(this.parentNode).datum().key;
    const subgroupValue = d.data[subgroupName];

    // const [xCoordinates, yCoordinates] = d3.pointer(e, this);

    tooltip
      .style("display", "block")
      .html(
        "<strong>Subgroup:</strong> " +
          subgroupName +
          "<br>" +
          "<strong>Value: </strong>" +
          subgroupValue.toLocaleString("us-en")
      )
      .style("opacity", 1);
  };
  // @ts-ignore
  const mousemove = function (e, d) {
    tooltip
      .style("transform", "translateY(-40%)")
      .style("left", e.x / 2 + "px")
      .style("top", e.y / 4 - 10 + "px");
  };
  // @ts-ignore
  const mouseleave = function (e, d) {
    tooltip.style("opacity", 0);
    tooltip.style("display", "none");
  };

  svg
    .append("g")
    .selectAll("g")
    .data(stackedData)
    .join(
      (enter) =>
        enter
          .append("g")
          .attr("fill", (d) => color(d.key)) //
          .selectAll("rect")
          .data((d) => d)
          .join("rect")
          .attr("x", (d) => x(d.data.state))
          .attr("y", (d) => y(d[1]))
          .attr("height", (d) => y(d[0]) - y(d[1]))
          .attr("width", x.bandwidth())
          .attr("stroke", "grey"),
      (update) =>
        update
          .transition()
          .duration(1000)
          .ease(d3.easeLinear)
          .attr("x", (d) => x(d.data.state))
          .attr("y", (d) => y(d[1]))
          .attr("height", (d) => y(d[0]) - y(d[1]))
          .attr("width", x.bandwidth())
    )
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
};
