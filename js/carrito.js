// Para que se el icono del perfil funcione bien
const perfil = document.querySelector(".header-profile")
perfil.addEventListener("click", ()=>{
    window.location.href="profile.html"
});

// Variable monto total que inice en 0
let total = 0

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
fetch("https://raw.githubusercontent.com/Bobasso/ProyectoFinal-Bobasso/main/data/productos.json")
                .then((resp) => resp.json())
                .then((data) => {
                    mostrarCarrito(data)
                });

// Mostrar el precio total del carrito
fetch("https://raw.githubusercontent.com/Bobasso/ProyectoFinal-Bobasso/main/data/productos.json")
                .then((resp) => resp.json())
                .then((data) => {
                    let carrito = localStorage.getItem("carrito")
                    carrito = JSON.parse(carrito)
                    if(carrito.length !== 0){
                        carrito.forEach(element => {
                            total += parseInt(element.precio)
                        })
                        const p = document.createElement("p")
                        p.classList.add("monto-total")
                        p.id="vaciar"
                        p.innerHTML=`Total: U$D ${total}`
                        productosCarrito.append(p)
                    }
                });

// Vaciar el carrito
const vaciarCarrito = document.querySelector(".empty-cart");
vaciarCarrito.addEventListener("click", ()=>{
    Swal.fire({
        icon: "question",
        title: "Vas a borrar todos los productos agregados, ¿Estas seguro?",
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: "Si, lo quiero vaciar",
        denyButtonText: "No",
    }).then((result) => {
        if(result.isConfirmed){
            let carrito = localStorage.getItem("carrito")
            carrito = JSON.parse(carrito)
            carrito.length=0
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }
    });
});

//Realizar compra
const realizarCompra = document.querySelector("#form-compra")
realizarCompra.addEventListener("submit", (e)=>{
    e.preventDefault() // Evita el envío del formulario de forma tradicional
    let carrito = localStorage.getItem("carrito")
    carrito = JSON.parse(carrito)
    if(carrito.length == 0){
        Swal.fire({
            icon: "error",
            title: "No tenes ningun producto en el carrito",
        })
    }else{
        Swal.fire({
            icon: "success",
            title: "Compra realizada con éxito! Tus pedidos llegarán pronto",
        }).then(()=>{
            realizarCompra.reset();
            let carrito = localStorage.getItem("carrito")
            carrito = JSON.parse(carrito)
            carrito.length=0
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        });
    }
});

// Funcion para mostrar el carrito
function mostrarCarrito(data){
    let carrito = localStorage.getItem("carrito")
    carrito = JSON.parse(carrito)
    if(carrito.length == 0){
        const borrarProducto = document.querySelectorAll("#vaciar");
        borrarProducto.forEach(element => {
            element.remove();
        });

        const div = document.createElement("div");
        div.innerHTML=`
        <p>No tenes productos agregados al carrito</p>
        <p><a href="../index.html">Ver productos</a></p>
        `
        productosCarrito.append(div);
    }else{
        carrito.forEach(element => {
            const productoCarrito = data.find((prod) => prod.id === element.id)
            if(productoCarrito){
                const div = document.createElement("div");
                div.classList.add("tabla-producto")
                div.id="vaciar"
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
                    const index = carrito.find(item => item.id === element.id);
                    if(index !== null){
                        carrito.splice(index, 1);
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                        if(carrito.length > 0){
                            div.remove();
                            total -= parseInt(index.precio);
                            const totalModificado = document.querySelector(".monto-total")
                            totalModificado.innerHTML=`Total: U$D ${total}`
                        }else{
                            let carrito = localStorage.getItem("carrito")
                            carrito = JSON.parse(carrito)
                            carrito.length=0
                            localStorage.setItem("carrito", JSON.stringify(carrito));
                            mostrarCarrito();
                        }
                    }
                });

                div.append(btnBorrar);
                productosCarrito.append(div);
            }
        });
    };
}