
let inputNombre;
let spanNombreError;
let inputApellidos;
let spanApellidosError;
let boton;
let validaAsiento = false;
let asiento = -1;

let arrayReservas = [];

class asientoClass {
    reservado;
    constructor() {
        reservado = false;
    }
}


class reservasClass {
    constructor(_nombre, _apellidos, _butaca) {
        this.nombre = _nombre;
        this.apellidos = _apellidos;
        this.butaca = _butaca;
    }
    setButaca(numero) {
        this.butaca = numero;
    }
    getAll() {
        return "{ nombre:" + this.nombre + " apellidos:" + this.apellidos + " butaca:" + this.butaca + "}";
    }
}



const atiendeEventoButaca = (evento) => {
    const htmlElemento = evento.target;

    htmlElemento.classList.toggle("seleccionado");

    if (asiento === -1) {
        asiento = htmlElemento.getAttribute('num');
        validaAsiento = true;
    } else {
        asiento = -1;
        validaAsiento = false;
    }

    console.log("elemento lista:", htmlElemento.classList, "asiento" + asiento);
}


const validaNombre = () => {
    const textoNombre = inputNombre.value;
    const patron = /^.{3,15}$/;
    if (patron.test(textoNombre)) {
        spanNombreError.innerHTML = "OK";
        spanNombreError.classList.toogle("ok");
        return true;
    } else {
        spanNombreError.innerHTML = "Debe cumplir una longitud de entre 3 y 15 caracteres";
        spanNombreError.classList.toogle("fail");
        return false;
    }
}

const validaApellidos = () => {
    const textoApellido = inputApellidos.value;
    const patron = /^.{3,35}$/;

    if (patron.test(textoApellido)) {
        spanApellidosError.innerHTML = "OK";
        return true;
    } else {
        spanApellidosError.innerHTML = "Debe cumplir una longitud de entre 3 y 35 caracteres";
        return false;
    }
}


const salvaDatos = (evento) => {
    if (validaNombre() && validaApellidos() && validaAsiento) {
        alert("Su reserva se ha realizado correctamente");
        const reserva = new reservasClass(inputNombre.value, inputApellidos.value, asiento);
        arrayReservas.push(reserva);
        asiento.className += "reservado";
        console.log("reserva OK", reserva.getAll());
        console.log(" Reservas actuales:", arrayReservas);

    } else {
        alert("Su reserva no se ha podido realizar. Compruebe los datos.");
    }
}

window.onload = function () {
    boton = document.getElementById("boton");
    boton.addEventListener("click", salvaDatos);

    let collectionButacas = document.getElementsByClassName('butaca');
    for (let butaca of collectionButacas) {
        butaca.addEventListener("click", atiendeEventoButaca);
    };

    inputNombre = document.getElementById('nombre');
    inputNombre.addEventListener("blur", validaNombre);

    inputApellidos = document.getElementById('apellidos');
    inputApellidos.addEventListener("blur", validaApellidos);


    spanNombreError = document.getElementById("nombreError");
    spanApellidosError = document.getElementById("apellidosError");
};