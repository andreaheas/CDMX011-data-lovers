// import { example } from './data.js';

// import data from './data/ghibli/ghibli.js';

// import data from './data/pokemon/pokemon.js';

// import data from './data/rickandmorty/rickandmorty.js';

// console.log(example, data);



function getData() {
  fetch("data/ghibli/ghibli.json")
  .then((res) => res.json())
  .then((data) => {
    getFilm(data.films);
  });
}


function getFilm(films) {
  for (let i = 0; i < films.length; i++) {
    console.log(films[i].release_date);
  }
}

getData();

