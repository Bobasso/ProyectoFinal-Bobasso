const gridContainer = document.querySelector("#grid-container");
const listProductos = document.querySelector("#list-productos");
const verProducto = document.querySelector("#mostrar-producto");

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
                <p>Precio: U$D${element.precio}</p>
                <button id="ver-mas" value="${element.id}">Ver más</button>
            </div>
            `;
            gridContainer.appendChild(div)
        });
    });

setTimeout(()=>{
    const idProducto = document.querySelectorAll("#ver-mas")
    for (let i = 0; i < idProducto.length; i++) {
        const element = idProducto[i];
        element.addEventListener('click', ()=>{
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
                                <p>Talle: 45us</p>
                                <button>Comprar</button>
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

                    listProductos.classList.add("desaparecer");
                    verProducto.classList.remove("desaparecer");
                });
        });
    };
} ,100);