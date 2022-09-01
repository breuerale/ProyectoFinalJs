//Solamente muestro los equipos con fetch
//Decidi hacer un json de los clubes de argentina y mostrarlos en una tabla.
tBody = document.getElementById("tBody")

fetch("../json/clubes.json")
.then(response => response.json())
.then(equipos => {
    equipos.forEach((equipo, indice) => {
        console.log(equipo.nombre)
        tBody.innerHTML += `
        <tr id="equipo${indice + 1}" class="tabla">
            <th scope="row">${indice + 1}</th>
            <td>${equipo.nombre}</td>
            <td>${equipo.creacion}</td>
            <td>${equipo.liga}</td>
            <td>${equipo.titulos}</td>
            <td>${equipo.goleador}</td>
            <td><img src="../img/${equipo.escudo}" class="escudosArg"></td>
        </tr>
        `
    })
})

async function mostrarEquipos() {
    const cuadros = await fetch("../json/clubes.json")
    const cuadrosParseados = await cuadros.json()
    return cuadrosParseados
}






