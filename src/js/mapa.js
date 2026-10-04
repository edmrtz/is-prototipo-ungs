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

const marcadores = {};

coordenadas.forEach((lugar) => {
  const marker =
    L.marker([lugar.lat, lugar.lon])
    .addTo(map)
    .bindPopup(`<b>${lugar.nombre}</b>`);

    marcadores[lugar.nombre] = {marker, lat: lugar.lat, lon: lugar.lon};
});

document.addEventListener("DOMContentLoaded", () => {
  function configurarBoton(idBoton, nombreLugar) {
    const boton = document.getElementById(idBoton);
  

  if(boton) {
    boton.addEventListener("click", () => {
     const datosLugar = marcadores[nombreLugar];
     
     if (datosLugar) {
      map.flyTo([datosLugar.lat, datosLugar.lon], 16);
      datosUNGS.maker.openPopup();
     }
    });
  }
}
    
configurarBoton("btnUNGS", "UNGS");
configurarBoton("btnCCUNGS", "Centro Cultural UNGS");
configurarBoton("btnPlazaCarretas", "Plaza Las Carretas");

});