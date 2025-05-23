import { get } from "../api.js";
import { limpiar, validar, validarMin } from "../modulos/modulo.js";

import { crearTablaLenguajes } from "./subirDatos.js";

const lenguajes=await get("lenguajes");
crearTablaLenguajes(["ID","Lenguaje"],lenguajes.data)

const formulario=document.querySelector("form");
const nombre_lenguaje=document.querySelector('[name="lenguaje"]');

formulario.addEventListener('submit',(event)=>{validar(event,"lenguajes")});
nombre_lenguaje.addEventListener('blur',limpiar)
nombre_lenguaje.addEventListener('blur',validarMin)