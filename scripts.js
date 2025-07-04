let titulo = document.getElementsByTagName('title');
console.log(titulo[0].textContent='Clases de Música');

let cards_= document.querySelectorAll("cards");

for (let item in cards_){
    console.log('soy '+ item);
      if (item === 'img'){
        
        console.log(`soy :${cards_[item]}`);
    }
}