window.onload = function() {
    const token = localStorage.getItem("token");
    console.log("token:", token);
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload
console.log(payload.tipo); 

    // Se o token não estiver presente, redireciona para a página de login
    if (payload.tipo !== "Administrador de Bicicletas") {
        window.location.href = "lobby.html"; // Redireciona para a página de login
    }
    if (payload.tipo === "Comum") {
    console.log("Usuario Comum")
    } else {
        console.log("outro tipo de usuario")
        
    }
};