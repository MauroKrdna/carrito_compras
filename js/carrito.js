
//Variables globales
let btnProductos = document.querySelectorAll(".btn-product");
let contadorCarrito = document.querySelector(".contar-pro");
let con = 0; 
let listadoCarrito = document.querySelector(".list-cart tbody");
document.addEventListener("DOMContentLoaded", ()=>{
    cargarProLocal();
} );

//Recorrer el array de nodos de los botones
btnProductos.forEach((btn, i)=>{
    btn.addEventListener("click", ()=>{
        con++;
        //cambiar el contador del carrito
        contadorCarrito.textContent = con;
        //Agregar el producto al carrito
        //agregarProducto();
        //Conocer la posicion del producto que selecciono
        infoProducto(i);
    });
});

// Agregar productos al carrito
function agregarProducto(producto) {
    let fila = document.createElement("tr");
    fila.setAttribute("data-id", producto.id);

    // Agregar HTML dentro de la fila
    fila.innerHTML = `
        <td> ${producto.id} </td>
        <td> <img src ="${producto.imagen}" width ="70px"> </td>
        <td> ${producto.nombre} </td>
        <td> ${producto.precio} </td>
        <td> <span onclick="borrarProducto(${producto.id})" class = "btn btn-danger"> X </span> </td> 
    `;
    listadoCarrito.appendChild(fila);
}

// Agregar informacion del producto al carrito
function infoProducto(posicion) {
    //parentElement para hacer saltos a los padres
    let producto = btnProductos[posicion].parentElement.parentElement.parentElement;
    //Creemos un objeto para guardar infor del producto
    let infoPro = {
        //Reto 1: asignar numero de fila como id
        id: con, 
        nombre: producto.querySelector("h3").textContent,
        imagen: producto.querySelector("img").src,
        precio: producto.querySelector("h5").textContent,
    }
    //console.log(infoPro);
    agregarProducto(infoPro);
    guardarProLocal(infoPro);
}


//Quitar productos del carrito
/*function borrarProducto(posicion) {
    //detecta cuando una etiqueta emite un evento
    let producto = event.target;
    producto.parentElement.parentElement.remove();
    //disminuir el contador de productos
    if (con > 0 ) {
        con--;
        contadorCarrito.textContent = con;
    }
    eliminarProLocal(posicion);
}*/
function borrarProducto(pos) {
    document.querySelector(`[data-id='${pos}']`).remove();
    if (con > 0) {
        con--;
        contadorCarrito.textContent = con;
    }
    eliminarProLocal(pos);
}


//Video 3.1: Guardar los productos en LocalStorage
function guardarProLocal(producto) {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }
    todosProductos.push(producto);
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
}

//Video 3.2: Eliminar productos de LocalStorage
function eliminarProLocal(pos) {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }
    
    todosProductos.splice((pos), 1);
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
}


//Video 3.3: Cargar Productos de LocalStorage en el Carrito
function cargarProLocal() {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }

    todosProductos.forEach((producto, i)=>{
        //agregar producto(producto);
        let fila = document.createElement("tr");
        fila.setAttribute("data-id", producto.id);

        // Agregar HTML dentro de la fila
        fila.innerHTML = `
            <td> ${producto.id} </td>
            <td> <img src ="${producto.imagen}" width ="70px"> </td>
            <td> ${producto.nombre} </td>
            <td> ${producto.precio} </td>
            <td> <span onclick="borrarProducto(${producto.id})" class = "btn btn-danger"> X </span> </td> 
        `;
        listadoCarrito.appendChild(fila);
        
    });

}
