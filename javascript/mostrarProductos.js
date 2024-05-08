import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector('[data-lista]');

function crearCard(id,nombre,precio,imagen){
    const producto = document.createElement("li");
    producto.className = "card";
    producto.dataset.id = id;
    producto.innerHTML = `
    <img src="${imagen}" alt="" class="card__image">
    <div class="container-title">
        <h3 class="card__title">${nombre}</h3>
    </div>
    <div class="price__trash">
        <div class="price">
            <i class="fa-solid fa-dollar-sign"></i>
            <p class="precio__card">${precio}</p>
        </div>
        <i class="fa-regular fa-trash-can"></i>
    </div>
    `

    return producto;
}

async function listarProductos(){
    const listaAPI = await conexionAPI.listarProductos();
    // console.log(listaAPI);
    listaAPI.forEach(producto=> lista.appendChild(crearCard(producto.id, producto.nombre, producto.precio, producto.imagen)))
}

listarProductos();