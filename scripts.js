// Objeto literal que contiene los datos de los productos
const producto =;

// Array que representará el carrito de compras
let cart =;

// Referencias a elementos del DOM
const anio_ = document.getElementById('anio_');
const cardsContainer = document.getElementById("cards");
const itemsContenedorPrincipal = document.getElementById('items-contenedor');
const totalDst = document.getElementById('total');
const form = document.getElementById('formulario');
const btnForm = document.getElementById('btnForm');
const nombreOrgInput = document.getElementById('nombreOrg');
const apellidoOrgInput = document.getElementById('apellidoOrg');
const emailOrgInput = document.getElementById('emailOrg');
const observacionesOrgInput = document.getElementById('observacionesOrg');
const nombreDstSpan = document.getElementById('nombreDst');
const apeDstSpan = document.getElementById('apeDst');
const emailDstSpan = document.getElementById('emailDst');
const observacionesDstSpan = document.getElementById('observacionesDst');
const cajaFlotante = document.getElementById('cajaFlotante');

// --- Funciones de Utilidad ---

/**
 * Formatea un número a una cadena de moneda localizada.
 * @param {number} amount - El monto numérico a formatear.
 * @returns {string} El monto formateado como cadena de moneda.
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0 // Sin decimales para números enteros como en los datos originales
    }).format(amount);
}

/**
 * Parsea una cadena de precio (ej. "$26900") a un número flotante.
 * @param {string} priceString - La cadena de precio a parsear.
 * @returns {number} El precio como número flotante.
 */
function parsePrice(priceString) {
    return parseFloat(priceString.replace('$', '').replace(',', ''));
}

/**
 * Guarda el estado actual del carrito en el almacenamiento local.
 */
function saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

/**
 * Carga el estado del carrito desde el almacenamiento local.
 */
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// --- Funciones del Carrito de Compras ---

/**
 * Añade un producto al carrito o incrementa su cantidad si ya existe.
 * @param {object} productToAdd - El objeto del producto a añadir.
 */
function updateCart(productToAdd) {
    const parsedPrice = parsePrice(productToAdd.precio);
    const existingItemIndex = cart.findIndex(item => item.id === productToAdd.Id);

    if (existingItemIndex > -1) {
        // El artículo existe, incrementar la cantidad (actualización inmutable)
        cart = cart.map((item, index) =>
            index === existingItemIndex
               ? {...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        // El artículo es nuevo, añadir al carrito (actualización inmutable)
        const newItem = {
            id: productToAdd.Id,
            title: productToAdd.titulo,
            price: parsedPrice,
            quantity: 1
        };
        cart = [...cart, newItem];
    }
    saveCartToLocalStorage();
    renderCart();
    calculateAndDisplayTotal();
}

/**
 * Elimina un artículo del carrito por su ID.
 * @param {number} productId - El ID del producto a eliminar.
 */
function removeItemFromCart(productId) {
    cart = cart.filter(item => item.id!== productId);
    saveCartToLocalStorage();
    renderCart();
    calculateAndDisplayTotal();
}

/**
 * Renderiza dinámicamente los artículos del carrito en el DOM.
 */
function renderCart() {
    itemsContenedorPrincipal.innerHTML = ''; // Limpiar contenido existente

    if (cart.length === 0) {
        itemsContenedorPrincipal.textContent = 'El carrito está vacío.';
        cajaFlotante.classList.remove('cart-has-items'); // Ocultar carrito si está vacío
        cajaFlotante.classList.add('cart-hidden');
        return;
    }

    cart.forEach(item => {
        const itemContenedorDst = document.createElement('div');
        itemContenedorDst.classList.add('itemContenedorDst');

        const nuevoSpanCantidad = document.createElement('span');
        nuevoSpanCantidad.classList.add('item-quantity');
        nuevoSpanCantidad.textContent = item.quantity;

        const nuevoSpanTitulo = document.createElement('span');
        nuevoSpanTitulo.classList.add('item-title');
        nuevoSpanTitulo.textContent = item.title;

        const nuevoSpanPrecio = document.createElement('span');
        nuevoSpanPrecio.classList.add('item-price');
        // Mostrar el precio total por la cantidad de este artículo
        nuevoSpanPrecio.textContent = formatCurrency(item.price * item.quantity);

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-item');
        removeButton.textContent = 'X';
        removeButton.setAttribute('data-id', item.id);
        removeButton.addEventListener('click', () => removeItemFromCart(item.id));

        itemContenedorDst.appendChild(nuevoSpanCantidad);
        itemContenedorDst.appendChild(nuevoSpanTitulo);
        itemContenedorDst.appendChild(nuevoSpanPrecio);
        itemContenedorDst.appendChild(removeButton);
        itemsContenedorPrincipal.appendChild(itemContenedorDst);
    });

    cajaFlotante.classList.remove('cart-hidden'); // Asegurar que el carrito esté visible
    cajaFlotante.classList.add('cart-has-items');
}

/**
 * Calcula y muestra el total acumulado del carrito.
 */
function calculateAndDisplayTotal() {
    const total = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    totalDst.textContent = formatCurrency(total);
}

// --- Funciones de Renderizado de Productos ---

/**
 * Renderiza dinámicamente las tarjetas de productos en la cuadrícula.
 */
function renderProductCards() {
    for (let i = 0; i < producto.length; i++) {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardsContainer.appendChild(cardContainer);

        let nuevoElement = document.createElement('img');
        // Usar el Id del producto para el nombre de la imagen, asumiendo que las imágenes están nombradas 0.jpeg, 1.jpeg, etc.
        nuevoElement.src = `media/${producto[i].Id}.jpeg`;
        nuevoElement.alt = `Imagen de ${producto[i].titulo}`; // Texto alternativo para accesibilidad
        nuevoElement.style.border = "1px double white"; // Estilo original
        cardContainer.appendChild(nuevoElement);

        let nuevoP = document.createElement('p');
        nuevoP.style.fontSize = ".9rem";
        nuevoP.style.fontFamily = "Arial Black";
        nuevoP.textContent = `${producto[i].titulo}`;
        cardContainer.appendChild(nuevoP);

        let nuevoP2 = document.createElement('p');
        nuevoP2.textContent = `${producto[i].precio}`;
        cardContainer.appendChild(nuevoP2);

        let nuevoBoton = document.createElement('button');
        nuevoBoton.textContent = `${producto[i].descriBoton}`;
        nuevoBoton.classList.add('btnCarrito');
        nuevoBoton.setAttribute("data-producto-nro", i); // Almacenar el índice 0-basado
        nuevoBoton.style.width = '75px';
        cardContainer.appendChild(nuevoBoton);
    }
}

// --- Manejo de Eventos ---

// Delegación de eventos para los botones "Agregar al Carrito"
cardsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('btnCarrito')) {
        const prodClickeadoIndex = parseInt(event.target.dataset.productoNro);
        const selectedProduct = producto[prodClickeadoIndex];
        updateCart(selectedProduct);
    }
});

// Manejador de envío del formulario
btnForm.addEventListener("click", function(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    const nombre = nombreOrgInput.value.trim();
    const apellido = apellidoOrgInput.value.trim();
    const email = emailOrgInput.value.trim();
    const observaciones = observacionesOrgInput.value.trim();

    if (nombre && apellido && email && observaciones) {
        nombreDstSpan.textContent = nombre;
        apeDstSpan.textContent = apellido;
        emailDstSpan.textContent = email;
        observacionesDstSpan.textContent = observaciones;
        alert('¡Datos guardados correctamente!');
        form.reset(); // Limpiar los campos del formulario
    } else {
        alert('Atención: debe escribir todos sus datos.');
    }
});

// --- Inicialización al cargar el DOM ---

document.addEventListener('DOMContentLoaded', () => {
    // Establecer el año actual en el pie de página
    anio_.textContent = new Date().getFullYear();
    // Establecer el título de la página
    document.title = 'CMú';

    // Cargar los datos del carrito desde el almacenamiento local
    loadCartFromLocalStorage();
    // Renderizar las tarjetas de productos
    renderProductCards();
    // Renderizar la visualización del carrito con los datos cargados
    renderCart();
    // Calcular y mostrar el total del carrito con los datos cargados
    calculateAndDisplayTotal();
});
