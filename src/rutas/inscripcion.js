const express = require("express");
const db = require("../db/conexion");
const path = require("path");
const { prepararDatos } = require("../js/normalizar");

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

router.post("/inscripciones", async (request, response) => {
  const {
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    email,
    telefono,
    calle,
    numero,
    ciudad,
    provincia,
    experiencia,
    capacitacion,
    afiliacion,
    partido,
    interesCharla,
  } = request.body;

  if (
    !nombre ||
    !apellido ||
    !dni ||
    !fechaNacimiento ||
    !email ||
    !telefono ||
    !calle ||
    !numero ||
    !ciudad ||
    !provincia ||
    !experiencia ||
    !capacitacion ||
    !afiliacion ||
    !interesCharla ||
    (afiliacion === "si" && (!partido || partido.trim() === ""))
  ) {
    return response.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const query = `insert into inscripciones (
    nombre, apellido, dni, fecha_nacimiento, domicilio, email, telefono, experiencia, capacitacion, afiliacion, partido, interes_charla
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const valores = await prepararDatos(request.body);
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
