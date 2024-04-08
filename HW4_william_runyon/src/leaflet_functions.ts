import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { CSVTypes } from "./interfaces";
import { STATES_LAT_LON } from "./constants";

// Wholistic zoom
const defaults = {
  lat: 40,
  lon: -100,
  zoom: 4,
};

interface State_Vals {
  state: {
    positive_cases: number;
  };
}

// For other events
const zoom = 5;

// Leaflet
export const createMap = () => {
  const map = L.map("map").setView([defaults.lat, defaults.lon], defaults.zoom);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  return map;
};

// add popup content on circle
export const addContentToCircle = (circle, content, map) => {
  circle.bindPopup(`${content}`);
  circle.on("mouseover", (ev) => {
    // @ts-ignore

    var coordinates = map.mouseEventToLatLng(ev.originalEvent);
    // map.flyTo([coordinates.lat, coordinates.lng], zoom);
    circle.openPopup();
  });
  circle.on("mouseout", (ev) => {
    // @ts-ignore
    circle.closePopup();
  });
};

export const refocus_center = (map, state, zoom = 5) => {
  if (state == "All Regions") {
    map.flyTo([defaults.lat, defaults.lon], defaults.zoom);
  } else {
    var coordinates = STATES_LAT_LON[state];
    map.flyTo([coordinates.lat, coordinates.lon], zoom);
  }
};

export const recreate_circles = (
  filteredData: CSVTypes[],
  array_of_circles,
  map
) => {
  array_of_circles.forEach((circle) => {
    console.log("circle", circle);
    map.removeLayer(circle);
  });
  array_of_circles = [];

  const states_vals: State_Vals | {} = {};
  filteredData.forEach((item) => {
    console.log(STATES_LAT_LON[item.state], item.state);
    if (!states_vals[item.state])
      states_vals[item.state] = { positive_cases: 0 };

    states_vals[item.state]["positive_cases"] += item.positive;
  });

  // Create circles
  Object.entries(states_vals).forEach((entry) => {
    console.log("entry", entry);
    const [state, vals] = entry;
    const { positive_cases } = vals;

    const { lat, lon } = STATES_LAT_LON[state];
    const circle = L.circle([lat, lon], {
      color: "red",
      fillColor: "#f03",
      opacity: 0.5,
      radius: positive_cases * 0.05,
    }).addTo(map);

    array_of_circles.push(circle);
    addContentToCircle(circle, positive_cases, map);
  });

  return array_of_circles;
};
