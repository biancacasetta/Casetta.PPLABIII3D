import { generarTabla, iniciarSpinner } from "./tabla.js";
import { Anuncio_Mascota } from "./anuncioMascota.js";
import { validarCampoVacio, validarSubmitVacio, validarMaxCaracteres, validarPrecio } from "./validaciones.js";

const $formMascota = document.forms[0];
const $tablaDinamica = document.getElementById("tabla-dinamica");
const $mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];
const $controles = $formMascota.elements;
actualizarTabla();
mostrarBotones();

document.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    let id = parseInt(e.target.parentElement.dataset.id);
    cargarFormulario($mascotas.find((item) => item.id === id));
    mostrarBotones();
  } else if (e.target.matches("#btnEliminar")) {
    manejadorBaja(parseInt($formMascota.txtId.value));
    $formMascota.reset();
    mostrarBotones();
  } else if (e.target.matches("#btnCancelar")) {
    $formMascota.reset();
    mostrarBotones();
  }
});

$formMascota.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validarSubmitVacio($controles))
  {
    const {
      txtId,
      txtTitulo,
      txtDescripcion,
      rdoAnimal,
      nbrPrecio,
      txtRaza,
      fechaNac,
      slcVacuna,
    } = $formMascota;

    const mascota = new Anuncio_Mascota(
      parseInt(txtId.value),
      txtTitulo.value,
      txtDescripcion.value,
      rdoAnimal.value,
      parseFloat(nbrPrecio.value),
      txtRaza.value,
      fechaNac.value,
      slcVacuna.value
    );

    if (txtId.value === "")
    {
        mascota.id = Date.now();
        manejadorAlta(mascota);
    }
    else
    {
      manejadorModificacion(mascota);
    }

    $formMascota.reset();
    mostrarBotones();
  }
});

function manejadorAlta(nuevaMascota) {
  $mascotas.push(nuevaMascota);
  actualizarAlmacenamiento($mascotas);
}

function manejadorModificacion(mascotaModificada) {
  let indice = $mascotas.findIndex((mascota) => {
    return mascota.id === mascotaModificada.id;
  });
  $mascotas[indice] = mascotaModificada;
  actualizarAlmacenamiento($mascotas);
}

function manejadorBaja(id) {
  let indice = $mascotas.findIndex((mascota) => {
    return mascota.id === id;
  });
  $mascotas.splice(indice, 1);
  actualizarAlmacenamiento($mascotas);
}

function actualizarTabla() {
  while ($tablaDinamica.hasChildNodes()) {
    $tablaDinamica.removeChild($tablaDinamica.firstChild);
  }

  const $datos = JSON.parse(localStorage.getItem("mascotas"));
  if ($datos) {
    $datos.sort(ordenarPorTitulo);
    iniciarSpinner();
    const $tabla = generarTabla($datos);
    $tablaDinamica.insertAdjacentElement("afterbegin", $tabla);
  }
}

function ordenarPorTitulo(a, b) {
  if (a.titulo < b.titulo) {
    return -1;
  } else if (a.titulo > b.titulo) {
    return 1;
  } else {
    return 0;
  }
}

function actualizarAlmacenamiento(mascotas) {
  localStorage.setItem("mascotas", JSON.stringify(mascotas));
  actualizarTabla();
}

function cargarFormulario(mascota) {
  const {
    txtId,
    txtTitulo,
    txtDescripcion,
    rdoAnimal,
    nbrPrecio,
    txtRaza,
    fechaNac,
    slcVacuna,
  } = $formMascota;

  txtId.value = mascota.id;
  txtTitulo.value = mascota.titulo;
  txtDescripcion.value = mascota.descripcion;
  rdoAnimal.value = mascota.animal;
  nbrPrecio.value = mascota.precio;
  txtRaza.value = mascota.raza;
  fechaNac.value = mascota.fechaNacimiento;
  slcVacuna.value = mascota.vacunas;
}

function mostrarBotones() {
  const { txtId } = $formMascota;
  const $btnAgregarModificar = document.getElementById("btnAltaModificar");
  const $btnEliminar = document.getElementById("btnEliminar");
  const $btnCancelar = document.getElementById("btnCancelar");

  if (txtId.value == "") {
    $btnAgregarModificar.setAttribute("value", "Agregar");
    $btnEliminar.classList.add("hidden");
    $btnCancelar.classList.add("hidden");
  } else {
    $btnAgregarModificar.setAttribute("value", "Modificar");
    $btnEliminar.classList.remove("hidden");
    $btnCancelar.classList.remove("hidden");
  }
}

for (let i = 0; i < $controles.length; i++) {
  const control = $controles.item(i);

  if(control.matches("input"))
  {
    control.addEventListener("blur", validarCampoVacio);

    if(control.classList.contains("titulo") || control.classList.contains("descripcion"))
    {
      control.addEventListener("blur", validarMaxCaracteres);
    }

    if(control.matches("[type=number]"))
    {
      control.addEventListener("blur", validarPrecio);
    }
  }
  
}
