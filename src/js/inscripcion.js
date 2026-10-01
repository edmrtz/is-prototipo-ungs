
const formulario = document.getElementById("formInscripcion");


const opcionesAfiliacion = document.querySelectorAll(
    'input[name="afiliacion"]'
);


const campoPartido = document.getElementById("campoPartido");
const partido = document.getElementById("partido");


opcionesAfiliacion.forEach(function (opcion) {

    opcion.addEventListener("change", function () {

        if (this.value === "si") {
            campoPartido.classList.remove("hidden");
            partido.required = true;
        } else {
            campoPartido.classList.add("hidden");
            partido.required = false;
            partido.value = "";
        }

    });

});


// Cuando se envía el formulario
formulario.addEventListener("submit", function (evento) {

    
    evento.preventDefault();

    // obtenemos los datos personales del usuario
    const distrito = document.getElementById("distrito").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const fechaNacimiento =
        document.getElementById("fechaNacimiento").value;

    const domicilio =
        document.getElementById("domicilio").value.trim();

    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();


   // obtenemos lo que selecciono el ussuario
    const experiencia =
        document.querySelector('input[name="experiencia"]:checked');

    const capacitacion =
        document.querySelector('input[name="capacitacion"]:checked');

    const afiliacion =
        document.querySelector('input[name="afiliacion"]:checked');

    const interesCharla =
        document.querySelector('input[name="interesCharla"]:checked');


    // Validamos que no esten vacios
    if (
        distrito === "" ||
        nombre === "" ||
        apellido === "" ||
        dni === "" ||
        fechaNacimiento === "" ||
        domicilio === "" ||
        email === "" ||
        telefono === "" ||
        !experiencia ||
        !capacitacion ||
        !afiliacion ||
        !interesCharla
    ) {
        alert("Por favor, completá todos los campos obligatorios.");
        return;
    }


    
    if (
        afiliacion.value === "si" &&
        partido.value.trim() === ""
    ) {
        alert("Por favor, indicá a qué partido pertenece.");
        return;
    }


    // Si todo está correcto
    alert("Los datos ingresados son correctos.");
});