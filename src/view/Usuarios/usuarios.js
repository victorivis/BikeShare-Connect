window.onload = function() {
    const token = localStorage.getItem("token");
    console.log("token:", token);

    // Se o token não estiver presente, redireciona para a página de login
    if (!token) {
        window.location.href = "login.html"; // Redireciona para a página de login
    }
};

async function buscarUsuario() {
    const userId = document.getElementById("userId").value;
    const token = localStorage.getItem("token");

    // Verifica se o token existe
    if (!token) {
        document.getElementById("error-message").textContent = "Você não está autenticado.";
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            // Verifica se o usuário é do tipo "comum"
            if (data.tipo !== "Comum") {
                document.getElementById("error-message").textContent = "Acesso negado. Usuário não é comum.";
                return;
            }

            // Exibe as informações do usuário
            mostrarUsuario(data);
        } else {
            document.getElementById("error-message").textContent = data.error || "Erro ao buscar o usuário.";
        }
    } catch (error) {
        document.getElementById("error-message").textContent = "Erro ao se conectar ao servidor.";
        console.error("Erro ao buscar usuário:", error);
    }
}

function mostrarUsuario(usuario) {
    const usuarioInfoDiv = document.getElementById("usuario-info");
    
    // Limpa a área antes de mostrar os novos dados
    usuarioInfoDiv.innerHTML = `
        <h2>Informações do Usuário</h2>
        <p><strong>ID:</strong> ${usuario.id}</p>
        <p><strong>Nome:</strong> ${usuario.nome}</p>
        <p><strong>CPF/CNPJ:</strong> ${usuario.cpf_cnpj}</p>
        <p><strong>Telefone:</strong> ${usuario.telefone}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Endereço:</strong> ${usuario.endereco}</p>
        <p><strong>Tipo:</strong> ${usuario.tipo}</p>
    `;
}
