//Script para la seccion Qatar.

tBody = document.getElementById("tBody")

//Llamo a mi archivo json local con las selecciones y armo una tabla.
fetch("../json/selecciones.json")
.then(response => response.json())
.then(equipos => {
    equipos.forEach((equipo, indice) => {
        tBody.innerHTML += `
        <tr id="equipo${indice + 1}" class="tabla">
            <th scope="row">${equipo.grupo}</th>
            <td>${equipo.seleccion}</td>
            <td>${equipo.creacion}</td>
            <td>${equipo.federacion}</td>
            <td>${equipo.mundiales}</td>
            <td>${equipo.goleador}</td>
            <td><img src="../img/${equipo.escudo}" class="escudosArg"></td>
        </tr>
        `
    })
})

async function mostrarEquipos() {
    const cuadros = await fetch("../json/selecciones.json")
    const cuadrosParseados = await cuadros.json()
    return cuadrosParseados
}


