let anio = new Date();
let anioActual = anio.getFullYear();
let anio_ = document.getElementById('anio_');
anio_.textContent = anioActual;
anio_.style.color="white";
let titulo = document.getElementsByTagName('title');
console.log(titulo[0].textContent='CMú');

let imgs = document.getElementById("cards");
for(let i=2; i< 13; i++){
      //acomodar los tamañ0s  de esas fotos la 8 y la 12
      if ((i===8) || (i ===12)){
            console.log();
      }
      else{
      let nuevoElement = document.createElement('img');
      nuevoElement.src = "media/"+`${i}`+".jpeg";
      //console.log(nuevoElement);
      imgs.appendChild(nuevoElement);
      }
}
//apunto al boton
let boton = document.getElementById('mibtn');
//referenciio la caja flotante
//let cajaCarrito = document.getElementById('cajaFlotante');
function campoNombre(event){                        
                        //referencio para limpiar el inputText  
                       // let refInputText = document.getElementById('nombreOrg');
                        //Tomo el valor que contiene a travez de .value
                        let nombreOrg = document.getElementById('nombreOrg').value;
                        return nombreOrg;
                  //si esta vacía la cadena.
                  if(nombreOrg.trim() !== ''){                        
                        //apunto al campo destino
                        let nombreDst = document.getElementById('nombreDst');
                        nombreDst.innerText = nombreOrg;
                        //refInputText.value = " ";
                        //que no recargue la página
                        //event.preventDefault();
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
    function cajaCarrito(){
                        //hago aparecer la caja del carrito
                        let cajaFlotante = document.getElementById('cajaFlotante');
                        cajaFlotante.style.display='flex';
                        cajaFlotante.style.justifyContent='center';
                        cajaFlotante.style.alignItems='top';
                        cajaFlotante.style.flexWrap='wrap';
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
                        //No recargar la página                        
                        noRecargarPagina(event);
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
boton.addEventListener("click", function(event){
         let nombreOrg = campoNombre(event);
         let apellidoOrg = campoApellido(event);
         let emailOrg = campoEmail(event);
         let observacionesOrg = campoObservacion(event);
         verificarDatos(event, nombreOrg, apellidoOrg, emailOrg, observacionesOrg);
         limpiarCampos(event);          
         //cajaCarrito(event)
});