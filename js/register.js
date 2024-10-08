const personaLocalStorage = localStorage.getItem("persona");

if(personaLocalStorage !== null){
    window.location.href="../index.html"
    // Si la persona ya ingreso pero quiere ingresar a register.html por la web, no lo deja
}else{
    // Pido usuario del formulario
    const nombreUser = document.querySelector("#username") // ID user
    const emailUser = document.querySelector("#email") // ID email
    const nombreCompleto = document.querySelector("#fullname") // ID nombre completo
    const formRegister = document.querySelector("#form-register") // ID del formulario del register
    const password = document.querySelector("#password") // ID contraseña
    const copyPassword = document.querySelector("#copy-password") // ID para confirmar la contraseña

    formRegister.addEventListener('submit', (e)=>{
        e.preventDefault() // Evita el envío del formulario de forma tradicional 
        confirmarContraseña();
    });

    function confirmarContraseña(){
        if(password.value === copyPassword.value){
            let persona = {};
            persona.nombre = (nombreUser.value).trim();
            persona.email = (emailUser.value);
            persona.nombreCompleto = (nombreCompleto.value).trim(); 
            localStorage.setItem("persona", JSON.stringify(persona));
            
            let carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));

            Swal.fire({
                icon: "success",
                title: "Te registraste con éxito",
                showConfirmButton: false,
                showCloseButton: false,
                timer: 3000
            }).then(()=>{
                formRegister.reset();
                window.location.href="../index.html"
            });
        }else{
            Swal.fire({
                icon: "error",
                title: "Las contraseñas deben ser iguales",
                showConfirmButton: false,
                showCloseButton: false,
                timer: 2000
            });
            password.value = ""
            copyPassword.value = ""
            password.focus();
        };
    };
};