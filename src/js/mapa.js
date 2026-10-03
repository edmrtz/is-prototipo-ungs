const OSM = `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;

const coordenadas = [
  {
    nombre: "UNGS",
    lat: -34.521855,
    lon: -58.700493,
  },
  {
    nombre: "Centro Cultural UNGS",
    lat: -34.536737,
    lon: -58.713435,
  },
  {
    nombre: "Plaza Las Carretas",
    lat: -34.548529,
    lon: -58.704704,
  },
];

const map = L.map("map").setView([coordenadas[0].lat, coordenadas[0].lon], 16);

L.tileLayer(`${OSM}`, {
  maxZoom: 19,
}).addTo(map);

coordenadas.forEach((lugar) => {
  L.marker([lugar.lat, lugar.lon])
    .addTo(map)
    .bindPopup(`<b>${lugar.nombre}</b>`);
});
