const express = require("express");
const path = require("path");
const inscripcion = require("./rutas/inscripcion");
const charlas = require("./rutas/charlas");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/db", express.static(path.join(__dirname, "db")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/vista", express.static(path.join(__dirname, "vista")));

app.use("/", inscripcion);
app.use("/charlas", charlas);

app.listen(port, () => {
  console.log(`Servidor en: ${port}`);
});
