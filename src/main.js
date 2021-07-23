import { sendData } from './datatwo.js';
// el archivo main es encargado de todo el html (dom)
let allData = sendData();

let filmSelect = document.getElementById('films');
let container = document.getElementById('container');
let directors = document.getElementById('directors');

function getIdTitles(films) {
  let idTitles = [];

  films.forEach(film => {
    // console.log(film.id, film.title);
    idTitles.push({
      id: film.id,
      title: film.title
    });
  });
  return idTitles;
}

function clearSelect() {
  filmSelect.innerHTML = '';
}

function fillSelect() {
  let optionAll = document.createElement('option');
  optionAll.text = 'Filmography';
  optionAll.value = 'all';
  filmSelect.appendChild(optionAll); //creamos las opciones y se las agregamos al padre select

  getIdTitles(allData).forEach(idTitle => {
    let option = document.createElement('option'); //por cada array recorrido se crea una opcion
    option.text = idTitle.title; //text es lo que el usuario ve
    option.value = idTitle.id; // value, por medio de que valor se evalua el texto. Por id
    filmSelect.appendChild(option);//creamos las opciones y se las agregamos al padre select
  });
  let html = "";
 
  allData.forEach(film => {
   html += `<h2 class="titleFilm">${film.title}</h2>
            <p class="director">Director: ${film.director}</p>
            <p class="description">${film.description}</p></br>
            <img class="imgPoster" src="${film.poster}">`
  })
  container.innerHTML = html;
}


filmSelect.addEventListener("change", function() {
  let getId = (filmSelect.value)
  let html = "";
  
  allData.forEach(film => {
   
    if(getId === film.id) {
       // console.log(film);
      html += `<h2 class="titleFilm">${film.title}</h2>
              <p class="director">Director: ${film.director}</p>
              <p class="description">${film.description}</p></br>
              <img class="imgPoster" src="${film.poster}">`
    } else if(getId === "all") {
      html += `<h2 class="titleFilm">${film.title}</h2>
              <p class="director">Director: ${film.director}</p>
              <p class="description">${film.description}</p>
              </br><img class="imgPoster" src="${film.poster}">`
    }
    
  });
  container.innerHTML = html;
})

//"Hayao Miyazaki" => "hayao_miyazaki" //id

//Construye a todos los directores con sus peliculas en hash(objetos)
//Ejemplo de la estructura que se hara en directorHash abajo
// { 
//   "hayao_miyazaki": {
//     "name_director": "Hayao Miyazaki",
//     "id_films": ["2baf70d1-42bb-4437-b551-e5fed5a87abe", "58611129-2dbc-4a81-a72f-77ddfc1b1b49"]
//   }
// } 
function getIdDirectors(films) {
  let directorsHash = {};

  films.forEach(film => {
    // console.log(film.id, film.title);
    let keyDirector = film.director.toLowerCase().replaceAll(' ', '_'); //aqui creando la llave //porque la nomenclatura de los objetos no lleva mayusculas, ni espacios
    //como es la primera pelicula que se consulta del ciclo, no existe la llave en directorHash
    if(directorsHash[keyDirector] === undefined) {
      directorsHash[keyDirector] = {}; //se asigna una key nueva a directoHash, y se le asugna un objeto vacio
      directorsHash[keyDirector]['name_director'] = film.director; //asigna el nombre completo del director sin transformaciones
      directorsHash[keyDirector]['id_films'] =  []; //tiene que ser un array para poder guardar mas ids
      directorsHash[keyDirector]['id_films'].push(film.id);
      
    }else{
      //este paso sucede cuando ya se le ha creado una key al director y se necesita agregar un nuevo id de pelicula al mismo director en id_films
      directorsHash[keyDirector]['id_films'].push(film.id); //esto sucede cuando el director tiene mas de una pelicula
    }
  });
  return directorsHash;
}

let allDirectors = getIdDirectors(allData);

//limpiar el select
function clearSelectDirectors() {
  directors.innerHTML = '';
}

//Agregar opciones al select
function selectDirectors() {
  let optionAll = document.createElement('option');
  optionAll.text = 'Directors';
  optionAll.value = 'all';
  directors.appendChild(optionAll); //creamos las opciones y se las agregamos al padre select

  Object.keys(allDirectors).forEach(idDirector => {
    let option = document.createElement('option'); //por cada array recorrido se crea una opcion

    option.text = allDirectors[idDirector].name_director; //text es lo que el usuario ve
    option.value = idDirector; // value, por medio de que valor se evalua el texto. Por id
  
    directors.appendChild(option);//creamos las opciones y se las agregamos al padre select
  });
}

directors.addEventListener("change", function() {
  let idDirector = directors.value; //valor del select. directors es el select
  let html = "";
  let idDirectorFilms = allDirectors[idDirector].id_films; //todos los id de sus peliculas
  
  //que pelicula va impirmir por cada director
  //este recorre toda la data
  allData.forEach(film => {

    idDirectorFilms.forEach(idDirectorFilm => {
          
          if(idDirectorFilm === film.id) {
            // debugger;
            html += `<h2 class="titleFilm">${film.title}</h2>
                    <p class="director">Director: ${film.director}</p>
                    <p class="description">${film.description}</p></br>
                    <img class="imgPoster" src="${film.poster}">`
          } 

    });
  });
  container.innerHTML = html;
 
});

clearSelect();
fillSelect();
clearSelectDirectors();
selectDirectors();
