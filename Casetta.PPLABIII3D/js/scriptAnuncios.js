import { generarAnuncioMascota } from "./anuncioMascota.js";

const $anuncios = document.getElementById("anuncios-dinamicos");
const $mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

$mascotas.forEach(item => {
    const articuloMascota = generarAnuncioMascota(item);
    $anuncios.appendChild(articuloMascota);
});