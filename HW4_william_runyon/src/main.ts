import "./style.css";
import csv_data from "./getData";
import { MONTHS, YEARS } from "./constants";
import * as d3 from "d3";

// drop downs
const months = document.querySelector("#months .menu");
const years = document.querySelector("#years .menu");
const regions = document.querySelector("#regions .menu");
const dropdowns = document.querySelectorAll(".dropdown");

// stats

let selectedMonth = "JAN";
let selectedYear = 2020;
let selectedRegion = "All Regions";

const stats = {
  totalPostive: 0,
  totalRecovered: 0,
  totalDied: 0,
};

const getFilteredData = (data) => {
  let index_of_month = MONTHS.indexOf(selectedMonth);

  let filteredData = data.filter(
    (d) =>
      d.date.getMonth() == index_of_month &&
      d.date.getFullYear() == selectedYear
  );

  // update direct stats
  filteredData.forEach((d) => {
    stats.totalRecovered += d.recovered ? d.recovered : 0;
    stats.totalDied += d.death ? d.death : 0;
    stats.totalPostive += d.positive ? d.positive : 0;
  });

  // update these
  d3.select("#positive").text(
    `Positive this month: ${stats.totalPostive.toLocaleString("en-US")}`
  );
  d3.select("#death").text(
    `Died this month: ${stats.totalDied.toLocaleString("en-US")}`
  );
  d3.select("#recovered").text(
    `Recovered this month: ${stats.totalRecovered.toLocaleString("en-US")}`
  );
  console.log("filteredData", filteredData);
  return filteredData;
};

csv_data.then((data) => {
  const filteredData = getFilteredData(data);

  MONTHS.forEach((month) => {
    let li = document.createElement("li");
    li.textContent = month;

    if (month == "JAN") {
      li.classList.add("active");
    }

    // add event listener to each li
    li.addEventListener("click", () => {
      selectedMonth = li.textContent;
      getFilteredData(data);
    });
    months.appendChild(li);
  });

  YEARS.forEach((year) => {
    let li = document.createElement("li");
    li.textContent = year;

    if (year == 2020) {
      li.classList.add("active");
    }

    // add event listener to each li
    li.addEventListener("click", () => {
      selectedYear = parseInt(li.textContent);
      getFilteredData(data);
    });
    years.appendChild(li);
  });

  // populate tabs and add event listeners
  const uniqueStates = [...new Set(data.map((d) => d.state))];
  uniqueStates.forEach((state) => {
    let li = document.createElement("li");
    li.textContent = state;

    // add event listener to each li
    li.addEventListener("click", () => {
      selectedRegion = li.textContent;
      getFilteredData(data);
    });
    regions.appendChild(li);
  });

  // Updates UI
  // Loop through all dropdown elements
  dropdowns.forEach((dropdown) => {
    // Grab inner elements
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    // used to identify which drop down works first
    select?.addEventListener("click", () => {
      select.classList.toggle("select-clicked");
      caret?.classList.toggle("caret-rotate");
      menu?.classList.toggle("menu-open");
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        // @ts-ignore
        selected.innerHTML = option.innerHTML;

        select?.classList.remove("select-clicked");
        caret?.classList.remove("caret-rotate");
        menu?.classList.remove("menu-open");

        // remove active class from all other options
        options.forEach((option) => {
          option.classList.remove("active");
        });
        // add it back to the currently selected version
        option.classList.add("active");
      });
    });
  });
});
