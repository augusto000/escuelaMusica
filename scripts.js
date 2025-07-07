let titulo = document.getElementsByTagName('title');
console.log(titulo[0].textContent='CM');

/**Cards */
let divs = document.querySelector('#cards');
let nuevaImg = document.createElement('img');
nuevaImg.src='media/6.jpeg';
nuevaImg.alt='nuevaImagen';

if (divs.insertAdjacentElement('afterend',nuevaImg)){
   console.log("La nueva imágen ",nuevaImg);
   divs.appendChild(nuevaImg);
}
console.log(typeof(NodeList));
/**Recorro el NodeList */
divs.forEach(element, indice, divs => {
    console.log(`${element} : en la posición ${indice + 1}`);
});