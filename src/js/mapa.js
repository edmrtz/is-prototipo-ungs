const OSM = `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;

const lat = -34.5208428;
const lon = -58.7002801;
const map = L.map("map").setView([lat, lon], 15);

L.tileLayer(`${OSM}`, {
  maxZoom: 19,
}).addTo(map);
