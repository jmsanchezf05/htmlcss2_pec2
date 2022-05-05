
let inputNombre;
let spanNombreError;
let inputApellidos;
let spanApellidosError;
let inputFecha;
let spanFechaError;
let inputCheck;
let boton;
let asiento = -1;
let asientos = [];

let arrayReservas = [];

class asientoClass {
    reservado;
    constructor() {
        reservado = false;
    }
}


class reservasClass {
    constructor(_nombre, _apellidos, _butacas, _fecha) {
        this.nombre = _nombre;
        this.apellidos = _apellidos;
        this.butacas = _butacas;
        this.fecha = _fecha;
    }
    /*   setButaca(numero) {
           this.butaca = numero;
       }*/
    getNombre() {
        return this.nombre;
    }
    getApellidos() {
        return this.apellidos;
    }
    getAsientos() {
        return this.butacas;
    }
    getFecha() {
        return this.fecha;
    }
    getAll() {
        return "{ nombre:" + this.nombre + " apellidos:" + this.apellidos + " butaca:" + this.butacas + "}";
    }
}



const atiendeEventoButaca = (evento) => {
    const htmlElemento = evento.target;

    htmlElemento.classList.toggle("seleccionado");

    const nuevoAsiento = htmlElemento.getAttribute('num');

    if (nuevoAsiento != asientos[asientos.length - 1]) {
        asiento = nuevoAsiento;
        asientos.push(nuevoAsiento);
    } else {
        asiento = -1;
        asientos.pop(); //Remove
    }

    // console.log("elemento lista:", htmlElemento.classList, "asiento", asiento, "asientos:" + asientos);
}

const validaAsiento = () => {
    const result = false;
    if (asientos.length > 0) {
        result = true;
    }
    return result;
}

const validaNombre = () => {
    const textoNombre = inputNombre.value;
    const patron = /^.{3,15}$/;
    if (patron.test(textoNombre)) {
        spanNombreError.innerHTML = "OK";
        spanNombreError.classList.add("ok");
        spanNombreError.classList.remove("fail");
        //spanNombreError.classList.toogle("ok");
        return true;
    } else {
        spanNombreError.innerHTML = "Debe cumplir una longitud de entre 3 y 15 caracteres";
        spanNombreError.classList.add("fail");
        spanNombreError.classList.remove("ok");
        return false;
    }
}

const validaApellidos = () => {
    const textoApellido = inputApellidos.value;
    const patron = /^.{3,35}$/;

    if (patron.test(textoApellido)) {
        spanApellidosError.innerHTML = "OK";
        spanApellidosError.classList.add("ok");
        spanApellidosError.classList.remove("fail");
        return true;
    } else {
        spanApellidosError.classList.add("fail");
        spanApellidosError.classList.remove("ok");
        spanApellidosError.innerHTML = "Debe cumplir una longitud de entre 3 y 35 caracteres";
        return false;
    }
}

const validaFecha = () => {
    const result = false;
    const textFecha = inputFecha.value;


    if (textFecha !== "") {
        spanFechaError.classList.add("ok");
        spanFechaError.classList.remove("fail");
        spanFechaError.innerHTML = "OK"
        result = true;
    } else {
        spanFechaError.classList.add("fail");
        spanFechaError.classList.remove("ok");
        spanFechaError.innerHTML = "Debe elegir una fecha";

    }
    console.log("fecha", result);
    return result;
}

const validaCheck = () => {
    const result = false;

    if (inputCheck.checked == true) {
        result = true;
    }
    return result;
}

const salvaDatos = (evento) => {
    if (validaNombre() && validaApellidos() && validaAsiento() && validaFecha() && validaCheck()) {
        alert("Su reserva se ha realizado correctamente");

        const reserva = new reservasClass(inputNombre.value, inputApellidos.value, asientos, inputFecha.value);
        arrayReservas.push(reserva);
        asiento.className += "reservado";
        mostrarDatosEnDocument(reserva);

    } else {
        alert("Su reserva no se ha podido realizar. Compruebe los datos.");
    }
}


const mostrarDatosEnDocument = (reserv) => {
    const puntoInsercion = document.getElementById("datos");
    puntoInsercion.innerHTML = "";

    let div = document.createElement("div");
    div.classList.add("datosDeReserva");

    let tag0 = document.createElement("p");
    let text0 = document.createTextNode("DATOS DE LA RESERVA");
    tag0.classList.add("tituloReserva");
    tag0.appendChild(text0);
    div.appendChild(tag0);

    let tag = document.createElement("p");
    let text = document.createTextNode("Nombre: " + reserv.getNombre());
    tag.appendChild(text);
    div.appendChild(tag);

    let tag1 = document.createElement("p");
    let text1 = document.createTextNode("Apellidos: " + reserv.getApellidos());
    tag1.appendChild(text1);
    div.appendChild(tag1);

    const butacas = reserv.getAsientos();
    if (butacas != null) {
        let tag2 = document.createElement("p");
        let totalButacas = "";
        for (let i = 0; i < butacas.length; i++) {
            totalButacas += butacas[i] + " , ";
        }
        let text2 = document.createTextNode("Asiento: " + totalButacas);
        tag2.appendChild(text2);
        div.appendChild(tag2);

    }

    let tag3 = document.createElement("p");
    let text3 = document.createTextNode("Fecha: " + reserv.getFecha());
    tag3.appendChild(text3);
    div.appendChild(tag3);

    puntoInsercion.appendChild(div);
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

    inputFecha = document.getElementById("fecha");
    inputFecha.addEventListener("blur", validaFecha);
    spanFechaError = document.getElementById("fechaError");

    inputCheck = document.getElementById("check");
    //inputCheck.addEventListener("change", () => console.log("check:" + inputCheck.checked));
}
