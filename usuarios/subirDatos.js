import { get } from "../api.js";

export const subirCiudades = async () => {

  const ciudades = await get("ciudades");

  const select = document.querySelector('[name="ciudad"]');

  ciudades.data.forEach(ciudad => {
    let opcion = document.createElement("option");
    opcion.textContent = ciudad.ciudad_nombre;
    opcion.setAttribute('value', ciudad.ciudad_id);
    select.append(opcion);
  });
}

export const subirGeneros = async () => {
  const generos = await get('generos');
  const padreRadios = document.querySelector('#genero');

  if (generos.data.length > 0) {
    padreRadios.classList.add("content-generos");

    generos.data.forEach(genero => {

      let formRadio = document.createElement("div");
      formRadio.classList.add("content-generos");

      let radio = document.createElement("input");
      radio.setAttribute('type', "radio");
      radio.setAttribute('id', genero.genero)
      radio.setAttribute('name', "id_genero");
      radio.setAttribute('required', true);
      radio.setAttribute('value', genero.genero_id);
      formRadio.append(radio);

      let label = document.createElement("label");
      label.setAttribute('for', genero.genero);
      label.textContent = genero.genero;
      formRadio.append(label);

      padreRadios.append(formRadio);
    });
  }
}

export const subirLenguajes = async () => {
  const lenguajes = await get('lenguajes');

  const padreLenguajes = document.querySelector("#checkbox");
  console.log(padreLenguajes);

  if (lenguajes.data.length > 0) {
    padreLenguajes.classList.add("checkboxs");
    lenguajes.data.forEach(lenguaje => {
      let formcheck = document.createElement('div');
      formcheck.classList.add("checkbox");

      let checbox = document.createElement("input");
      checbox.setAttribute('type', "checkbox");
      checbox.setAttribute('id', lenguaje.lenguaje);
      checbox.setAttribute('name', "id_lenguaje");
      checbox.setAttribute('required', true);
      checbox.setAttribute('value', lenguaje.lenguaje_id);
      formcheck.append(checbox);

      let label = document.createElement('label');
      label.setAttribute('for', lenguaje.lenguaje);
      label.textContent = lenguaje.lenguaje;
      formcheck.append(label);

      padreLenguajes.append(formcheck);
    });

  }
}

export const crearTablaUsuarios = async (info) => {

  // const usuarios=await get("usuarios");
  const generos = await get("generos");
  const ciudades = await get("ciudades");

  const body = document.querySelector("body");


  const tabla = document.createElement("table");

  /*-------------------Encabezado de la tabla------------------------*/
  tabla.classList.add('tabla');

  const encabezado = document.createElement("thead");
  encabezado.classList.add("tabla__encabezado");

  const filaEncabezado = document.createElement("tr")


  Object.keys(info[0]).forEach(llave => {
    const celdaEncabezado = document.createElement("th");
    if (llave != "id_genero" && llave != "id_ciudad") celdaEncabezado.textContent = llave;
    else {
      if (llave == "id_genero") celdaEncabezado.textContent = "genero"
      if (llave == "id_ciudad") celdaEncabezado.textContent = "ciudad"
    }
    filaEncabezado.append(celdaEncabezado);
  })

  encabezado.append(filaEncabezado);
  tabla.append(encabezado);

  /*------------ CREACION DEL CUERPO DE LA TABLA---------------------------*/
  const cuerpo = document.createElement("tbody");
  cuerpo.classList.add("tabla__cuerpo")

  info.forEach(registro => {
    const filaCuerpo = document.createElement("tr");
    filaCuerpo.classList.add("tabla__fila");
    Object.keys(registro).forEach((llave) => {
      const campoCuerpo = document.createElement("th")
      campoCuerpo.classList.add("tabla__campo");
      if (llave != "id_genero" && llave != "id_ciudad") campoCuerpo.textContent = registro[llave];
      else {
        if (llave == "id_ciudad") {
          ciudades.data.forEach(ciudad => {
            if (ciudad.ciudad_id == registro[llave]) campoCuerpo.textContent = ciudad.ciudad_nombre;
          });
        }
        if (llave == "id_genero") {
          generos.data.forEach(genero => {
            if (genero.genero_id == registro[llave]) campoCuerpo.textContent = genero.genero;
          })
        }
      }
      filaCuerpo.append(campoCuerpo);
    })
    const Opciones = document.createElement("th");
    Opciones.classList.add("tabla__campo");


    /*----Creacion de los botones de la tabla --- */

    const contenbtn = document.createElement("div");
    contenbtn.classList.add("botonesTabla")

    const btneditar=document.createElement("button");
        btneditar.classList.add("botonesTabla__boton");
        const iconoEdit=document.createElement("i");
        iconoEdit.classList.add("bx", "bx-edit-alt")
        btneditar.append(iconoEdit)
        contenbtn.append(btneditar);

    const btneliminar = document.createElement("button")
    btneliminar.classList.add("botonesTabla__boton", "botonesTabla__boton--rojo");
    const iconElim=document.createElement("i");
        iconElim.classList.add("bx","bx-trash")
        btneliminar.append(iconElim);
        contenbtn.append(btneliminar);

    Opciones.append(contenbtn);

    filaCuerpo.append(Opciones)
    cuerpo.append(filaCuerpo);
  });
  tabla.append(cuerpo);
  body.append(tabla)
}

export const crearTablaLenguajeUsuario = async (encabezado, info) => {

}