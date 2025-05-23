import { get } from "../api.js";
import { limpiar, validar, validarMin } from "../modulos/modulo.js";
import { crearTablaGeneros } from "./subirDatos.js";

const generos = await get('generos')
console.log(generos);

crearTablaGeneros(["ID","Genero"],generos.data)

const formulario=document.querySelector("form");
const nombre_genero=document.querySelector('[name="genero"]');

formulario.addEventListener('submit',(event)=>{validar(event,'generos')});
nombre_genero.addEventListener('blur',limpiar)
nombre_genero.addEventListener('blur',validarMin)