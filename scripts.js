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
let boton = document.getElementById('mibtn');

let cajaCarrito = document.getElementById('cajaFlotante');
//apunto al org/dst del nombre
let nombreOrg = document.querySelector('#nombreOrg').value;
prompt(nombreOrg);
let nombreDst = document.getElementById('nombreDst');

function muestro(event, nombreOrg, nombreDst){
      event.preventDefault();      
      nombreDst.textContent = nombreOrg;
    }

boton.addEventListener("click", function(event){
      muestro(event, nombreOrg, nombreDst);
});