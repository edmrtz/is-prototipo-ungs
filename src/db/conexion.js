const DATABASE = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../../database.sqlite");
const db = new DATABASE(dbPath);

db.pragma("foreign_keys = ON");

db.exec(`
  create table if not exists inscripciones(
    id integer primary key autoincrement,
    distrito text not null,
    nombre text not null,
    apellido text not null,
    dni text not null,
    fecha_nacimiento text not null,
    domicilio text not null,
    email text not null,
    telefono text not null,
    experiencia text not null,
    capacitacion text not nnull,
    afiliacion text not null,
    partido text,
    interes_charla text not null
  );
  `);

module.exports = db;
