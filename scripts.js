let titulo = document.getElementsByTagName('title');
console.log(titulo[0].textContent='CM');

let divs = document.getElementById("cards");

for(let i=1; i< 13; i++){
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

