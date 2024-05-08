
const formulario = document.querySelector('[data-formulario]');
const lista = document.querySelector('[data-lista]');

const app = firebase.initializeApp({
    apiKey: "AIzaSyBk1oWrtmcWVVE8ZKBtrN--r1SHfKdfbwc",
    authDomain: "galaxy-geek-crud.firebaseapp.com",
    projectId: "galaxy-geek-crud",
    storageBucket: "galaxy-geek-crud.appspot.com",
    messagingSenderId: "420472524705",
    appId: "1:420472524705:web:d21126c84ec44ed34f85e0"
  });

const db = firebase.firestore();

const saveProduct = (nombre,precio,imagen) =>{
    db.collection('productos').doc().set({
        nombre,precio,imagen
    })
}

const getProducts = () => db.collection('productos').get();

const obtenerTareasRealTime = (callback) => db.collection('productos').onSnapshot(callback)

const deleteProduct = id => db.collection('productos').doc(id).delete();

window.addEventListener('DOMContentLoaded', async(e) =>{


    obtenerTareasRealTime( (querySnapshot) => {
        lista.innerHTML = ""
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            productData.id = doc.id;
            console.log(doc)
            const productoElement = document.createElement("li");
            productoElement.className = "card";
            // productoElement.dataset.id = producto.id;
            productoElement.innerHTML = `
            <img src="${productData.imagen}" alt="" class="card__image">
            <div class="container-title">
                <h3 class="card__title">${productData.nombre}</h3>
            </div>
            <div class="price__trash">
                <div class="price">
                    <i class="fa-solid fa-dollar-sign"></i>
                    <p class="precio__card">${productData.precio}</p>
                </div>
                <i class="fa-regular fa-trash-can" data-id="${productData.id}"></i>
            </div>
            `
            lista.appendChild(productoElement);
            console.log(lista)
        })

        const iconosEliminar = document.querySelectorAll('.fa-trash-can');
        console.log(iconosEliminar)
        iconosEliminar.forEach(icono => {
            icono.addEventListener('click', async (e)=> {
                
                const resultado = await Swal.fire({
                    title: '¿Estás seguro?',
                    text: '¡No podrás revertir esto!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo',
                    cancelButtonText: 'Cancelar'
                });
                if(resultado.isConfirmed){
                    await deleteProduct(e.target.dataset.id);
                    Swal.fire(
                        '¡Eliminado!',
                        'El producto ha sido eliminado correctamente.',
                        'success'
                    )
                }
            })
        })

    })



    
})


formulario.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const nombre = document.querySelector('[data-nombre]').value;
    const precio = document.querySelector('[data-precio]').value;
    const imagen = document.querySelector('[data-imagen]').value;

    await saveProduct(nombre,precio,imagen);


    formulario.reset();

    console.log(nombre,precio,imagen)

});

