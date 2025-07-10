let titulo = document.getElementsByTagName('title');
console.log(titulo[0].textContent='CMú');

let divss = document.getElementById('cards');
let item = divss[0];
//console.log('soy :'+item);



let imgs = document.getElementById("cards");
for(let i=1; i< 13; i++){
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
let boton = document.getElementById('mibtn');
console.log('soy el boton :'+boton);
let cajaCarrito = document.getElementById('cajaFlotante');

function muestro(){
    console.log("dentro de la función Muestro");
    }

boton.addEventListener("click", muestro);