const express = require("express");
const db = require("../db/conexion");
const path = require("path");

const router = express.Router();

router.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../vista/inscripcion.html"));
});

router.get("/inscripciones", (request, response) => {
  try {
    const filas = db
      .prepare("select * from inscripciones order by id desc")
      .all();
    response.json(filas);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post("/inscripciones", (request, response) => {
  const {
    distrito,
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    domicilio,
    email,
    telefono,
    experiencia,
    capacitacion,
    afiliacion,
    partido,
    interesCharla,
  } = request.body;

  if (
    !distrito ||
    !nombre ||
    !apellido ||
    !dni ||
    !fechaNacimiento ||
    !domicilio ||
    !email ||
    !telefono ||
    !experiencia ||
    !capacitacion ||
    !afiliacion ||
    !interesCharla ||
    (afiliacion === "si" && (!partido || partido.trim() === ""))
  ) {
    return response.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const query = `insert into inscripciones (
    distrito, nombre, apellido, dni, fecha_nacimiento, domicilio, email, telefono, experiencia, capacitacion, afiliacion, partido, interes_charla
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const valores = [
    distrito,
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    domicilio,
    email,
    telefono,
    experiencia,
    capacitacion,
    afiliacion,
    afiliacion === "si" ? partido.trim() : null,
    interesCharla,
  ];

  try {
    const resultado = db.prepare(query).run(valores);
    response.json({
      mensaje: "Inscripcion guardada correctamente",
      id: Number(resultado.lastInsertRowid),
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = router;
