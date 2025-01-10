document.addEventListener("DOMContentLoaded", () => {   
    document.getElementById("userForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o reload da página

    // Obtém os valores dos campos
    const tipo = document.getElementById("tipo").value;
    const cpf_cnpj = document.getElementById("cpf_cnpj").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Monta o corpo da requisição
    const data = {
        tipo,
      cpf_cnpj,
      nome,
      email,
      senha
    };

    try {
      // Faz a requisição para o servidor
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Verifica o status da resposta
      if (response.ok) {
        document.getElementById("message").textContent = "Usuário cadastrado com sucesso!";
        document.getElementById("userForm").reset();
        console.log("Usuário cadastrado");
        // Redireciona o usuário para login.html
            window.location.href = "login.html";
      } else {
        document.getElementById("message").textContent = result.error || "Erro ao cadastrar usuário.";
        console.log("erro no cadastro")
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      document.getElementById("message").textContent = "Erro ao se conectar ao servidor.";
      console.log("erro na conexao com servidor")
    }
  });
});