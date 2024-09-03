const personaLocalStorage = localStorage.getItem("persona");
const personaObjeto = JSON.parse(personaLocalStorage);
const mostrarPerfil = document.querySelector("#mostrar-perfil");

if(personaLocalStorage !== null){
    const div = document.createElement("div");
    div.className = "profile-container"
    div.innerHTML = `
        <h1>Información del Perfil</h1>
        <p><strong>Nombre:</strong> ${personaObjeto.nombreCompleto}</p>
        <p><strong>Email:</strong> ${personaObjeto.email}</p>
        <p><strong>Nombre de Usuario:</strong> ${personaObjeto.nombre}</p>
    `
    const div2 = document.createElement("div");
    div2.className = "flex-btn"
    const btn = document.createElement("button")
    btn.innerHTML = "Cerrar Sesión"
    btn.addEventListener('click', ()=>{
        localStorage.removeItem("persona");
        Swal.fire({
            icon: "success",
            title: "Cerraste sesión con éxito!",
            showConfirmButton: false,
            showCloseButton: false,
            timer: 3000
        }).then(()=>{
            window.location.href = "../index.html"
        });  
    });
    div2.append(btn)
    const p = document.createElement("p")
    p.innerHTML = `<a href="../index.html" class="edit-link">Volver al Inicio</a>`
    div2.append(p)

    div.appendChild(div2)
    mostrarPerfil.append(div)
}else{
    window.location.href = "../index.html"
};