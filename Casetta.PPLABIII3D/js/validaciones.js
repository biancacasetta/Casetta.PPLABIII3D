export function validarCampoVacio(e) {
    const input = e.target;
    let funciono = true;
    const valorInput = input.value.trim();
    if (!valorInput) {
      mostrarMensajeError(input);
      funciono = false;
    } else {
      ocultarMensajeError(input);
      funciono = true;
    }
    return funciono;
  }

export function validarSubmitVacio(controles)
{
    let submitValido = true;
    for(let i = 0; i < controles.length; i++)
    {
        const control = controles.item(i);

        if(control.matches("input") && !control.classList.contains("hidden"))
        {     
            if((control.matches("[type=number]") && control.value.trim() == "")
            || (control.matches("[type=text]") && control.value.trim() == "")
            || control.value.trim() == null)
            {
                mostrarMensajeError(control);
                submitValido = false;
            }
        }
    }
    return submitValido;
}

function mostrarMensajeError(input, mensaje)
{
    const small = input.nextElementSibling;
    
    if(small)
    {
        const nombre = input.name.slice(3);
        small.textContent = mensaje || `*${nombre} Requerido/a`;
    } 
}

function ocultarMensajeError(input)
{
    const small = input.nextElementSibling;
    if(small)
    {
        small.textContent = "";
    } 
}

export function validarMaxCaracteres(e) {
    const input = e.target;
    const value = input.value.trim();

    if (!value) {
      mostrarMensajeError(input);
    } else {
      ocultarMensajeError(input);
      if (value.length > 25) {
        mostrarMensajeError(input, "*No se puede superar los 25 caracteres");
      } else {
        ocultarMensajeError(input);
      }
    }
  }

  export function validarPrecio(e)
  {
    const pattern = /^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/gm;
    const input = e.target;
    const value = input.value.trim();

    if(value < 0 || value > 50000)
    {
        mostrarMensajeError(input, "Ingresar un número entre 0 y 50000");
    }
    else if (value == 0)
    {
        ocultarMensajeError(input)
    }
    else
    {
        pattern.test(value) ? ocultarMensajeError(input) : mostrarMensajeError(input, "Solo se pueden ingresar números");
    }
};
  