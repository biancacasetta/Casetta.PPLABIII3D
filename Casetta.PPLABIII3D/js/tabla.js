function generarEncabezado(encabezado)
{
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
  
    for (const key in encabezado)
    {  
        if(key === "id")
        { 
            continue;
        }

        const th = document.createElement("th"); 
        th.textContent = key;     
        tr.appendChild(th) ; 
    }

    thead.appendChild(tr);
    return thead;
}

function generarCuerpo(data)
{
    const tbody = document.createElement("tbody");

    data.forEach(item =>
    {
        const tr = document.createElement("tr");

        for (const key in item)
        { 
            if(key === "id")
            { 
                tr.setAttribute("data-id", item[key]);
                continue;  
            }

            const td = document.createElement("td"); 
            td.textContent = item[key];     
            tr.appendChild(td);                
        }

        tbody.appendChild(tr);
    });

    return tbody;
}

export function generarTabla(data)
{ 
    if(!Array.isArray(data))
    {
        return null;                 
    }

    const table = document.createElement("table");
    table.appendChild(generarEncabezado(data[0]));
    table.appendChild(generarCuerpo(data));

    return table;
}

const $spinner = document.querySelector(".spinner");
const $tabla = document.getElementById("tabla-dinamica");

export function iniciarSpinner()
{
    if($spinner.classList.contains("hidden"))
    {
        $spinner.classList.remove("hidden");
        $tabla.classList.add("hidden");
    }

    setTimeout(mostrarTabla, 3000);
}

function mostrarTabla()
{
    $spinner.classList.add("hidden");
    $tabla.classList.remove("hidden");
}
