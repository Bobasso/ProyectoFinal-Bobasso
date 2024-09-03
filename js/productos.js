const gridContainer = document.querySelector("#grid-container");
const listProductos = document.querySelector("#list-productos");
const verProducto = document.querySelector("#mostrar-producto");

// Mostrar todos los productos en el index
fetch("../data/productos.json")
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach(element => {
            const div = document.createElement("div");
            div.className = "card"
            div.id = element.id
            div.innerHTML=`
            <img src="${element.src}" alt="Avatar">
            <div class="card-container">
                <h4><b>"${element.nombre}"</b></h4>
                <button id="ver-mas" value="${element.id}">Ver más</button>
            </div>
            `;
            gridContainer.appendChild(div)
        });
    });

// Pongo un poco de delay para que tome el querySelectorAll y poder así mostrar el producto elegido. Todo esto en una landing page
setTimeout(()=>{
    const idProducto = document.querySelectorAll("#ver-mas")
    for (let i = 0; i < idProducto.length; i++) {
        const element = idProducto[i];
        element.addEventListener('click', ()=>{
            // Si no esta logueado, no va a poder ver los productos
            if(personaLocalStorage !== null){
                fetch("../data/productos.json")
                .then((resp) => resp.json())
                .then((data) => {
                    const div = document.createElement("div");
                    div.innerHTML=`
                        <div class="product-container">
                            <div class="product-image">
                                <img src="${data[i].src}" alt="Producto">
                            </div>
                            <div class="product-details">
                                <h1>${data[i].nombre}</h1>
                                <p>Precio: U$D${data[i].precio}</p>
                                <p>Talle</p>
                                <div class="talles-zapatillas">
                                    <p class="talle">38</p>
                                    <p class="talle">39</p>
                                    <p class="talle">40</p>
                                    <p class="talle">41</p>
                                    <p class="talle">42</p>
                                    <p class="talle">43</p>
                                </div>
                                <button id="btn-comprar">Comprar</button>
                            </div>
                        </div>
                    `
                    const btnVolver = document.createElement("button");
                    btnVolver.className = "back-button";
                    btnVolver.innerHTML = "<"
                    btnVolver.addEventListener('click', ()=>{
                        verProducto.innerHTML = ""
                        listProductos.classList.remove("desaparecer");
                        verProducto.classList.add("desaparecer");
                    });
                    div.append(btnVolver)
                    verProducto.appendChild(div);

                    const talles = document.querySelectorAll(".talle")
                    function removerColorFondo(){
                        talles.forEach(item => {
                            item.classList.remove('cambiar-color');
                        });
                    };
                    talles.forEach(item => {
                        item.addEventListener('click', () => {
                            removerColorFondo();
                            item.classList.add('cambiar-color');
                        });
                    });

                    const productoAgregar = document.querySelector("#btn-comprar");
                    productoAgregar.addEventListener('click', ()=>{
                        const talleElegido = document.querySelector(".cambiar-color")
                        let producto = {}
                        producto.id = data[i].id
                        producto.nombre = data[i].nombre
                        producto.precio = parseInt(data[i].precio)
                        producto.talle = talleElegido.innerHTML
                        
                        let carrito = localStorage.getItem("carrito")
                        carrito = JSON.parse(carrito)
                        carrito.push(producto)
                        localStorage.setItem('carrito', JSON.stringify(carrito));
                    });

                    listProductos.classList.add("desaparecer");
                    verProducto.classList.remove("desaparecer");
                });
            }else{
                Swal.fire({
                    icon: "question",
                    title: "Para poder comprar tenes que registrarte",
                    showConfirmButton: true,
                    showDenyButton: true,
                    confirmButtonText: "Me quiero registrar",
                    denyButtonText: "Sigo viendo",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = "../pages/register.html"
                    }
                });
            }
        });
    };
} ,100);