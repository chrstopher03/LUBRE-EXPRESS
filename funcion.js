const productos = [


{
id:1,
nombre:'Mobil Parmazone',
descripcion:'Mobil Permazone 50/50 Prediluted Coolant/Antifreeze es un refrigerante y anticongelante listo para usar, formulado para proteger el sistema de enfriamiento de motores de vehículos tanto a gasolina como diésel.',
categoria:'motor',
imagen:['6.jpeg']
},

{
id:2,
nombre:'Mobil Heavy Duty',
descripcion:'Mobil Heavy Duty SCA Precharged 50/50 Prediluted Coolant/Antifreeze es un refrigerante y anticongelante de servicio pesado listo para usar, diseñado especialmente para proteger motores de combustible diésel de alta exigencia (camiones, maquinaria y equipos pesados).',
categoria:'grasa',
imagen:['7.jpeg']
},

{
id:3,
nombre:'Mobil ATF D/M',
descripcion:'Mobil ATF D/M es un fluido para transmisiones automáticas especialmente formulado para vehículos de pasajeros y camiones ligeros que requieren especificaciones Dexron III (GM) o Mercon (Ford), siendo compatible con motores que utilizan combustible tanto de gasolina como diésel.',
categoria:'hidraulico',
imagen:['502.png']
},

{
id:4,
nombre:'American Automatic transmission',
description:'American Motor Oil Automatic Transmission Fluid (AMO ATF) es un fluido para transmisiones automáticas diseñado para ofrecer un rendimiento excepcional y protección contra la fricción en todas las marcas de transmisiones automáticas, siendo compatible con vehículos de gasolina y diésel.',
category:'motor',
imagen:['11.jpeg']
},


{
id:5,
nombre:'Mobil Delvac Extreme SAE 15W-40 API CK-4.',
description:'Mobil Delvac Extreme SAE 15W-40 API CK-4 es un aceite de motor sintético de alto rendimiento (Heavy Duty) especialmente formulado para vehículos de carga pesada, maquinaria y equipos de combustible diésel.',
category:'motor',
imagen:['12.jpeg']
},

{
id:5,
nombre:'Mobil Delvac Extreme SAE 10W-30 API CK-4  ',
description:'Mobil Delvac Extreme SAE 10W-30 API CK-4 es un aceite de motor sintético de alto rendimiento (Heavy Duty) especialmente formulado para vehículos de carga pesada, maquinaria y equipos de combustible diésel.',
category:'motor',
imagen:['60.jpeg']
},


];
const contenedor =
document.getElementById("productos");

const buscador =
document.getElementById("buscador");

const categoria =
document.getElementById("categoria");

let productoActual = null;

/* MOSTRAR PRODUCTOS */

function renderProductos(lista){

if(!contenedor) return;

contenedor.innerHTML = "";

lista.forEach(producto=>{

contenedor.innerHTML += `

<div class="card">

<img src="${producto.imagen}" alt="${producto.nombre}">

<div class="card-body">

<h3>${producto.nombre}</h3>

<p>${producto.descripcion}</p>

<button onclick="abrirModal(${producto.id})">
Ver Producto
</button>

</div>

</div>

`;

});

}

renderProductos(productos);

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("activo");
});
/* CATEGORIAS */

const categoriaGuardada =
localStorage.getItem(
"categoriaSeleccionada"
);

if(categoriaGuardada && categoria){

categoria.value =
categoriaGuardada;

filtrar();

localStorage.removeItem(
"categoriaSeleccionada"
);

}

/* BUSCADOR */

if(buscador){

buscador.addEventListener(
"input",
filtrar
);

}

if(categoria){

categoria.addEventListener(
"change",
filtrar
);

}

function filtrar(){

const texto =
buscador ?
buscador.value.toLowerCase()
: "";

const cat =
categoria ?
categoria.value
: "todos";

const resultado =
productos.filter(producto=>{

const coincideTexto =

producto.nombre
.toLowerCase()
.includes(texto)

||

producto.descripcion
.toLowerCase()
.includes(texto);

const coincideCategoria =

cat === "todos"

||

producto.categoria === cat;

return coincideTexto &&
coincideCategoria;

});

renderProductos(resultado);

}

/* MODAL */

function abrirModal(id){

productoActual =
productos.find(
p => p.id === id
);

document.getElementById(
"modalImage"
).src =
productoActual.imagen;

document.getElementById(
"modalNombre"
).textContent =
productoActual.nombre;

document.getElementById(
"modalDescripcion"
).textContent =
productoActual.descripcion;

document.getElementById(
"cantidad"
).value = 1;

document.getElementById(
"modal"
).style.display =
"flex";

}

function cerrarModal(){

document.getElementById(
"modal"
).style.display =
"none";

}

/* CANTIDAD */

function sumarCantidad(){

const input =
document.getElementById(
"cantidad"
);

input.value =
parseInt(input.value) + 1;

}

function restarCantidad(){

const input =
document.getElementById(
"cantidad"
);

if(
parseInt(input.value) > 1
){

input.value =
parseInt(input.value) - 1;

}

}

/* AGREGAR AL CARRITO */

function agregarCarrito(){

if(!productoActual) return;

const cantidad =
parseInt(
document.getElementById(
"cantidad"
).value
);

let carrito =
JSON.parse(
localStorage.getItem(
"carrito"
)
) || [];

const existe =
carrito.find(
item =>
item.id === productoActual.id
);

if(existe){

existe.cantidad += cantidad;

}else{

carrito.push({

id: productoActual.id,
nombre: productoActual.nombre,
descripcion: productoActual.descripcion,
imagen: productoActual.imagen,
categoria: productoActual.categoria,
cantidad: cantidad

});

}

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);

actualizarContador();

cerrarModal();

Swal.fire({
icon:"success",
title:"Producto agregado",
text:productoActual.nombre,
showConfirmButton:false,
timer:1500
});

}

/* CONTADOR */

function actualizarContador(){

let carrito =
JSON.parse(
localStorage.getItem(
"carrito"
)
) || [];

let total = 0;

carrito.forEach(item=>{

total +=
Number(item.cantidad);

});

const badge =
document.getElementById(
"cartCount"
);

if(badge){

badge.textContent =
total;

badge.style.display =
total > 0
? "flex"
: "none";

}

}

actualizarContador();

/* CERRAR MODAL */

window.onclick =
function(e){

const modal =
document.getElementById(
"modal"
);

if(e.target === modal){

cerrarModal();

}

};

/* ENVIAR PEDIDO */

function enviarPedidoWhatsApp(){

let carrito =
JSON.parse(
localStorage.getItem(
"carrito"
)
) || [];

if(carrito.length === 0){

Swal.fire({
icon:"warning",
title:"Carrito vacío",
text:"Agrega productos antes de enviar el pedido"
});

return;

}

let mensaje =
"*PEDIDO LUBRI EXPRES*%0A%0A";

let total = 0;

carrito.forEach(item=>{

mensaje +=
"• " +
item.nombre +
" x " +
item.cantidad +
"%0A";

total +=
Number(item.cantidad);

});

mensaje +=
"%0A📦 Total productos: " +
total +
"%0A%0ACliente interesado en realizar pedido.";

Swal.fire({
icon:"success",
title:"Abriendo WhatsApp",
text:"Redirigiendo tu pedido...",
showConfirmButton:false,
timer:1200
});

setTimeout(()=>{

window.open(
"https://wa.me/50584187053?text=" +
mensaje,
"_blank"
);

},1200);

}
