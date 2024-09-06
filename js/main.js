// Chequeo que si existe un nombre guardado en el Local Storage
const personaLocalStorage = localStorage.getItem("persona");
const personaObjeto = JSON.parse(personaLocalStorage);
const headerLogin = document.querySelector("#header-login");

if(personaLocalStorage !== null){
    const h2 = document.createElement("h2")
    h2.className = "header-text"
    h2.innerHTML = `Bienvenido ${personaObjeto.nombre}!`
    const btn = document.createElement("button")
    btn.className = "header-profile"
    btn.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clip-rule="evenodd"/>
</svg>
`   
    btn.addEventListener('click', ()=>{
        window.location.href="./pages/profile.html"
    });
    headerLogin.appendChild(h2)
    headerLogin.appendChild(btn)
}else{
    const div = document.createElement("div")
    div.innerHTML = `
        <button class="log-in" id="log-in" onclick="window.location.href='./pages/login.html'">Log In</button>
        <button class="sign-up" id="sign-up" onclick="window.location.href='./pages/register.html'">Sign Up</button>
    `
    headerLogin.appendChild(div)
}

// Mostrar el carrito en el html
const entrarAlCarrito = document.querySelector(".header-shop")
entrarAlCarrito.addEventListener('click', ()=>{
    if(personaLocalStorage !== null){
        window.location.href="./pages/carrito.html"
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
