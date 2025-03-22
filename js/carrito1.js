// Variables globales
let btnProductos = document.querySelectorAll(".btn-product");
let contadorCarrito = document.querySelector(".contar-pro");
let con = 0;
let listadoCarrito = document.querySelector(".list-cart tbody");
document.addEventListener("DOMContentLoaded", () => {
    cargarProLocal();
});

// Recorrer el array de nodos de los botones
btnProductos.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        con++;
        contadorCarrito.textContent = con;
        infoProducto(i);
    });
});

// Agregar productos al carrito
function agregarProducto(producto) {
    let fila = document.createElement("tr");
    fila.setAttribute("data-id", producto.id);

    fila.innerHTML = `
        <td class="posicion">${producto.id}</td>
        <td> <img src="${producto.imagen}" width="70px"> </td>
        <td> ${producto.nombre} </td>
        <td> $ ${producto.precio} </td>
        <td> <span onclick="borrarProducto(event)" class="btn btn-danger"> X </span> </td>
    `;
    listadoCarrito.appendChild(fila);
}

// Agregar informacion del producto al carrito
function infoProducto(posicion) {
    let producto = btnProductos[posicion].parentElement.parentElement.parentElement;
    let infoPro = {
        id: con,
        nombre: producto.querySelector("h3").textContent,
        imagen: producto.querySelector("img").src,
        precio: producto.querySelector("h5").textContent.split("$")[1],
        cantidad: 1
    };
    agregarProducto(infoPro);
    guardarProLocal(infoPro);
}

// Quitar productos del carrito
function borrarProducto(event) {
    let fila = event.target.closest("tr"); // Obtener la fila del producto
    let idProducto = parseInt(fila.getAttribute("data-id"));
    fila.remove(); // Eliminar visualmente la fila
    
    let productos = actualizarProLocal(idProducto);
    actualizarPosiciones(productos);
    con = productos.length;
    contadorCarrito.textContent = con;
}

// Guardar productos en LocalStorage
function guardarProLocal(producto) {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }
    todosProductos.push(producto);
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
}

// Eliminar producto y actualizar LocalStorage
function actualizarProLocal(pos) {
    let productos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    productos = productos.filter(prod => prod.id !== pos);
    localStorage.setItem("pro-carrito", JSON.stringify(productos));
    return productos;
}

// Reasignar IDs y actualizar la tabla
function actualizarPosiciones(productos) {
    listadoCarrito.innerHTML = "";
    productos.forEach((producto, index) => {
        producto.id = index + 1; // Reasignar el ID
        agregarProducto(producto);
    });
    localStorage.setItem("pro-carrito", JSON.stringify(productos));
    actualizarIdsDOM(); // Llamar función para corregir visualización de posiciones
}

// Nueva función: Actualizar las posiciones en la tabla visualmente
function actualizarIdsDOM() {
    let filas = listadoCarrito.querySelectorAll("tr");
    filas.forEach((fila, index) => {
        fila.setAttribute("data-id", index + 1); // Reasignar data-id
        fila.querySelector(".posicion").textContent = index + 1; // Actualizar número en la tabla
    });
}

// Cargar productos desde LocalStorage
function cargarProLocal() {
    let productos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    productos.forEach((producto, i) => {
        producto.id = i + 1;
        agregarProducto(producto);
    });
    con = productos.length;
    contadorCarrito.textContent = con;
}

//Mostrar ocular carrito
contadorCarrito.parentElement.addEventListener("click", ()=>{
    listadoCarrito.parentElement.classList.toggle("ocultar")
})