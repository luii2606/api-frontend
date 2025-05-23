import { get } from "../api.js";
import { limpiar, validar, validarMin } from "../modulos/modulo.js";
import { crearTablaCiudades } from "./subirDatos.js";

const ciudades = await get("ciudades");
console.log(ciudades);

crearTablaCiudades(["ID", "Ciudad"], ciudades.data);

const formulario = document.querySelector("form");
const nombre_ciudad = document.querySelector('[name="ciudad"]');

formulario.addEventListener('submit', (event) => { validar(event, "ciudades") });
nombre_ciudad.addEventListener('blur', limpiar)
nombre_ciudad.addEventListener('blur', validarMin)