const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db"); 
const path = require("path");
const fs = require("fs");

db.serialize(() => {
  db.run(`create table if not exists inscripciones(
    id integer primary key autoincrement,
    distrito text not null,
    nombre text not null,
    apellido text not null,
    dni text not null,
    fechaNacimiento text not null,
    domicilio text not null,
    email text not null,
    telefono text not null,
    experiencia text not null,
    capacitacion text not null,
    afiliacion text not null,
    partido text,
    interesCharla text not null
  )`, (err) => {
    if (err) {
      console.error("Error al crear la tabla:", err.message);
    } else {
      console.log('Tabla "inscripciones" creada o ya existente');
    }
  });
});

const app = express();
const puerto = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/css", express.static(path.join(__dirname, "src/css")));
app.use("/js", express.static(path.join(__dirname, "src/js")));
app.use("/vistas", express.static(path.join(__dirname, "src/vistas")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/vistas/inscripcion.html"));
});

app.post("/inscripcion", (req, res) => {
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
    interesCharla
  } = req.body;

  if (!distrito || !nombre || !apellido || !dni || !fechaNacimiento ||
      !domicilio || !email || !telefono || !experiencia || 
      !capacitacion || !afiliacion || !interesCharla) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

  const sql = `insert into inscripciones (
    distrito, nombre, apellido, dni, fechaNacimiento,
    domicilio, email, telefono, experiencia, capacitacion,
    afiliacion, partido, interesCharla)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
    partido || null,
    interesCharla
  ];

  db.run(sql, valores, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({error:"Error al guardar"});
    }
    res.json({
      mensaje:"Inscripción guardada correctamente",
      id: this.lastID
    });
  });

  db.all("select * from inscripciones", [], (err, filas) => {
    if (!err) {
        fs.writeFileSync("datos.json", JSON.stringify(filas, null, 2));
    }
});
});

app.get("/inscripciones", (req, res) => {
    db.all("select * from inscripciones order by id desc", [], (err, filas) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(filas);
    });
});

app.listen(puerto, () => {
    console.log(`Servidor en http://localhost:${puerto}`);
});