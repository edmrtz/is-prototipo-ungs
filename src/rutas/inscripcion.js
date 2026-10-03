const express = require("express");
const db = require("../db/conexion");
const path = require("path");

const router = express.Router();

router.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../vista/inscripcion.html"));
});
