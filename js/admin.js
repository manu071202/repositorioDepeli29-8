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
//variable para ejecutar la funcion de crear pelocula o la que actualiza
let peliculaNueva = true;//si peliculaNueva es true con una pelicula,caso contrario actualizo

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
      <button class="btn btn-warning" onclick='editarPelicula("${pelicula.codigo}")' >
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-danger" onclick='borrarPelicula("${pelicula.codigo}")'>
        <i class="bi bi-x-square"></i>
      </button>
    </td>
  </tr>`
    console.log(tablaPeliculas)
}

function crearPelicula(){
    //volver a accionar a la variable booleana el valor  de true
    peliculaNueva= true
    //mostrar ventana modal
    modalAdminPelicula.show();
    //generar el identificador unico y asignarlo al campo del codigo
    codigo.value = uuidv4();
    // console.log( uuidv4()); esta libreria genera identificadores unicos
}

function guardarPelicula(e){
    e.preventDefault();
   //volver a validar todos los campos

   //if(peliculaNueva)
if(peliculaNueva === true){
    generarPeliculaNueva
}else{
    actualizarPelicula
}
}


 function generarPeliculaNueva(){  //si los datos son correctos
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

window.borrarPelicula = function (codigo){
    Swal.fire({
        title: 'eliminar pelicula',
        text: "esta seguro de eliminar la pelicula ,esste proceso no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar',
        cancelButtonColor: 'cancelar'
      }).then((result) => {
          console.log(result)
        if (result.isConfirmed) {
            //aqui quiero borrar la peli

            let copiaListaPeliculas = listaPeliculas.filter((itemPelicula)=> itemPelicula.codigo != codigo)
             listaPeliculas = copiaListaPeliculas;

             //actualizar el local storage
             guardarPeliculasEnLocalStorage();
             //acualizar table
              borrarTabla()
              cargarInicial()
             
            //mostar mensaje de opecaion correcta
          Swal.fire(
            'pelicula eliminada',
            'la pelicula selecionada fuer correctamaennte eliminadad',
            'success'
          )
        }
      })


    console.log(codigo)
    //buscar la pelicula en el arreglo y borrarla
    let copiaListaPeliculas = listaPeliculas.filter((itemPelicula)=> itemPelicula.codigo != codigo);
    listaPeliculas = copiaListaPeliculas;
    //actualizar el localstorage
    guardarPeliculasEnLocalStorage();
    //actualizar la tabla
    borrarTabla();
    cargarInicial();
}

function borrarTabla(){
    let tablaPeliculas = document.querySelector('#tablaPeliculas');
    tablaPeliculas.innerHTML = '';
}


window.editarPelicula = function(codigoBuscado){
console.log(codigoBuscado)


//buscar dentro del arreglo que quiero decir
let peliculaBuscada = listaPeliculas.find((pelicula)=>{return pelicula.codigo === codigoBuscado})
console.log(peliculaBuscada)

//mostrar la ventana modal con el formulario cargado con todos los datos de la pelicula que seleciono el usuario

modalAdminPelicula.show();
codigo.value = peliculaBuscada.codigo
titulo.value = peliculaBuscada.titulo;
descripcion.value = peliculaBuscada.descripcion;
imagen.value = peliculaBuscada.imagen;
genero.value = peliculaBuscada.genero;
}

function actualizarPelicula(){
    console.log("actualizarndo Pelicula..")
    //tomar todods los datos cargados del formulario,buscar el objeto que estoy mosatrando en el formulario y actualizaar sus  valores
let posicionPeliBuscada=listaPeliculas.findIndex((pelicula)=>codigo.value === pelicula.codigo)
console.log(posicionPeliBuscada)
//odificar los valores dentro de un arreglo
listaPeliculas[posicionPeliBuscada].titulo = titulo.value;
listaPeliculas[posicionPeliBuscada].titulo = descripcion.value;
listaPeliculas[posicionPeliBuscada].titulo = imagen.value;
listaPeliculas[posicionPeliBuscada].titulo = genero.value;
    //actualizar el local storage
guardarPeliculasEnLocalStorage()
    //actualizar la tabla
borrarTabla();
cargarInicial(); 
    //cerrar la venttana modal


    //limpiar formulario
    limpiarFormulario();
}
