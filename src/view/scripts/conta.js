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
        alert("Erro ao se conectar com o banco de dados.")
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
    document.getElementById("editarFoto").addEventListener("click", editarFoto);

    async function editarFoto(){
        Swal.fire({
            title: 'Selecione sua foto de perfil',
            input: 'file',
            inputAttributes: {
              'accept': 'image/*',
              'aria-label': 'Selecione sua foto de perfil'
            },
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            preConfirm: (file) => {
              return new Promise((resolve, reject) => {
                if (!file) {
                  Swal.showValidationMessage('Você precisa selecionar um arquivo')
                  reject();
                } else {
                  resolve(file);
                }
              });
            }
          }).then(async (result) => {
            if (result.isConfirmed) {
                const arquivo = result.value;
                
                try {
                    await atualizarUsuario("fotoPerfil", arquivo);
                    Swal.fire({
                        icon: 'success',
                        title: 'Foto atualizada!',
                        text: 'Sua foto de perfil foi atualizada com sucesso.'
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: `Não foi possível atualizar sua foto de perfil. Detalhes: ${error.message || 'Erro desconhecido'}`,
                    });
                }
            }
        });
    }

    async function editarCampo(campo, usuario) {
        const novoValor = prompt(`Digite o novo ${campo}:`, usuario[campo]);

        if (novoValor && novoValor !== usuario[campo]) {
            // Chama a função para atualizar o campo no backend
            await atualizarUsuario(campo, novoValor);
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
                throw new Error(data.error || "Erro desconhecido ao atualizar o usuário");
            }
        } catch (error) {
            console.error("Erro ao atualizar o usuário:", error);
            throw error; // Lança o erro para que o Swal capture
        }
    }

}