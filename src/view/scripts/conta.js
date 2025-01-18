window.onload = async function () {
    // Verifica se o token existe
    const token = localStorage.getItem("token");
    console.log("token:", token);

    // Se o token não estiver presente, redireciona para a página de login
    if (!token) {
        window.location.href = "../Login/login.html"; // Redireciona para a página de login
        return; // Impede a execução do restante do código
    }

    // Decodifica o payload do token
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload
    console.log(payload.cpf_cnpj);

    // Realiza a requisição para buscar as informações do usuário
    try {
        const response = await fetch(`http://localhost:3000/users/cpfCnpj/${payload.cpf_cnpj}`, {
            method: "GET",
        });

        const data = await response.json();

        if (response.ok) {
            // Exibe as informações do usuário
            console.log(data)
            mostrarUsuario(data);
        } else {
            // Exibe mensagem de erro se a requisição falhar
            console.log(data.error || "Erro ao buscar o usuário.")
        }
    } catch (error) {
        // Captura e exibe erros de conexão
        console.error("Erro ao buscar usuário, erro ao conectar com servidor:", error);
    }
};


function mostrarUsuario(usuario) {

    const imagem = document.getElementById("pfp");
    const nomeMain = document.getElementById("nome");
    const nome = document.getElementById("resposta-nome");
    const telefone = document.getElementById("resposta-telefone");
    const email = document.getElementById("resposta-email");
    const endereco = document.getElementById("resposta-endereço");
    const cpf = document.getElementById("resposta-cpf");

    console.log(imagem);
    console.log(usuario.fotoPerfil)
    console.log("algo :");
    console.log(usuario.message);
    
        const h2nome = nome.querySelector("h2");
        const h2telefone = telefone.querySelector("h2");
        const h2email = email.querySelector("h2");
        const h2endereco = endereco.querySelector("h2");
        const h2cpf = cpf.querySelector("h2");



    //imagem.src = usuario.fotoPerfil.data || "default-image.jpg";  // Definindo a imagem de perfil
    nomeMain.textContent = usuario.nome || "Nome não disponível";
    h2nome.textContent = usuario.nome || "Nome não disponível";
    h2telefone.textContent = usuario.telefone || "Telefone não disponível";
    h2email.textContent = usuario.email || "Email não disponível";
    h2endereco.textContent = usuario.endereco || "Endereço não disponível";
    h2cpf.textContent = usuario.cpf_cnpj || "CPF não disponível";

    /* if (usuario.fotoPerfil = 0) {
        const fotoPerfilBase64 = `data:image/jpeg;base64,${usuario.fotoPerfil.toString('base64')}`;
        imagem.src = fotoPerfilBase64;  // Exibe a imagem
    }*/

    /*const objetoFoto = usuario.fotoPerfil;
    const ListaBytes = new Uint8Array(objetoFoto.data);
    const blob = new Blob([ListaBytes], { type: 'image/png' });
    const imgURL = URL.createObjectURL(blob);
    imagem.src = imgURL;*/
    if(usuario.fotoPerfil){
    const objetoFoto = usuario.fotoPerfil;
    console.log(objetoFoto)
    console.log(usuario.fotoPerfil)
    const ListaBytes = new Uint8Array(objetoFoto.data);
    const blob = new Blob([ListaBytes], { type: 'image/png' });
    const imgURL = URL.createObjectURL(blob);
    imagem.src = imgURL;
    console.log(imgURL)
    console.log(imagem.src);
    }

    // Permite a edição dos dados ao clicar nos ícones de editar
    document.getElementById("fotoTelefone").addEventListener("click", () => editarCampo("telefone", usuario));
    document.getElementById("fotoEmail").addEventListener("click", () => editarCampo("email", usuario));
    document.getElementById("fotoEndereco").addEventListener("click", () => editarCampo("endereco", usuario));
    document.getElementById("fotoNome").addEventListener("click", () => editarCampo("nome", usuario));
    document.getElementById("fotoCPF").addEventListener("click", () => editarCampo("nome", usuario));


    function editarCampo(campo, usuario) {
        const novoValor = prompt(`Digite o novo ${campo}:`, usuario[campo]);

        if (novoValor && novoValor !== usuario[campo]) {
            // Chama a função para atualizar o campo no backend
            atualizarUsuario(campo, novoValor);
        }
    }

    async function atualizarUsuario(campo, novoValor) {
        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token.split(".")[1]));
        const id = payload.id;

        const body = new FormData(); // FormData para enviar arquivos
        body.append(campo, novoValor); // Adiciona o campo que o usuário alterou

        if (campo === "nome") {
            const nomeMain = document.getElementById("nome");
            nomeMain.textContent = novoValor;
        }
        // Se o campo for fotoPerfil (imagem)
        if (campo === "fotoPerfil") {
            const fotoPerfil = document.getElementById("fotoInput").files[0];
            if (fotoPerfil) {
                body.append("fotoPerfil", fotoPerfil); // Adiciona o arquivo de imagem
            }
        }

        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: body, // Envia o FormData
            });

            const data = await response.json();
            if (response.ok) {
                console.log(`Usuário ${campo} atualizado com sucesso`);
                location.reload();  // Atualiza a página para refletir a alteração
            } else {
                console.log("Erro ao atualizar o usuário:", data.error);
            }
        } catch (error) {
            console.error("Erro ao atualizar o usuário:", error);
        }
    }

}