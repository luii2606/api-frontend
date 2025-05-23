import { post } from "../api.js";


//Solo permite letras y espacios, Si presionamos un número u otro símbolo, bloquea la tecla.
export const validar_Cletras = (event) => {
  let tecla = event.key;
  const letras = /[a-zñáéíóú\s]/i;
  if (!letras.test(tecla) && tecla != "Backspace") {
    // alert("Solo se permiten letras.");
    event.preventDefault();
  }
};

//Solo permite números y la tecla Backspace para borrar.Si escribimos una letra, la bloquea.
export const validar_Cnumericos = (event) => {
  let tecla = event.key;
  const numeros = /[0-9]/;
  if (!numeros.test(tecla) && tecla !== "Backspace") {
    // alert("Solo se permiten números.");
    event.preventDefault();
  }
};

const validarContrasena = (campo) => {
  const expresionc = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;

  if (campo.value.match(expresionc)) return true
  else return false;
}
/**
 * Función principal de validación de formularios
 * @param {Event} event - Evento del formulario
 */
export const validar = async (event) => {
  // Objeto para almacenar los campos válidos { nombreCampo: valor }
  let info = {};
  event.preventDefault();

  // Convertir los elementos del formulario en array y filtrar solo los requeridos
  const campos = [...event.target].filter((campo) => {
    if (campo.hasAttribute("required")) return campo;
  });

  // Validar cada campo requerido
  campos.forEach(campo => {
    // Obtener el tipo de elemento (INPUT, SELECT, etc)
    let tipo = campo.tagName;
    switch (tipo) {
      case "INPUT":
        // Validar inputs de tipo TEXT
        if (campo.getAttribute('type') == "text") {
          if (campo.value == "") {
            // Si está vacío: mostrar error
            campo.classList.add("border-red"); // Estilo error
            let span = document.createElement('span');
            span.textContent = `El campo ${campo.getAttribute("name")} no puede estar vacio`;
            campo.focus(); // Poner foco en el campo
            // Eliminar mensaje de error anterior si existe
            if (campo.nextElementSibling) campo.nextElementSibling.remove();
            // Crear nuevo mensaje de error
            campo.insertAdjacentElement('afterend', span);
            console.log(campo.nextSibling);

          } else {
            // Si tiene contenido, validar la función 
            if (validarMinimodos(campo)) {
              // Si pasa validación, guardar en objeto info
              let propiedad = campo.getAttribute('name');
              info[propiedad] = campo.value;
            }
          }

        }
        else if (campo.getAttribute('type') == "number") {
          if (campo.value == "") {
            // Si está vacío: mostrar error
            campo.classList.add("border-red"); // Estilo error
            let span = document.createElement('span');
            span.textContent = `El campo ${campo.getAttribute("name")} no puede estar vacio`;
            campo.focus(); // Poner foco en el campo
            // Eliminar mensaje de error anterior si existe
            if (campo.nextElementSibling) campo.nextElementSibling.remove();
            // Crear nuevo mensaje de error
            campo.insertAdjacentElement('afterend', span);
            console.log(campo.nextElementSibling);

          } else {
            // Si tiene contenido, validar la función 
            if (validarMinimodos(campo)) {
              // Si pasa validación, guardar en objeto info
              let propiedad = campo.getAttribute('name');
              info[propiedad] = campo.value;
            }
          }
        }
        // Validar inputs de tipo PASSWORD
        else if (campo.getAttribute('type') == "password") {
          if (campo.value == "") {
            // Si está vacío: mostrar error
            campo.classList.add("border-red");
            campo.focus();

            // Eliminar mensaje anterior si existe
            if (campo.nextElementSibling) campo.nextElementSibling.remove();
            let mensajeerror = document.createElement('span');
            mensajeerror.textContent = `El campo ${campo.getAttribute("name")} no puede estar vacio`;
            campo.insertAdjacentElement('mensajeerror', afterend);
          }
          else {
            // Si tiene contenido, validar la función 
            if (validarContrasena(campo)) {
              // Si pasa validación, guardar en objeto info
              let propiedad = campo.getAttribute('name');
              info[propiedad] = campo.value;
            }
          }
        }
        break;

      // Caso para campos SELECT
      case "SELECT":
        // Verificar si no se ha seleccionado nada (índice 0)
        if (campo.selectedIndex == 0) {
          // Mostrar error
          campo.classList.add("border-red");

          // Crear nuevo mensaje de error
          let mensajeerror = document.createElement('span');
          mensajeerror.textContent = "Debe seleccionar un elemento";
          campo.insertAdjacentElement('afterend', mensajeerror);
          // Eliminar mensaje anterior si existe
          if (campo.previousElementSibling) campo.nextElementSibling.remove();

        } else {
          // Si tiene selección válida, guardar en objeto info
          let propiedad = campo.getAttribute('name');
          info[propiedad] = campo.value;
        }
        break;
    }
  })
  //Filtra y obtiene solo los campos de tipo radio de un arreglo llamado campos (que contiene todos los campos de un formulario).
  const radios = campos.filter((campo) => {
    if (campo.type == "radio") return campo;
  })

  //Verifica si al menos un radio button está seleccionado y, si es así, guardar su información (name y value) en el objeto (info).
  if (radios.length > 0) {
    const guardarRadioselec = (radios) => {
      for (let n = 0; n < radios.length; n++) {
        if (radios[n].checked) {
          let propiedad = radios[n].getAttribute('name');
          let valor = radios[n].getAttribute('value');
          info[propiedad] = valor;
          return true
        };
      }
      return false;
    }
    if (guardarRadioselec(radios) == false) {
      let par = radios[0].parentElement;
      let contenRadios = par.parentElement;
      contenRadios.classList.add("border-red");
      let afterend = document.createElement('span');
      afterend.textContent = "Debe seleccionar un genero"
      contenRadios.insertAdjacentElement('afterend', afterend);
      if (contenRadios.nextElementSibling) contenRadios.nextElementSibling.remove();
      console.log(contenRadios.nextElementSibling);

    }
  }
  //Filtra y obtiene solo los campos de tipo checkbox de un arreglo llamado campos (que contiene todos los campos de un formulario).
  const checkboxs = campos.filter((campo) => {
    if (campo.type == "checkbox") return campo;
  })
  //filtra solo los checkbox que osn seleccionados.
  if (checkboxs.length > 0) {
    const checkboxs_seleccionados = checkboxs.filter((checkboxs) => checkboxs.checked)
    //si hay menos de 3 checkbox seleccionados añade el borde y mensaje de error luego lo elimina para evitar que se dupliquen
    if (checkboxs_seleccionados.length < 3) {
      let papi = checkboxs[0].parentElement;
      let padre_checkboxs = papi.parentElement;
      padre_checkboxs.classList.add("border-red")
      let span = document.createElement('span');
      span.textContent = "Debe seleccionar minimo 3 lenguajes"
      padre_checkboxs.insertAdjacentElement('afterend', span);
      // if (padre_checkboxs.nextElementSibling) padre_checkboxs.nextElementSibling.remove();
    }
    //Si hay 3 o MÁS seleccionados recoge sus valores en un array guarda el array en el objeto info usando el atributo 'name' como clave
    else {
      let lenguajes = [];
      for (let n = 0; n < checkboxs_seleccionados.length; n++) {
        let valor = checkboxs_seleccionados[n].value;
        lenguajes.push(valor)
      }
      let propiedad = checkboxs_seleccionados[0].getAttribute('name');
      info[propiedad] = lenguajes;
    }
  }
  //Verifica si se completaron todos los campos obligatorios del formulario.
  //Envía los datos principales al servidor (ej: registro de usuario).
  //Si es un registro de usuario:
  //Obtiene el ID del nuevo usuario.
  //Guarda en otra tabla los lenguajes asociados a ese usuario (relación muchos-a-muchos).
  //Muestra en consola los datos enviados y respuestas para verificar que todo funcionó.
  let cantidad_campos = contarCampos(event.target);
  if (Object.keys(info).length >= cantidad_campos) {
    const respuesta = await post(endpoint, info)
    console.log(info)

    if (endpoint == "usuarios") {
      for (let n = 0; n < info.id_lenguaje.length; n++) {
        let registro = {};
        let usua = await get("usuarios");
        let id_usua = usua.data[usua.data.length - 1].usuario_id;

        registro["id_usuario"] = parseInt(id_usua);
        registro["id_lenguaje"] = parseInt(info.id_lenguaje[n]);

        console.log("Enviando:", registro);

        await post("lenguajeUsuarios", registro);
      }
    }
    console.log(respuesta);
  }
}

export const limpiar = (event) => {
  if (event.target.value != "" && event.target.selectedIndex != 0) {
    event.target.classList.remove("border-red");
    if (event.target.nextElementSibling) {
      event.target.nextElementSibling.remove();
    }
  }
}

export const limpiarRadios = (event) => {
  let radio = event.target;
  let papi = radio.parentElement;
  let padreRadio = papi.parentElement;
  padreRadio.classList.remove("border-red");
  if (padreRadio.nextElementSibling) {
    padreRadio.nextElementSibling.remove();
  }
}

export const limpiarChecboxs = (event) => {
  let check = event.target.parentElement;
  let contentCheck = check.parentElement;
  let chec = contentCheck.childNodes;

  let checkboxs = [];

  chec.forEach(element => {
    if (element.tagName == "DIV") {
      element.childNodes.forEach(element => {
        if (element.tagName == "INPUT") checkboxs.push(element);
      });
    }
  });

  const cheboxs_seleccionados = checkboxs.filter((checbox) => checbox.checked)
  if (cheboxs_seleccionados.length >= 3) {
    contentCheck.classList.remove("border-red");
    if (contentCheck.nextElementSibling) {
      contentCheck.nextElementSibling.remove();
    }
  }
}

export const validarMin = (event) => {
  let min = event.target.getAttribute("min");
  if (event.target.value.length < min) {
    event.target.classList.add("border-red")
    if (event.target.nextElementSibling) event.target.nextElementSibling.remove();
    let afterend = document.createElement('span');
    afterend.textContent = `El campo ${event.target.getAttribute("name")} debe tener minimo ${min} caracteres`
    event.target.insertAdjacentElement('afterend', afterend);
    return false;
  } else return true;
}

const validarMinimodos = (campo) => {
  let min = campo.getAttribute('min');
  let valor = campo.value.length;
  if (valor < min) return false
  else return true;
}

export const validarMax = event => {
  let max = event.target.getAttribute("max");
  if (event.target.value.length >= max && event.key != "Backspace") {
    event.preventDefault();
  }
}

export const validarContrasenaMensaje = event => {
  const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
  if (!event.target.value.match(expresion)) {
    if (event.target.nextElementSibling) event.target.nextElementSibling.remove();
    let afterend = document.createElement('span');
    afterend.textContent = `la contraseña debe tener minimo una mayuscula, una minuscula, un caracter especial y 8 caracteres`
    event.target.insertAdjacentElement('afterend', afterend);
    return false
  } else return true;
}
//Cuenta campos requeridos en un formulario.
const contarCampos = formulario => {
  const campos = formulario.querySelectorAll(".input");
  return campos.length;
}

let id = 1;
const agregarFilaTabla = (info) => {
  let rowtable = document.querySelectorAll(".tabla__fila");
  let ultimarow = rowtable[rowtable.length - 1];

  let elemento = document.createElement('th');
  elemento.textContent = id;
  elemento.classList.add('tabla__campo');
  ultimarow.insertAdjacentElement('beforeend', elemento);

  Object.keys(info).forEach(llave => {
    if (llave != "lenguaje") {
      let elemento = document.createElement('th');
      elemento.textContent = info[llave];
      elemento.classList.add('tabla__campo');
      ultimarow.insertAdjacentElement('beforeend', elemento);
    }
  })
  let newfila = document.createElement('tr');
  newfila.classList.add('tabla__fila');
  ultimarow.insertAdjacentElement('afterend', newfila);
  id++;
}

