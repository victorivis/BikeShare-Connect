document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    // Obtém os valores dos campos
    const cpf_cnpj = document.getElementById("cpf_cnpj").value;
    const senha = document.getElementById("password").value;

    // Log para depuração
    console.log("CPF/CNPJ:", cpf_cnpj);
    console.log("Senha:", senha);

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST", // Método POST
            headers: {
                "Content-Type": "application/json", // Envia o conteúdo como JSON
            },
            body: JSON.stringify({ cpf_cnpj, senha }), // Envia cpf_cnpj e senha no corpo da requisição
        });

        const result = await response.json(); // Converte a resposta para JSON

        if (response.ok) {
            // Exibe mensagem de sucesso
            document.getElementById("loginMessage").textContent = "Login realizado com sucesso!";
            console.log("Usuário logado:", result.user); // Log do usuário logado

            // Redireciona o usuário para lobby.html
            window.location.href = "lobby.html";
        } else {
            // Exibe mensagem de erro vinda do servidor ou uma padrão
            document.getElementById("loginMessage").textContent = result.error || "Erro ao realizar login.";
        }
    } catch (error) {
        console.error("Erro ao se conectar ao servidor:", error);
        document.getElementById("loginMessage").textContent = "Erro ao se conectar ao servidor.";
    }
});
