// Will hold hospitalization records showing maybe died versus survived (top 5 states) or just single state

// hospitalized, death, positive

import { HEIGHT } from "./constants";
import { BAR_DATA, CSVTypes } from "./interfaces";
import * as d3 from "d3";

let svg;

const margin = {
  top: 20,
  right: 50,
  bottom: 40,
  left: 75,
};

const colors = ["#e41a1c", "#377eb8", "#4daf4a"];

const label_to_color = {
  positiveSum: colors[0],
  hospitalizeSum: colors[1],
  deathSum: colors[2],
};

export const create_bar_chart = (filtered_data: CSVTypes[]) => {
  const bar_chart = d3.selectAll("#bar");

  const bar_data: BAR_DATA[] = []; //{state: 'CA', positiveSum: 53417, hospitalizeSum: 0, deathSum: 1081}
  let groups = [];
  let subgroups;

  // Get data setup
  let grouped_data = d3.rollup(
    filtered_data,
    (v) => ({
      positiveSum: d3.sum(v, (d) => d.positiveIncrease),
      hospitalizeSum: d3.sum(v, (d) => d.hospitalizedIncrease),
      deathSum: d3.sum(v, (d) => d.deathIncrease),
    }),
    (d) => d.state
  );

  if (grouped_data.size == 1) {
    grouped_data.forEach((row, state) => {
      d3.select("#bar-heading").text(
        `Positive vs Hospitalized vs Death for ${state}`
      );
      subgroups = Object.keys(row);
      bar_data.push({ state, ...row });
      groups.push(state);
    });
  } else {
    let sorted_counts = d3.sort(grouped_data, (row) => row[1].positiveSum);

    d3.select("#bar-heading").text(
      `Top 10 States Positive vs Hospitalized vs Death`
    );

    sorted_counts
      .slice(1)
      .slice(-10)
      .forEach((val, idx) => {
        const [key, data] = val;
        subgroups = Object.keys(data);
        bar_data.push({ state: key, ...data });
        groups.push(key);
      });
  }

  // console.log(bar_data, "groups", groups, "subgroups", subgroups);

  console.log("bar data", bar_data);

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
  const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);

  svg.select("#bar-x-axis").remove();
  svg.select("#bar-y-axis").remove();

  svg
    .append("g")
    .attr("id", "bar-x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  let y_max = d3.max(
    bar_data,
    (d) => d.positiveSum + d.deathSum + d.hospitalizeSum
  );
  const y = d3.scaleLinear().domain([0, y_max]).range([height, 0]);
  svg.append("g").attr("id", "bar-y-axis").call(d3.axisLeft(y));

  // color palette = one color per subgroup
  const color = d3.scaleOrdinal().domain(subgroups).range(colors);

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

  console.log("stackedData", stackedData);

  const tooltip = bar_chart
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px");

  // Three function that change the tooltip when user hover / move / leave a cell
  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function (e, d) {
    const subgroupName = d3.select(this.parentNode).datum().key;
    const subgroupValue = d.data[subgroupName];

    const [xCoordinates, yCoordinates] = d3.pointer(e, this);

    console.log(xCoordinates, yCoordinates);

    console.log("mouseover", subgroupName, subgroupValue);
    tooltip
      .style("display", "block")
      .html(
        "<strong>Subgroup:</strong> " +
          subgroupName +
          "<br>" +
          "<strong>Value: </strong>" +
          subgroupValue
      )
      .style("opacity", 1);
  };
  const mousemove = function (e, d) {
    tooltip
      .style("transform", "translateY(-60%)")
      .style("left", e.x / 2 + "px")
      .style("top", e.y / 2 - 30 + "px");
  };
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
