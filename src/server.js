const express = require("express");
const path = require("path");
const charlas = require("./rutas/charlas.js");

const app = express();
const port = 3000;

app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/vista", express.static(path.join(__dirname, "vista")));

app.use("/charlas", charlas);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
