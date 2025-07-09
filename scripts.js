let titulo = document.getElementsByTagName('title');
console.log(titulo[0].textContent='Clases de Música');

let divs = document.getElementById("cards");

for(let i=1; i< 13; i++){
      //acomodar los tamañ0s  de esas fotos la 8 y la 12
      if ((i===8) || (i ===12)){
            console.log();
      }
      else{
      let nuevoElement = document.createElement('img');
      nuevoElement.src = "media/"+`${i}`+".jpeg";
      console.log(nuevoElement);
      divs.appendChild(nuevoElement);
      }
}
console.log(divs);

