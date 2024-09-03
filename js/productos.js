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
                                <p>Talle</p>
                                <div class="talles-zapatillas">
                                    <p class="talle">38</p>
                                    <p class="talle">39</p>
                                    <p class="talle">40</p>
                                    <p class="talle">41</p>
                                    <p class="talle">42</p>
                                    <p class="talle">43</p>
                                </div>
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

                    const talles = document.querySelectorAll(".talle")

                    function removerColorFondo(){
                        talles.forEach(item => {
                            item.classList.remove('cambiarColor');
                        });
                    };

                    talles.forEach(item => {
                        item.addEventListener('click', () => {
                            removerColorFondo();
                            item.classList.add('cambiarColor');
                        });
                    });
                    listProductos.classList.add("desaparecer");
                    verProducto.classList.remove("desaparecer");
                });
        });
    };
} ,100);