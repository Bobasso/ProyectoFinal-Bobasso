// Funcion para el formato del MM/YY en el form
function formatExpiryDate(input) {
    // Eliminar todos los caracteres no numéricos
    let value = input.value.replace(/\D/g, '');
    // Limitar la longitud a 4 caracteres
    if (value.length > 4) value = value.slice(0, 4);
    // Formatear el campo en "MM/YY"
    if (value.length >= 3) {
        input.value = value.slice(0, 2) + '/' + value.slice(2);
    } else {
        input.value = value;
    }
}


//Mostrar el listado del carrito
const productosCarrito = document.querySelector(".productos-carrito");
fetch("../data/productos.json")
                .then((resp) => resp.json())
                .then((data) => {
                    let carrito = localStorage.getItem("carrito")
                    carrito = JSON.parse(carrito)
                    carrito.forEach(element => {
                        const productoCarrito = data.find((prod) => prod.id === element.id)
                        if(productoCarrito){
                            const div = document.createElement("div");
                            div.classList.add("tabla-producto")
                            div.innerHTML=`
                                <img src=".${data[element.id].src}" alt="Avatar">
                                <p>${element.nombre}</p>
                                <p>Talle: ${element.talle}</p>
                                <p>U$D ${element.precio}</p>
                            `
                            const btnBorrar = document.createElement("button");
                            btnBorrar.classList.add("btn-borrar")
                            btnBorrar.innerHTML='❌';
                            btnBorrar.addEventListener("click", ()=>{
                                // Eliminar del carrito
                            });

                            div.append(btnBorrar);
                            productosCarrito.append(div);
                        }
                    });
                });