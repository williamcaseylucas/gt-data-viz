import "./style.css";
import csv_data from "./getData";
import * as d3 from "d3";

const regions = document.querySelector("#regions .menu");
console.log(regions);
const dropdowns = document.querySelectorAll(".dropdown");

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

csv_data.then((data) => {
  // console.log("data", data);

  // get unique states and populate
  const uniqueStates = [...new Set(data.map((d) => d.state))];

  uniqueStates.forEach((state) => {
    let li = document.createElement("li");
    li.textContent = state;
    regions.appendChild(li);
  });
});
