
//todos los que sean requeridos
  // export const campos = [...e.target].filter((elemento) => {
  //   return elemento.hasAttribute('required')
  // })
 
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

const validarContrasenia=(campo)=>{
  const expresionc=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;

  if(campo.value.match(expresionc))return true
  else return false;
}

/**
 * Función principal de validación de formularios
 * @param {Event} event - Evento del formulario
 */
export const validar = (event) => {
  // Objeto para almacenar los campos válidos { nombreCampo: valor }
  let info = {}; 
  
  event.preventDefault();

  // Convertir los elementos del formulario en array y filtrar solo los requeridos
  const campos = [...event.target].filter((campo) => {
      if(campo.hasAttribute("required")) return campo;
  });

  // Validar cada campo requerido
  campos.forEach(campo => {
      // Obtener el tipo de elemento (INPUT, SELECT, etc)
      let tipo = campo.tagName;
      
      switch(tipo) {
          case "INPUT":
              // Validar inputs de tipo TEXT
              if(campo.getAttribute('type') == "text") {
                  if(campo.value == "") {
                      // Si está vacío: mostrar error
                      campo.classList.add("border-red"); // Estilo error
                      campo.focus(); // Poner foco en el campo
                      
                      // Eliminar mensaje de error anterior si existe
                      if(campo.nextElementSibling) campo.nextElementSibling.remove();
                      
                      // Crear nuevo mensaje de error
                      let afterend = document.createElement('span');
                      afterend.textContent = `El campo ${campo.getAttribute("name")} no puede estar vacio`;
                      campo.insertAdjacentElement('afterend', afterend);
                  } else {
                      // Si tiene contenido, validar con función específica
                      if(validarMinimotwo(campo)) {
                          // Si pasa validación, guardar en objeto info
                          let propiedad = campo.getAttribute('name');
                          info[propiedad] = campo.value;
                      }
                  }
                  
              } 
              // Validar inputs de tipo PASSWORD
              else if(campo.getAttribute('type') == "password") {
                  if (campo.value == "") {
                      // Si está vacío: mostrar error
                      campo.classList.add("border-red");
                      campo.focus();
                      
                      // Eliminar mensaje anterior si existe
                      if(campo.nextElementSibling) campo.nextElementSibling.remove();
                      
                      // Crear nuevo mensaje de error
                      let afterend = document.createElement('span');
                      afterend.textContent = `El campo ${campo.getAttribute("name")} no puede estar vacio`;
                      campo.insertAdjacentElement('afterend', afterend);
                  }
                  else {
                      // Si tiene contenido, validar con función específica
                      if(validarContrasenia(campo)) {
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
                  
                  // Eliminar mensaje anterior si existe
                  if (campo.nextElementSibling) campo.nextElementSibling.remove();
                  
                  // Crear nuevo mensaje de error
                  let afterend = document.createElement('span');
                  afterend.textContent = "Debe seleccionar un elemento";
                  campo.insertAdjacentElement('afterend', afterend);
              } else {
                  // Si tiene selección válida, guardar en objeto info
                  let propiedad = campo.getAttribute('name');
                  info[propiedad] = campo.value;
              }
              break;
      }
  });
}