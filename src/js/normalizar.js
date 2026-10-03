const API_GEOREF = `https://apis.datos.gob.ar/georef/api/direcciones?`;

async function normalizarDomicilio(calle, numero, ciudad, provincia) {
  const direccion = `${calle || ""} ${numero || ""}`.trim();
  const params = new URLSearchParams();
  if (direccion) params.append("direccion", direccion);
  if (ciudad) params.append("localidad", ciudad);
  if (provincia) params.append("provincia", provincia);

  try {
    const respuesta = await fetch(`${API_GEOREF}${params.toString()}`);
    if (respuesta.ok) {
      const data = await respuesta.json();
      if (data.direcciones && data.direcciones.length > 0) {
        return data.direcciones[0].nomenclatura;
      }
    }
  } catch (error) {}

  const partes = [direccion, ciudad, provincia].filter(Boolean);
  return partes.join(", ");
}

async function prepararDatos(datos) {
  const domicilio = await normalizarDomicilio(
    datos.calle,
    datos.numero,
    datos.ciudad,
    datos.provincia,
  );

  return [
    datos.nombre,
    datos.apellido,
    datos.dni,
    datos.fechaNacimiento,
    domicilio,
    datos.email,
    datos.telefono,
    datos.experiencia,
    datos.capacitacion,
    datos.afiliacion,
    datos.afiliacion === "si" && datos.partido ? datos.partido.trim() : null,
    datos.interesCharla,
  ];
}

module.exports = {
  API_GEOREF,
  normalizarDomicilio,
  prepararDatos,
};
