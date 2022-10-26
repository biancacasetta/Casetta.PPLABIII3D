import Anuncio from "./anuncio.js";

export class Anuncio_Mascota extends Anuncio
{
    constructor(id, titulo, descripcion, animal, precio, raza, fechaNacimiento, vacunas)
    {
        super(id, titulo, descripcion, animal, precio);
        this.raza = raza;
        this.fechaNacimiento = fechaNacimiento;
        this.vacunas = vacunas;
    }
}

export function generarAnuncioMascota(mascota)
{
    const anuncio = document.createElement("article");
    const divCaracteristicas = document.createElement("div"); 
    divCaracteristicas.setAttribute("class", "caracteristicas");

    for (const key in mascota)
    {  
        switch(key)
        {
            case "titulo":
                const h3 = document.createElement("h3");
                h3.textContent = mascota[key];
                anuncio.appendChild(h3);
                break;
            case "descripcion":
                const pDescripcion = document.createElement("p");
                pDescripcion.textContent = mascota[key];
                anuncio.appendChild(pDescripcion);
                break;
            case "precio":
                const pPrecio = document.createElement("p");
                pPrecio.textContent = "$" + mascota[key];
                anuncio.appendChild(pPrecio);
                break;
            case "raza":
                const iconoRaza = document.createElement("img");
                iconoRaza.setAttribute("src", "./imagenes/raza.png");
                const strRaza = document.createElement("span");
                strRaza.textContent = mascota[key];
                const divRaza = document.createElement("div");
                divRaza.appendChild(iconoRaza);
                divRaza.appendChild(strRaza);
                divCaracteristicas.appendChild(divRaza);
                iconoRaza.classList.add("icon");
                break;
            case "fechaNacimiento":
                const iconoFecha = document.createElement("img");
                iconoFecha.setAttribute("src", "./imagenes/fechaNac.png");
                const strFecha = document.createElement("span");
                strFecha.textContent = mascota[key];
                const divFecha = document.createElement("div");
                divFecha.appendChild(iconoFecha);
                divFecha.appendChild(strFecha);
                divCaracteristicas.appendChild(divFecha);
                iconoFecha.classList.add("icon");
                break;
            case "vacunas":
                const iconoVacuna = document.createElement("img");
                iconoVacuna.setAttribute("src", "./imagenes/vacuna.png");
                const strVacuna = document.createElement("span");
                strVacuna.textContent = mascota[key];
                const divVacuna = document.createElement("div");
                divVacuna.appendChild(iconoVacuna);
                divVacuna.appendChild(strVacuna);
                iconoVacuna.classList.add("icon");
                divCaracteristicas.appendChild(divVacuna);
                break;
        }
    }

    anuncio.appendChild(divCaracteristicas);
    const boton = document.createElement("input");
    boton.setAttribute("value", "Ver Mascota");
    boton.setAttribute("type", "button");
    boton.setAttribute("onclick","window.location.href='./index.html'");
    anuncio.appendChild(boton);
    anuncio.classList.add("ficha");

    return anuncio;
}