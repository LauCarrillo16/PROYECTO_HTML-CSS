document.addEventListener("DOMContentLoaded", function() {

    fetch('servicios.json')
        .then(response => response.json())
        .then(data => {
            const contenedorItems = document.querySelector('.contenedor-items');
            data.forEach(producto => {
                const item = document.createElement('div');
                item.classList.add('item');

                item.innerHTML = `
                    <span class="titulo-item">${producto.titulo}</span>
                    <img src="${producto.imagen}" alt="${producto.titulo}" class="img-item">
                    <p class="cantidadP">${producto.cantidad}</p>
                    <span class="precio-item">${producto.precio}</span>
                    <button class="boton-item">Agregar Al Carrito</button>
                `;

                contenedorItems.appendChild(item);


                const botonAgregar = item.querySelector('.boton-item');
                botonAgregar.addEventListener('click', agregar);
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});


var verCarrito = false;

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", listo);
} else {
    listo();
}

function listo() {
    //BTN Eliminar
    var btnEliminar = document.getElementsByClassName("btn-eliminar");
    for (var i = 0; i < btnEliminar.length; i++) {
        var boton = btnEliminar[i];
        boton.addEventListener("click", eliminar);
    }

    var btnSumar = document.getElementsByClassName("sumar-cantidad");
    for (var i = 0; i < btnSumar.length; i++) {
        var boton = btnSumar[i];
        boton.addEventListener("click", sumar);
    }

    //BTN restar
    var btnRestar = document.getElementsByClassName("restar-cantidad");
    for (var i = 0; i < btnRestar.length; i++) {
        var boton = btnRestar[i];
        boton.addEventListener("click", restar);
    }

    var btnAgregar = document.getElementsByClassName("boton-item");
    for (var i = 0; i < btnAgregar.length; i++) {
        var boton = btnAgregar[i];
        boton.addEventListener("click", agregar);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagar);
    
}

//Eliminar del carrito
function eliminar(event) {
    var enClick = event.target;
    enClick.parentElement.parentElement.remove();

    actualizarTotal();
    ocultar();
}

//Actualizar total del carrito
function actualizarTotal() {
    var contenedorCarrito = document.getElementsByClassName('carrito')[0];
    var itemsCarrito = contenedorCarrito.getElementsByClassName('carrito-item');
    var total = 0;

    for (var i = 0; i < itemsCarrito.length; i++) {
        var item = itemsCarrito[i];
        var precioItem = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = parseFloat(precioItem.innerText.replace('$', '').replace('.', ''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es");
}

function ocultar() {
    var itemsCarrito = document.getElementsByClassName("carrito-items")[0];
    if (itemsCarrito.childElementCount == 0) {
        var carrito = document.getElementsByClassName("carrito")[0];
        carrito.style.marginRight = "-100%";
        carrito.style.opacity = "0";
        verCarrito = false;

        var items = document.getElementsByClassName("contenedor-items")[0];
        items.style.width = "100%";
    }
}

function sumar(suma) {
    var enClick = suma.target;
    var selector = enClick.parentElement;
    var cantidadA = selector.getElementsByClassName("carrito-item-cantidad")[0]
        .value;
    console.log(cantidadA);
    cantidadA++;
    selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadA;

    actualizarTotal();
}

function restar(resta) {
    var enClick = resta.target;
    var selector = enClick.parentElement;
    var cantidadA = selector.getElementsByClassName("carrito-item-cantidad")[0]
        .value;
    console.log(cantidadA);
    cantidadA--;
    if (cantidadA >= 1) {
        selector.getElementsByClassName("carrito-item-cantidad")[0].value =
            cantidadA;

        actualizarTotal();
    }
}

function agregar(agrega) {
    var boton = agrega.target;
    var item = boton.parentElement;
    var titulo = item.getElementsByClassName("titulo-item")[0].innerText;
    var precio = item.getElementsByClassName("precio-item")[0].innerText;
    var imgSRC = item.getElementsByClassName("img-item")[0].src;
    console.log(imgSRC);

    agregaItem(titulo, precio, imgSRC);

    mostrarCarrito();
    actualizarTotal();
}

function agregaItem(titulo, precio, imgSRC) {
    var item = document.createElement("div");
    item.classList.add = "item";
    var carritoItem = document.getElementsByClassName("carrito-items")[0];

    var nombreItem = carritoItem.getElementsByClassName("carrito-item-titulo");
    for (var i = 0; i < nombreItem.length; i++) {
        if (nombreItem[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var contenidoItem = `
    <div class="carrito-item">
        <img src="${imgSRC}" alt="" width="80px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar">
            <i class="fa-solid fa-trash-can"></i>
        </span>
    </div>
    `
    item.innerHTML= contenidoItem;
    carritoItem.append(item);

    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminar);

    var btnSumar = item.getElementsByClassName('sumar-cantidad')[0];
    btnSumar.addEventListener('click', sumar);

    var btnRestar = item.getElementsByClassName('restar-cantidad')[0];
    btnRestar.addEventListener('click', restar);
}

function pagar(){
    alert("Gracias por su compra c:");
    
    var carrito = document.getElementsByClassName("carrito-items")[0];
    while(carrito.hasChildNodes()){
        carrito.removeChild(carrito.firstChild);
    }
    actualizarTotal();

    ocultar();
}

function mostrarCarrito(muestra){
    verCarrito = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';

}