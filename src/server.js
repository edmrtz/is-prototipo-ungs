const express = require('express');
const path = require("path");

const app = express();
const port = 3000;

app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/vista", express.static(path.join(__dirname, "vista")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "vista/charlas.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});