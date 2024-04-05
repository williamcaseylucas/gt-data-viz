import "./style.css";
import data from "./getData";

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

data.then((rows) => {
  rows.forEach((val) => {
    console.log("val", val.date);
  });
});
