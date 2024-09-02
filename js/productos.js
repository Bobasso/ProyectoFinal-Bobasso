let gridContainer = document.querySelector("#grid-container")

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
                <button type="submit">Ver más</button>
            </div>
            `;

            gridContainer.appendChild(div)
        });
    })