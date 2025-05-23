import { validarMax, limpiar, limpiarChecboxs, limpiarRadios, validar, validar_Cletras, validar_Cnumericos, validarMin, validarContrasenaMensaje } from "../modulos/modulo.js";

import { subirCiudades, subirGeneros, subirLenguajes, crearTablaUsuarios , crearTablaLenguajeUsuario} from "./subirDatos.js";

import { get } from "../api.js";

const usuarios=await get("usuarios");

await subirLenguajes();
await subirGeneros();
crearTablaUsuarios(usuarios.data);

crearTablaLenguajeUsuario(["ID","Usuario","Lenguaje"])

const formulario=document.querySelector("form");
const documento_usuario=document.querySelector('[name="documento"]');
const nombre_usuario=document.querySelector('[name="nombre"]');
const apellido_usuario=document.querySelector('[name="apellido"]');
const telefono_usuario=document.querySelector('#telefono');
const constrasenia_usuario=document.querySelector('[name="contrasena"]')
const ciudad_usuario=document.querySelector('[name="ciudad"]')
const radios_genero=document.querySelectorAll('[name="genero"]')
const cheboxs_lenguajes=document.querySelectorAll('[name="lenguaje"]')





ciudad_usuario.addEventListener('click',subirCiudades());
formulario.addEventListener('submit',(event)=>{validar(event,"usuarios")})
documento_usuario.addEventListener('keydown',validar_Cnumericos);
nombre_usuario.addEventListener('keydown',validar_Cletras);
apellido_usuario.addEventListener('keydown',validar_Cletras);
telefono_usuario.addEventListener('keydown',validar_Cnumericos);
documento_usuario.addEventListener('blur',limpiar)
nombre_usuario.addEventListener('blur',limpiar)
apellido_usuario.addEventListener('blur',limpiar)
telefono_usuario.addEventListener('blur',limpiar)
constrasenia_usuario.addEventListener('blur',limpiar)
ciudad_usuario.addEventListener('blur',limpiar)
radios_genero.forEach(radio => {
    radio.addEventListener('change',limpiarRadios)
});
cheboxs_lenguajes.forEach(chec=>{
    chec.addEventListener('change',limpiarChecboxs)
})
telefono_usuario.addEventListener('keydown',validarMax)
telefono_usuario.addEventListener('blur',validarMin)
documento_usuario.addEventListener('blur',validarMin)
nombre_usuario.addEventListener('blur',validarMin);
apellido_usuario.addEventListener('blur',validarMin)
constrasenia_usuario.addEventListener('blur',validarContrasenaMensaje)
