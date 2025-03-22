//variable Globales
let tablaCarrito = document.querySelector('.cart-table tbody')
let resumenSubtotal = document.querySelector('.res-sub-total')
let resumenDescuento = document.querySelector('.promo')
let resumenTotal = document.querySelector('.total')
let destino= document.querySelector('.destino')
let resumenDomicilio= document.querySelector('.valor-domi')
let btnResumen= document.querySelector('.btn-resumen')

//Agregar evento de carga de pagina al recargar la pagina
document.addEventListener("DOMContentLoaded", ()=>{
    cargarProductos();
})

//funcion cargar productos del LocalStorage
function cargarProductos() {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }

    //Limpiar antes de cargar productos a la tabla
    tablaCarrito.innerHTML ="";

    if (todosProductos.length != 0 ) {
        todosProductos.forEach((producto, i)=>{

            //Cargar tabla
            producto.id = i + 1;
            let fila = document.createElement("tr");
            //fila.setAttribute("data-id", producto.id);

            // Agregar HTML dentro de la fila
            fila.innerHTML = `
                <td> ${producto.id} </td>
                <td class ="d-flex justify-content-evenly align-items-center">
                    <span onclick="borrarProducto(${i})" class="btn btn-danger"> X </span>
                    <img src ="${producto.imagen}" width ="70px"> 
                    ${producto.nombre}
                    
                </td>
                <td> $ ${producto.precio} </td>
                <td> 
                    <div class ="quantity quantity-wrap">
                        <div class = "decrement" onclick="actualizarCantidad(${i},-1)"> <i class="fa-solid fa-minus"></i> </div>
                        <input class ="number" type ="number" name ="quantity" value = "${producto.cantidad || 1}" maxlength ="2" size = "1" readonly>
                        <div class = "increment" onclick="actualizarCantidad(${i},1)"> <i class="fa-solid fa-plus"></i> </div>
                    </div>
                </td>
                <td> $ ${(producto.precio* producto.cantidad).toFixed(3)}</td>
            `;
            tablaCarrito.appendChild(fila);
            
        });
    } else{
        let fila = document.createElement("tr");
            fila.innerHTML =`
                <td colspan = 4>
                    <p class ="text-center fs-3">No hay productos en el carrito</p>
                </td>
            `
        tablaCarrito.appendChild(fila);
    };

    //Video 7: ejecutar resumen de comprar
    resumenCompra()
}

//Funcion para actualizar cantidades del producto
function actualizarCantidad(pos, cambio) {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }

    if (todosProductos[pos]) {
        //Actualizar Cantidad
        todosProductos[pos].cantidad = (todosProductos[pos].cantidad || 1) + cambio;

        //Asegurarse de que la cantidad no sea menor a 1
        if (todosProductos[pos].cantidad < 1) {
            todosProductos[pos].cantidad = 1;
        }

        //calcular subtotal
        let subtotal = todosProductos[pos].precio * todosProductos[pos].cantidad
    }
    //actualizar en LocalStorage
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
    //Recargar la tabla
    cargarProductos();
}

// funcion para borrar productos del carrito
function borrarProducto(pos) {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }
    todosProductos.splice(pos,1);
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
    //Recargar la tabla
    cargarProductos();
}

//Video 7: Resumen
function resumenCompra() {
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    let subtotal = 0; 

    //Recorrer cada producto y acumular
    todosProductos.forEach((producto) => {
        subtotal += producto.precio * producto.cantidad ;
    });


    //Calcular el valor del domicilio
    let domicilio = 0;
    switch (destino.value) {
        case "Medellin": 
            default: domicilio;
            break;
        case "Bello": 
            domicilio = 10.000;
            break;
        case "Copacabana": 
        case "Caldas": 
        case "La Estrella": 
            domicilio = 20.000;
            break;
        case "Envigado":
        case "Itagui":
        case "Sabaneta":
            domicilio = 15.000;
            break;
    }

    //Calcular el descuento del 10%
    let descuento = (subtotal > 100.000) ? subtotal*0.1 : 0;
    
    //Calcular el descuento del 10%
    let totalPagar = subtotal - descuento + domicilio;


    //console.log(subtotal.toFixed(3));
    //mostrar los calculos del resumen de compra
    resumenSubtotal.textContent = subtotal.toFixed(3);
    resumenDescuento.textContent = descuento.toFixed(3);
    resumenTotal.textContent = totalPagar.toFixed(3);   
    resumenDomicilio.textContent = domicilio.toFixed(3);   
}

//agregar evento change al destino para calcular el valor del domicilio
destino.addEventListener("change", ()=>{
    //Actualizar el resumen de la compro
    resumenCompra();

});


//Boton del evento para guardar el resumen en LocalSotrage
btnResumen.addEventListener("click", ()=>{
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    let resumen ={
        productos: todosProductos, // Guardar la lista completa de productos
        subtotal: resumenSubtotal.textContent,
        descuento: resumenDescuento.textContent,
        destino: destino.value,
        domicilio: resumenDomicilio.textContent,
        totalPagar: resumenTotal.textContent
    }

    /*Llenar la variable resumen con los productos de la compra
    resumen.subtotal = resumenSubtotal.textContent;
    resumen.descuento = resumenDescuento.textContent;
    resumen.destino = destino.value;
    resumen.domicilio = resumenDomicilio.textContent;
    resumen.totalPagar = resumenTotal.textContent;*/

    //Guardar en el localStorage
    localStorage.setItem("pro-resumen", JSON.stringify(resumen));
    //Redirigir el usuario a la pagina de pago
    location.href = "checkout.html";

    //console.log(resumen);
    
});