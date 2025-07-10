let titulo = document.getElementsByTagName('title');
console.log(titulo[0].textContent='CMú');

let divss = document.getElementById('cards');
let item = divss[0];
//console.log('soy :'+item);

let imgs = document.getElementById("cards");
for(let i=2; i< 13; i++){
      //acomodar los tamañ0s  de esas fotos la 8 y la 12
      if ((i===8) || (i ===12)){
            console.log();
      }
      else{
      let nuevoElement = document.createElement('img');
      nuevoElement.src = "media/"+`${i}`+".jpeg";
  //    console.log(nuevoElement);
      imgs.appendChild(nuevoElement);
      }
}
//console.log(divs);

//apunto al boton
let boton = document.getElementById('mibtn');
//referenciio la caja flotante
//let cajaCarrito = document.getElementById('cajaFlotante');

function muestro(event){
                        //referencio para limpiar el inputText  
                        let refInputText = document.getElementById('nombreOrg');
                        //Tomo el valor que contiene a travez de .value
                        let nombreOrg = document.getElementById('nombreOrg').value;
                  //si esta vacía la cadena.
                  if(nombreOrg.trim() !== ''){                        
                        //apunto al campo destino
                        let nombreDst = document.getElementById('nombreDst');
                        nombreDst.innerText = nombreOrg;
                        refInputText.value = " ";
                        //que no recargue la página
                        event.preventDefault();
                        alert("Datos guardados!");
                        //hago aparecer la caja del carrito
                        let cajaFlotante = document.getElementById('cajaFlotante');
                        cajaFlotante.style.display='flex';
                  }  
                  else{
                        alert(`Atención: debe escribir su nombre`);
                        //limpiar de todas maneras.
                        refInputText.value = " ";
                  }       
    }
boton.addEventListener("click", function(event){
         muestro(event);
});