//Objeto literal que contiene los datos de la card
const producto =[
     {
      Id:1,
      titulo : "Iniciación Guitarra 2025",
      btnCarrito:2,
      descriBoton:"Agregar",
      precio:"$18900"      
      } ,
      {Id:2,
      titulo : "Iniciación Guitarra 2025",
      btnCarrito:2,
      descriBoton:"Agregar",
      precio:"$18900"      
      } ,
      {
      Id:3,
      titulo : "Calibración Guitarra 2025",
      btnCarrito:3,
      descriBoton:"Agregar",
      precio:"$19500"
     },
     {
      Id:4,
      titulo : "Intensivo Guitarra 2025",
      btnCarrito:4,
      descriBoton:"Agregar",
      precio:"$26000"
     },
     {
      Id:5,
      titulo : "Piano 2025",
      btnCarrito:5,
      descriBoton:"Agregar",
      precio:"$20000"
     },
     {
      Id:6,
      titulo : "Avanzado Guitarra 2025",
      btnCarrito:6,
      descriBoton:"Agregar",
      precio:"$25000"
     },
     {
      Id:7,
      titulo : "Avanzado Piano 2025",
      btnCarrito:7,
      descriBoton:"Agregar",
      precio:"$26900"
     },
     {
      Id:8,
      titulo : "Avanzado PianoII 2025",
      btnCarrito:7,
      descriBoton:"Agregar",
      precio:"$26900"
     },     
     {
      Id:9,
      titulo : "Introducción intrumentos 2025",
      btnCarrito:9,
      descriBoton:"Agregar",
      precio:"$29000"
     },
     {
      Id:10,
      titulo : "Guitarra Electrica 2025",
      btnCarrito:10,
      descriBoton:"Agregar",
      precio:"$6300"      
     },
     {
      Id:11,
      titulo : "Guitarra Flolclorica 2025",
      btnCarrito:11,
      descriBoton:"Agregar",
      precio:"$30000"      
     },
     {
      Id:12,
      titulo : "Guitarra AcústicaEX 2025",
      btnCarrito:12,
      descriBoton:"Agregar",
      precio:"$4200"      
     },
     {
      Id:13,
      titulo : "Guitarra AcústicaUL 2025",
      btnCarrito:13,
      descriBoton:"Agregar",
      precio:"$4205"      
     }
];
let items =[{
             id:"",
             nombre:"",
             precio:"",      
            }
];
let anio = new Date();
let anioActual = anio.getFullYear();
let anio_ = document.getElementById('anio_');
anio_.textContent = anioActual;
anio_.style.color="white";
let titulo = document.getElementsByTagName('title');
console.log(titulo[0].textContent='CMú');

/*Código de las cards */
let cards = document.getElementById("cards");
for(let i = 1; i <= 12; i++){
      
      //acomodar los tamañ0s  de esas fotos la 8 y la 12
      if ((i===-1) || (i ===-1)){
            console.log('');
      }
      else{
            /***/
            let cardContainer = document.createElement('div');
            cards.appendChild(cardContainer);
            /** */
      let nuevoElement = document.createElement('img');
      nuevoElement.src = "media/"+`${i}`+".jpeg";
      nuevoElement.style.border="1px double white";
      /*Ingresar el estilo border a nuevoElement;*/
        cardContainer.appendChild(nuevoElement);
        let nuevoP = document.createElement('p');
        nuevoP.style.fontSize=".9rem";
        cardContainer.style.textAlign="center";
        nuevoP.style.fontFamily="Arial Black";
        nuevoP.textContent=`${producto[i].titulo}`;
        cardContainer.appendChild(nuevoP);
        let nuevoP2 = document.createElement('p');
        /**Ingresar el precio en el parrafo nuevoP2 */
        nuevoP2.textContent = `${producto[i].precio}`;
        cardContainer.appendChild(nuevoP2);
        let nuevoBoton = document.createElement('button');
        nuevoBoton.textContent = `${producto[i].descriBoton}`;
        /**Ingresar una clase al boton 'agregar' */
        nuevoBoton.classList.add('btnCarrito');
        /**Adicionar un atributo para encontrar el boton que hizo click */ 
        nuevoBoton.setAttribute("data-producto-nro", i);       
        nuevoBoton.style.width='75px';
        cardContainer.appendChild(nuevoBoton);
      }      
}
function agregaItemCarrito(id, titulo, preci){ 
                     let acumulador=1;                     
                      const itemsEncontrados = items.filter(elemento => elemento===id);
                      if (itemsEncontrados.length > 0){
                              //Creo e ingreso la cantidad a itemsContenedorDst
                      let nuevoSpanCantidad = document.createElement('span');
                      nuevoSpanCantidad.style.fontSize='10px';
                      nuevoSpanCantidad.textContent = itemsEncontrados.length+1;
                      itemContenedorDst.appendChild(nuevoSpanCantidad);    
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
                      nuevoSpanCantidad.textContent = itemsEncontrados.length+1;
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
                      items.push(id);
                      items.push(titulo);
                      items.push(preci);
                      

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
           agregaItemCarrito(id, titulo, preci) ; 
                     
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
