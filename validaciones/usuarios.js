import { validar,validar_Cletras, validar_Cnumericos} from "../modulos/modulo.js";
const formulario = document.querySelector('form');
const nombre = document.querySelector('[name="nombre"]')
const apellido = document.querySelector('[name="apellido"]')
const telefono = document.querySelector('[name="telefono"]')
const documento = document.querySelector('[name="documento"]')
const usuario = document.querySelector('[name="usuario"]')
const contrasena = document.querySelector('[name="contrasena"]')
const ciudad = document.querySelector('[name="ciudad"]');
const genero = document.querySelectorAll('[name="genero"]');
const lenguajes = document.querySelectorAll('[name="lenguaje"]');
const btn = document.querySelector('#btn_guardar');


//Eventos
formulario.addEventListener('submit',validar)
nombre.addEventListener('keydown', validar_Cletras);
apellido.addEventListener('keydown', validar_Cletras);
telefono.addEventListener('keydown',validar_Cnumericos);
documento.addEventListener('keydown',validar_Cnumericos);
