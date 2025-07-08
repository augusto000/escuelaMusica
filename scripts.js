let titulo = document.getElementsByTagName('title');
console.log(titulo[0].textContent='CM');

let divs = document.querySelectorAll("#cards");
console.log(divs[0])
let nuevaImg = document.createElement('img');
    nuevaImg.src="media/6.jpeg";
    nuevaImg.alt="Nueva imagen del Curso de Guitarra";
    nuevaImg.title="Imagen del Curso de Guitarra";
divs[0].appendChild(nuevaImg);

