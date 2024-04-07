import "leaflet/dist/leaflet.css";
import L from 'leaflet'

// Leaflet
export const createMap = () => {
    const map = L.map("map").setView([40, -100], 4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  
    return map
  }
  
// add popup content on circle
export const addContentToCircle = (circle, content) => {
circle.bindPopup(`${content}`);
circle.on('mouseover', () => {
    // @ts-ignore
    circle.openPopup();
});
circle.on('mouseout', () => {
    // @ts-ignore
    circle.closePopup();
});
}