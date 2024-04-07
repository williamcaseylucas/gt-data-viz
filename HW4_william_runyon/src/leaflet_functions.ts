import "leaflet/dist/leaflet.css";
import L from 'leaflet'

// Wholistic zoom
const defaults = {
    lat: 40,
    lon: -100,
    zoom: 4
}

// For other events
const zoom = 5

// Leaflet
export const createMap = () => {
    const map = L.map("map").setView([defaults.lat, defaults.lon], defaults.zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  
    return map
  }
  
// add popup content on circle
export const addContentToCircle = (circle, content, map) => {
circle.bindPopup(`${content}`);
circle.on('mouseover', (ev) => {
    // @ts-ignore

    var coordinates = map.mouseEventToLatLng(ev.originalEvent);
    map.flyTo([coordinates.lat, coordinates.lng], zoom);
    circle.openPopup();
});
circle.on('mouseout', (ev) => {
    // @ts-ignore
    circle.closePopup();
});
}