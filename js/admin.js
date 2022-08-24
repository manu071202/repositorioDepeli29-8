import { Pelicula } from "./classPelicula.js";

//aqui voy a guardar todas las peliculas
let listaPeliculas = JSON.parse(localStorage.getItem('listaPeliculasKey')) || []; 

//traer los input
let codigo = document.querySelector('#codigo');
let titulo = document.querySelector('#titulo');
let descripcion = document.querySelector('#descripcion');
let imagen = document.querySelector('#imagen');
let genero = document.querySelector('#genero');
let formPelicula = document.querySelector('#formPelicula');
let btnCrearPelicula = document.querySelector('#btnCrearPelicula');
// crear una instancia de la ventana modal
const modalAdminPelicula = new bootstrap.Modal(document.querySelector('#modalPelicula'));

//agregar el evento

btnCrearPelicula.addEventListener('click', crearPelicula);
formPelicula.addEventListener('submit', guardarPelicula);

cargarInicial();

function cargarInicial(){
    if(listaPeliculas.length > 0){
        //dibujar las filas de la tabla
        listaPeliculas.forEach((itemPelicula)=>{ crearFila(itemPelicula) })
    }
}

function crearFila(pelicula){
    //esta funcion dibuja un tr
    let tablaPeliculas = document.querySelector('#tablaPeliculas');
    //creamos el tr con document.createElement o innerHTML del tbody
    tablaPeliculas.innerHTML += `<tr>
    <th scope="row">${pelicula.codigo}</th>
    <td>${pelicula.titulo}</td>
    <td>${pelicula.descripcion}</td>
    <td>${pelicula.imagen}</td>
    <td>${pelicula.genero}</td>
    <td>
      <button class="btn btn-warning" >
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-danger">
        <i class="bi bi-x-square"></i>
      </button>
    </td>
  </tr>`
    console.log(tablaPeliculas)
}

function crearPelicula(){
    //mostrar ventana modal
    modalAdminPelicula.show();
    //generar el identificador unico y asignarlo al campo del codigo
    codigo.value = uuidv4();
    // console.log( uuidv4()); esta libreria genera identificadores unicos
}

function guardarPelicula(e){
    e.preventDefault();
   //volver a validar todos los campos

   //si los datos son correctos
   let nuevaPelicula =  new Pelicula(codigo.value, titulo.value, descripcion.value, imagen.value, genero.value);
   console.log(nuevaPelicula)
   listaPeliculas.push(nuevaPelicula);
   //guardar el arreglo en localstorage
   guardarPeliculasEnLocalStorage();
   //limpiar formulario
   limpiarFormulario();
   console.log(listaPeliculas);
   //dibujar la fila en la tabla
   crearFila(nuevaPelicula)
   //cerrar la ventana modal
   modalAdminPelicula.hide();
}

function limpiarFormulario(){
    formPelicula.reset()
    // modificar las clases de bootstrap si es necesario
}


function guardarPeliculasEnLocalStorage(){
    localStorage.setItem('listaPeliculasKey', JSON.stringify(listaPeliculas));
}


