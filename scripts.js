let titulo = document.getElementsByTagName('title');
console.log(titulo[0].textContent='CM');

let divs = document.getElementById("#cards");

let nuevoElement = document.createElement('img');
divs.forEach(item =>{
    let ultimoElement = item.lastElementChild;
    if (ultimoElement){
        //console.log(ultimoElement);
        nuevoElement.src="media/6.jpeg";
        nuevoElement.alt="Nueva imagen de curso";
        nuevoElement.title="Nueva image del curso";
        divs.appendChild(nuevoElement);
    }
    else{
        console.log("No se encontro el último elemento");
    }

    
});



