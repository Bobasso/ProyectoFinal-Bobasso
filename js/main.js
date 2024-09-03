// Chequeo que si existe un nombre guardado en el Local Storage
const personaLocalStorage = localStorage.getItem("persona");
const personaObjeto = JSON.parse(personaLocalStorage);
const headerLogin = document.querySelector("#header-login");

if(personaLocalStorage !== null){
    const h2 = document.createElement("h2")
    h2.className = "header-text"
    h2.innerHTML = `Bienvenido ${personaObjeto.nombre}!`
    headerLogin.appendChild(h2)
}else{
    const div = document.createElement("div")
    div.innerHTML = `
        <button class="log-in" id="log-in" onclick="window.location.href='./pages/login.html'">Log In</button>
        <button class="sign-up" id="sign-up" onclick="window.location.href='./pages/register.html'">Sign Up</button>
    `
    headerLogin.appendChild(div)
}