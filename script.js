//Proyecto Final

//Constructor de los objetos clase Club.
class Club {
    constructor(id, nombre, creacion, liga, titulos, goleador) {
        this.id = id
        this.nombre = nombre.toUpperCase()
        this.creacion = parseInt(creacion)
        this.liga = liga.toUpperCase()
        this.titulos = titulos
        this.goleador = goleador.toUpperCase()
    }
}


let id = 0, nombre, creacion, liga, titulos, goleador, continuar, respuesta

let clubes = []

//Consulto mi localStorage si existe o no existe:
if (localStorage.getItem("clubes")) {
    clubes = JSON.parse(localStorage.getItem("clubes"))
} else {
    localStorage.setItem("clubes", JSON.stringify(clubes))
}


const form = document.getElementById("idForm")
const divClubes = document.getElementById("divClubes")
const botonClubes = document.getElementById("botonClubes")


//Capturo el evento del formulario
form.addEventListener("submit", (event) => {
    event.preventDefault()
    nombre = document.getElementById("idNombreClub").value
    creacion = parseInt(document.getElementById("idCreacion").value)
    liga = document.getElementById("idLiga").value
    titulos = parseInt(document.getElementById("idTitulos").value)
    goleador = document.getElementById("idGoleador").value
    if (nombre == "" || isNaN(creacion) || liga == "" || isNaN(titulos) || goleador == "") {
        nombre = null
        nombre ?? Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No completaste todos los campos!',
        })
    } else {
        console.log(creacion, titulos)
        const club = new Club(id, nombre, creacion, liga, titulos, goleador)

        clubes.push(club)

        //SweetAlert
        Swal.fire(
            `${nombre} fue agregado Correctamente!`,
            '',
            'success'
        )
        localStorage.setItem("clubes", JSON.stringify(clubes))
        form.reset()
    }


})


//Aca muestro los clubes con las cards y si no se encuentran en el storage muestro error.
botonClubes.addEventListener("click", () => {
    let arrayStorage = JSON.parse(localStorage.getItem('clubes'))
    if(arrayStorage == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay Clubes en la base de datos!',
        })
    } else {
        divClubes.innerHTML = ""
    arrayStorage.forEach((club, indice) => {
        divClubes.innerHTML += `
        <div class="card" id="club${indice}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Club: ${club.nombre}</h5>
                <p class="card-text">Fundacion: ${club.creacion}</p>
                <p class="card-text">Liga: ${club.liga}</p>
                <p class="card-text">Titulos Totales: ${club.titulos}</p>
                <p class="card-text">Goleador: ${club.goleador}</p>
                <button class="btn btn-danger">Eliminar Club</button>
            </div>
        </div>`
    })
    }
    
    //Borro el club
    arrayStorage.forEach((club, indice) => {
        let botonCard = document.getElementById(`club${indice}`).lastElementChild.lastElementChild
        console.log(botonCard)
        botonCard.addEventListener("click", () => {
            document.getElementById(`club${indice}`).remove()
            clubes.splice(indice, 1)
            localStorage.setItem("clubes", JSON.stringify(clubes))
            console.log(`${club.nombre} Eliminada`)
        })

    })
})

//Buscar por club

const divRespuesta1 = document.getElementById("respuesta1")
const botonBuscarClub = document.getElementById("botonBuscarClub")

function buscarClub(busqueda) {
    let clubBuscado = clubes.find(club => club.nombre == busqueda)
    divRespuesta1.innerHTML = ""
    if (clubBuscado) {
        //Toastify para las busquedas
        Toastify({
            text: `${clubBuscado.nombre} se encuentra en la base de datos.`,
            duration: 3000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to bottom right, #111112, #9A9A9A)",
            },
            onClick: function () { } 
        }).showToast();

    } else {
        Toastify({
            text: `Club Inexistente en la base de Datos`,
            duration: 3000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to bottom right, #111112, #9A9A9A)",
            },
            onClick: function () { } 
        }).showToast();

    }
}

botonBuscarClub.addEventListener("click", () => {
    const inputBuscarClub = document.getElementById("idBuscarClub").value.toUpperCase()
    buscarClub(inputBuscarClub)
})

//Buscar por antiguedad

const botonAnioClub = document.getElementById("botonAñoClub")

function buscarAntiguedad(busqueda) {
    let clubesBuscados = clubes.filter(club => club.creacion === busqueda)
    console.log(clubesBuscados)
    divRespuesta1.innerHTML = ""
    if (clubesBuscados.length == 0) {
        Toastify({
            text: "No existen clubes con dichas caracteristicas ",
            duration: 3000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to bottom right, #353F91, #062DD9)",
            },
            onClick: function () { } 
        }).showToast();

    } else {
        for (let x = 0; x < clubesBuscados.length; x++) {
            Toastify({
                text: `${clubesBuscados[x].nombre} se creó en ${busqueda} `,
                duration: 3000,
                destination: "",
                newWindow: true,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to bottom right, #353F91, #062DD9)",
                },
                onClick: function () { } 
            }).showToast();

        }

    }
}

botonAnioClub.addEventListener("click", () => {
    const inputAnioClub = parseInt(document.getElementById("añoClub").value)
    buscarAntiguedad(inputAnioClub)
})

//Funcion para buscar Goleador.
function buscarGoleador(busqueda) {
    let clubBuscado = clubes.find(clubes => clubes.goleador == busqueda)
    divRespuesta1.innerHTML = ""
    if (clubBuscado == undefined) {
        Toastify({
            text: `Goleador inexistente en la base de datos`,
            duration: 3000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to bottom right, #018233, #1F4C6B)",
            },
            onClick: function () { } 
        }).showToast();

    } else {
        Toastify({
            text: `${inputMaxGoleador.value} juega en ${clubBuscado.nombre} `,
            duration: 3000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to bottom right, #018233, #1F4C6B)",
            },
            onClick: function () { } 
        }).showToast();

    }
}

//Funcion para sumar los titulos
function sumarTitulos(clubes) {
    let total = clubes.reduce((acumulador, elemento) => acumulador + elemento.titulos, 0);
    Toastify({
        text: `Titulos totales: ${total} `,
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to bottom right, #7E0102, #E31416)",
        },
        onClick: function () { } 
    }).showToast();

}


//Buscar Goleador:

const botonMaxGoleador = document.getElementById("botonMaxGoleador")

botonMaxGoleador.addEventListener("click", () => {
    const inputMaxGoleador = document.getElementById("inputMaxGoleador").value.toUpperCase()
    buscarGoleador(inputMaxGoleador)
})

//Sumar titulos:
const botonSumar = document.getElementById("botonSumar")

botonSumar.addEventListener("click", () => {
    sumarTitulos(clubes)
})




//Decidi hacer un json de los clubes de argentina y mostrarlos en una tabla.

tBody = document.getElementById("tBody")

fetch("json/clubes.json")
.then(response => response.json())
.then(equipos => {
    equipos.forEach((equipo, indice) => {
        tBody.innerHTML += `
        <tr id="equipo${indice + 1}">
            <th scope="row">${indice + 1}</th>
            <td>${equipo.nombre}</td>
            <td>${equipo.creacion}</td>
            <td>${equipo.liga}</td>
            <td>${equipo.titulos}</td>
            <td>${equipo.goleador}</td>
            <td><img src="img/${equipo.escudo}"></td>
        </tr>
        `
    })
})


//Tambien los incorpore al local storage y al html para que se muestren como cards, y se puedan buscar.
fetch("json/clubes.json")
.then(response => response.json())
.then(equipos => {
    equipos.forEach((equipo, indice) => {
        nombre = equipo.nombre
        creacion = equipo.creacion
        liga = equipo.liga
        titulos = equipo.titulos
        goleador = equipo.goleador
        const club = new Club(id, nombre, creacion, liga, titulos, goleador)
        clubes.push(club)
        localStorage.setItem("clubes", JSON.stringify(clubes))
    })
})

async function mostrarEquipos() {
    const cuadros = await fetch("json/clubes.json")
    const cuadrosParseados = await cuadros.json()
    return cuadrosParseados
}









