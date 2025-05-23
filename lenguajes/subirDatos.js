export const crearTablaLenguajes=(info_encabezado,info)=>{
  
  if (info.length > 0) {
    
    const body=document.querySelector("body");
    const tabla=document.createElement("table");
    tabla.classList.add('tabla',"tabla--pequeña");

    /*---------------Encabezado de la tabla---------------- */
    const encabezado=document.createElement("thead");
    encabezado.classList.add("tabla__encabezado");
    const rowEncabezado=document.createElement("tr")

    info_encabezado.forEach(nombre => {
        const campo=document.createElement("th")
        campo.textContent=nombre;
        rowEncabezado.append(campo);
    });
    tabla.append(rowEncabezado);

    /*--------------------Cuerpo de la tabla-----------------*/
    const cuerpo=document.createElement("tbody");
    cuerpo.classList.add("tabla__cuerpo");

    info.forEach(registroLenguaje => {
        const row=document.createElement("tr")
        row.classList.add("tabla__fila");
        Object.keys(registroLenguaje).forEach(llave=>{
            const campo=document.createElement("th");
            campo.classList.add("tabla__campo");
            campo.textContent=registroLenguaje[llave];
            row.append(campo);
        })

        const Opciones=document.createElement("th");
        Opciones.classList.add("tabla__campo");

        const contenbtn=document.createElement("div");
        contenbtn.classList.add("botonesTabla")

        const btneditar=document.createElement("button");
        btneditar.classList.add("botonesTabla__boton");
        const iconoEdit=document.createElement("i");
        iconoEdit.classList.add("bx", "bx-edit-alt")
        btneditar.append(iconoEdit)
        contenbtn.append(btneditar);

        const btneliminar=document.createElement("button")
        btneliminar.classList.add("botonesTabla__boton","botonesTabla__boton--rojo");
        const iconElim=document.createElement("i");
        iconElim.classList.add("bx","bx-trash")
        btneliminar.append(iconElim);
        contenbtn.append(btneliminar);

        Opciones.append(contenbtn);

        row.append(Opciones)
        cuerpo.append(row);
        
    })
    tabla.append(cuerpo);
    body.append(tabla);
}
}