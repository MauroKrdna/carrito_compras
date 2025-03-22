document.addEventListener("DOMContentLoaded", function () {
    const productosContainer = document.querySelector(".productos"); 
    const subtotalElemento = document.querySelector(".res-sub-total");
    const totalElemento = document.querySelector(".total");
    const valorDomicilioElemento = document.querySelector(".valor-domi");
    const ciudadDomicilioElemento = document.querySelector(".destino");
    const promoElemento = document.querySelector(".promo");

    function cargarProductos() {
        let carrito = JSON.parse(localStorage.getItem("pro-carrito")) || [];
        productosContainer.innerHTML = "";

        let subtotal = 0;
        carrito.forEach(producto => {
            let totalProducto = producto.precio * producto.cantidad;
            subtotal += totalProducto;

            productosContainer.innerHTML += `
                <div class="d-flex justify-content-between align-items-center">
                    <p class="lead">${producto.nombre} x${producto.cantidad}</p>
                    <p class="lead">$${totalProducto.toFixed(3)}</p>
                </div>
            `;
        });

        // 💡 Aquí puedes cambiar los valores de domicilio según la ciudad elegida
        let valorDomicilio = 5.00; // Ejemplo de valor fijo
        let descuentoPromo = subtotal > 50 ? 5.00 : 0; // Si la compra supera $50, aplica un descuento de $5

        // Actualizar los valores en la tabla
        valorDomicilioElemento.innerText = `$${valorDomicilio.toFixed(3)}`;
        ciudadDomicilioElemento.innerText = "Bogotá"; // Puedes cambiarlo dinámicamente según la ciudad del usuario
        promoElemento.innerText = `-$${descuentoPromo.toFixed(3)}`;
        subtotalElemento.innerText = `$${subtotal.toFixed(3)}`;
        totalElemento.innerText = `$${(subtotal + valorDomicilio - descuentoPromo).toFixed(3)}`;
    }

    cargarProductos(); // Llamar la función al cargar la página
});
