document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar los elementos de resumen
    const resumenSubtotal = document.querySelector(".res-sub-total");
    const resumenTotal = document.querySelector(".total");
    const resumenDomicilio = document.querySelector(".valor-domi");
    const resumenDestino = document.querySelector(".destino");
    const resumenDescuento = document.querySelector(".promo");

    // Seleccionar el contenedor donde se insertarán los productos
    const productosContainer = document.querySelector(".productos");

    const btnCheckout = document.querySelector(".btn-checkout"); // Seleccionar el botón de checkout

    if (!productosContainer) {
        console.error("ERROR: No se encontró el contenedor de productos en el HTML.");
        return;
    }

    function cargarResumen() {
        let datosCheckout = JSON.parse(localStorage.getItem("pro-resumen"));

        if (!datosCheckout) {
            console.warn("⚠️ No se encontró el resumen en localStorage.");
            return;
        }

        let { subtotal, descuento, destino, domicilio, totalPagar, productos } = datosCheckout;

        // Insertar datos en el HTML
        resumenSubtotal.textContent = `$${parseFloat(subtotal).toFixed(3)}`;
        resumenDescuento.textContent = `-$${parseFloat(descuento).toFixed(3)}`;
        resumenDomicilio.textContent = `$${parseFloat(domicilio).toFixed(3)}`;
        resumenDestino.textContent = destino;
        resumenTotal.textContent = `$${parseFloat(totalPagar).toFixed(3)}`;

        // Llamar a la función para mostrar productos
        cargarProductos(productos);
    }

    function cargarProductos(productos) {
        console.log("📦 Productos cargados desde localStorage:", productos);

        productosContainer.innerHTML = ""; // Limpiar antes de agregar

        if (!productos || productos.length === 0) {
            productosContainer.innerHTML = `<p class="lead text-center">No hay productos en el carrito.</p>`;
            return;
        }

        productos.forEach(producto => {
            let precio = parseFloat(producto.precio.replace(/\s/g, "")) || 0; // Limpiar espacios en precio
            let cantidad = parseInt(producto.cantidad) || 1;
            let totalProducto = (precio * cantidad).toFixed(3);

            let productoHTML = `
                <div class="d-flex justify-content-between align-items-center border-bottom p-2">
                    <img src="${producto.imagen}" width="50" alt="${producto.nombre}">
                    <p class="lead">${producto.nombre} x${cantidad}</p>
                    <p class="lead">$${totalProducto}</p>
                </div>
            `;
            productosContainer.innerHTML += productoHTML;
        });
    }

    // Evento para el botón de checkout (solo si existe)
    if (btnCheckout) {
        btnCheckout.addEventListener("click", function () {
            location.href = "thankyou.html"; // Redirigir a la página de confirmación
        });
    }

    // Cargar datos al cargar la página
    cargarResumen();
});
