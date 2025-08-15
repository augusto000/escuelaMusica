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
function agregaItemCarrito(items ,id, titulo, preci){                                           
             items.push(id);
             items.push(titulo);
             items.push(preci);         
             const itemEncontrado = items.find(elemento => elemento===id);
                     
                      if (itemEncontrado){
                        let  itemContenedorDst = document.getElementById('items-contenedor');
                        itemContenedorDst.style.width = '100px';
                        itemContenedorDst.style.backgroundColor = 'white';
                        itemContenedorDst.style.display = 'flex';
                        itemContenedorDst.style.marginLeft='2px';                        
                        //itemContenedorDst.style.justifyContent ='left';
                        let  cuentoItemsMismoTipo = items.filter(item => item === id)
                        let cantidad = cuentoItemsMismoTipo.length;
                        //Creo e ingreso la cantidad a itemsContenedorDst
                        let nuevoSpanCantidad = document.createElement('span');
                        let nuevoSpanTitulo = document.createElement('span');
                        let nuevoSpanPrecio = document.createElement('span');
                          if(cantidad === 1){
                              //configurar cantidad
                              nuevoSpanCantidad.style.fontSize='10px';
                              nuevoSpanCantidad.style.width = '50px'
                              nuevoSpanCantidad.style.border='1px solid black';
                              nuevoSpanCantidad.textContent = ' ';
                              nuevoSpanCantidad.textContent = cantidad;
                              itemContenedorDst.appendChild(nuevoSpanCantidad);
                              //configurar titulo
                              nuevoSpanTitulo.textContent = titulo;
                              nuevoSpanTitulo.style.width = '25px';
                              nuevoSpanTitulo.style.fontSize = '10px';
                              nuevoSpanTitulo.style.textAlign = 'center';
                              itemContenedorDst.appendChild(nuevoSpanTitulo);
                              //configurar el precio
                              nuevoSpanPrecio.textContent = preci;
                              nuevoSpanPrecio.style.width = '10px';
                              nuevoSpanPrecio.style.textAlign = 'center';
                              nuevoSpanPrecio.style.fontSize  = '10px';
                              itemContenedorDst.appendChild(nuevoSpanPrecio);
                          }
                          else{
                              //borrar elemento hijo span para que se borre el valor dentro
                              //itemContenedorDst.textContent = ' ';
                              let cantidad = cuentoItemsMismoTipo.length;
                              let nuevoSpanCantidad = document.createElement('span');
                              nuevoSpanCantidad.style.fontSize='10px';
                              nuevoSpanCantidad.style.border='1px';
                              nuevoSpanCantidad.textContent = cantidad;
                              itemContenedorDst.appendChild(nuevoSpanCantidad);
                                                            
                              //nuevoSpanCantidad.textContent = ' ';
                              //nuevoSpanCantidad.textContent = cantidad;
                               
                          }
                            
                      }
                      else{
                        //referenciar el contenedor
                              let itemsContenedorPrincipal = document.getElementById('items-contenedor');
                              let itemContenedorDst = document.createElement('div');
                              itemContenedorDst.classList.add('itemContenedorDst');
                              itemContenedorDst.style.display='flex';
                              itemContenedorDst.style.maxWidth='100%'
                              itemContenedorDst.style.maxHeight='10px';
                              //Creo e ingreso la cantidad a itemsContenedorDst
                              let nuevoSpanCantidad = document.createElement('span');
                              nuevoSpanCantidad.style.fontSize='10px';
                              //nuevoSpanCantidad.textContent = itemsEncontrados.length+1;
                              itemContenedorDst.appendChild(nuevoSpanCantidad);
                              //Creo e ingreso el titulo a itemsContenedorDst
                              let nuevoSpanTitulo = document.createElement('span');
                              nuevoSpanTitulo.textContent = titulo;
                              nuevoSpanTitulo.style.fontSize='10px';
                              itemContenedorDst.appendChild(nuevoSpanTitulo);
                              let nuevoSpanPrecio =document.createElement('span');
                              nuevoSpanPrecio.style.fontSize='10px';
                              nuevoSpanPrecio.textContent = preci;
                              itemContenedorDst.appendChild(nuevoSpanPrecio);
                              itemsContenedorPrincipal.appendChild(itemContenedorDst);
                              let totalDst = document.getElementById('total');
                      }                          
                      
                      /**id:"",
                         nombre:"",
                         precio:"",
                       * 
                       */
}

/**Referenciar la caja flotante donde se insertaran los items que los clientes vallan escogiendo */
let cajaFlotante = document.getElementById('cajaFlotante');
/*referenciar la caja del carrito donde se insertarán los items*/
let btnsCarrito = document.querySelectorAll('.btnCarrito');
btnsCarrito.forEach((boton)=>{
    boton.addEventListener('click',function(){
           /**Comentario: al usar dataset,formatea el output a camelcase por eso
            * buscarlo como "camelcase : productoNro"*/
           //console.log('Se hizo click en el boton :', this.dataset.productoNro);
           //prodClickeado toma el boton escogido.
           let prodClickeado = this.dataset.productoNro;           
           let id = producto[prodClickeado-1].Id;
           //let cant = acumuladorCantidad+1;
           let titulo = producto[prodClickeado].titulo;
           let preci = producto[prodClickeado].precio;
           agregaItemCarrito(items ,id, titulo, preci) ; 
                     
      });
});
 
//referencio al boton del formulario
let boton = document.getElementById('btnForm');
function campoNombre(event){                        
                        //referencio para limpiar el inputText  
                       // let refInputText = document.getElementById('nombreOrg');
                        //Tomo el valor que contiene a travez de .value
                        let nombreOrg = document.getElementById('nombreOrg').value;
                        //return nombreOrg;
                  //si esta vacía la cadena.
                  if(nombreOrg.trim() !== ''){                        
                        //apunto al campo destino
                        let nombreDst = document.getElementById('nombreDst');
                        nombreDst.innerText = nombreOrg;
                        //refInputText.value = " ";
                        //que no recargue la página
                        //event.preventDefault();
                        return nombreOrg;
                        noRecargarPagina(event);                        
                  }  
                  else{
                        alert(`Atención: debe escribir todos sus datos.`);
                        //limpiar de todas maneras.
                        //limpiarCampos();
                        //No recargar la página                        
                        noRecargarPagina(event);
                  }                         
    }
    function campoApellido(event){                        
                        //referencio para limpiar el inputText 
                        let refApeOrg = document.getElementById('apellidoOrg');                       
                        //Tomo el valor que contiene a travez de .value
                        let apellidoOrg = document.getElementById('apellidoOrg').value;
                        return apellidoOrg;
                  //si esta vacía la cadena.
                  if(apellidoOrg.trim() !== ''){                        
                        //apunto al campo destino
                        let apellidoDst = document.getElementById('apeDst');
                        //copiar valor
                        apellidoDst.innerText = apellidoOrg;
                        //refInputText.value = " ";
                        //que no recargue la página
                        //event.preventDefault();
                        //alert("Datos guardados!");
                        noRecargarPagina(event);                        
                  }  
                  else{
                        alert(`Atención: debe escribir todos sus datos.`);
                        //limpiar de todas maneras.
                        //limpiarCampos();
                        //No recargar la página                        
                        noRecargarPagina(event);
                  }                         
    }
    function noRecargarPagina(event){
          event.preventDefault();
    }        
    function verificarDatos(event, nombreOrg, apellidoOrg, emailOrg, observacionesOrg){
                        //si esta vacía la cadena.
                  if(nombreOrg.trim() !== '' && apellidoOrg.trim() !== '' && emailOrg.trim() !== '' && observacionesOrg.trim() !== ''){                        
                        //apunto al campo destino
                        let nombreDst = document.getElementById('nombreDst');
                        nombreDst.innerText = nombreOrg;
                        //apunto al campo destino
                        let apellidoDst = document.getElementById('apeDst');
                        //copiar valor
                        apellidoDst.innerText = apellidoOrg;
                        //copiar el valor desde el origen al destino
                        let emailDst = document.getElementById('emailDst');
                        emailDst.textContent = emailOrg;
                        //copiar el valor desde observacionesDst
                        let observacionesDst = document.getElementById('observacionesDst');
                        observacionesDst.textContent = observacionesOrg;                        
                  }
                  else{
                        alert(`Atención: debe escribir todos sus datos.`);
                        //no recargar la pagina
                        noRecargarPagina(event);
                        //limpiarCampos(event);
                        limpiarCampos(event);
                  }                  
    }
    function campoEmail(){
                        //Tomar el valor del input
                        let emailOrg = document.getElementById('emailOrg').value;
                        //referencio emailDst de destino
                        let emailDst = document.getElementById('emailDst');
                        //traspasar el valor
                        return emailOrg;
                  }
      function campoObservacion(event){
                        //referencio y tomo el valor del input de origen
                        let observacionesOrg = document.getElementById('observacionesOrg').value;
                        //retorno el valor
                        return observacionesOrg;
      }
      function limpiarCampos(event){
                        formulario.reset();                        
    }
/**Boton del Formulario */    
boton.addEventListener("click", function(event){
         /*Verifico los datos en los campos ingresador*/
         let nombreOrg = campoNombre(event);
         let apellidoOrg = campoApellido(event);
         let emailOrg = campoEmail(event);
         let observacionesOrg = campoObservacion(event);
         verificarDatos(event, nombreOrg, apellidoOrg, emailOrg, observacionesOrg);
         limpiarCampos(event);       
});
