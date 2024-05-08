import { conexionAPI } from "./conexionAPI.js";

async function eliminarProducto(event) {
    const trashIcon = event.target.closest('.fa-trash-can');
    if (!trashIcon) return;

    const card = trashIcon.closest('.card');
    const id = card.dataset.id;

    if (!id) {
        console.error("No se pudo encontrar el ID del producto");
        return;
    }

    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        try {
            await conexionAPI.eliminarProducto(id);
            card.remove();
            alert("Producto eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("Hubo un error al eliminar el producto");
        }
    }
}

document.addEventListener('click', eliminarProducto);
