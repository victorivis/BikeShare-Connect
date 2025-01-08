async function receberUsuarios() {
    try{
        const resposta = await fetch("http://localhost:3000/users", {
            method: "GET",
        });
        const usuarios = await resposta.json();
        
        console.log("usuarios");
        console.log(usuarios);

        const destino = document.getElementById("UsuarioDono");
        for(let i=0; i<usuarios.length; i++){
            const novaOpcao = document.createElement("option");
            novaOpcao.value = usuarios[i].id;
            novaOpcao.textContent = `${usuarios[i].nome} - ${usuarios[i].cpf_cnpj}`;
            destino.appendChild(novaOpcao);
        }        
    }
    catch(erro){
        alert("Falha ao tentar comunicação com o servidor");
    }
}

async function receberEstacoes() {
    try{
        const resposta = await fetch("http://localhost:3000/estacao", {
            method: "GET",
        });
        const estacoes = await resposta.json();
        
        const destino = document.getElementById("ID_Estacao");
        for(let i=0; i<estacoes.message.length; i++){
            const novaOpcao = document.createElement("option");
            novaOpcao.value = estacoes.message[i].id;
            novaOpcao.textContent = `${estacoes.message[i].nome} - ${estacoes.message[i].id}`;
            destino.appendChild(novaOpcao);
        }
    }
    catch(erro){
        alert("Falha ao tentar comunicação com o servidor");
    }
}

async function receberBicicletas() {
    const divCards = document.getElementById("listaBicicletas");
    while (divCards.firstChild) {
        divCards.removeChild(divCards.firstChild);
    }
    
    try{
        const resposta = await fetch("http://localhost:3000/bicicleta", {
            method: "GET",
        });
        const dados = await resposta.json();
        
        for(let i=0; i<dados.message.length; i++){
            console.log(dados.message[i].disponivel);

            const status = "Status: " + (dados.message[i].disponivel ? "Disponivel" : "Indisponivel") + "\n";
            const estacaoAtual = `Estacao: ${dados.message[i].ID_EstacaoAtual}\n`;
            const dono = `Dono: ${dados.message[i].ID_UsuarioDono}\n`;
            const textoDescricao = status + estacaoAtual + dono;

            //console.log(dados.message[i]);
            //console.log(textoDescricao);

            //Inserir card de estacao
            const card = document.createElement('div');
            card.className = "card";

            const foto = document.createElement('img');
            if(dados.message[i].foto){
                //Bruxaria para ler imagem
                const objetoFoto = dados.message[i].foto;
                const ListaBytes = new Uint8Array(objetoFoto.data);
                const blob = new Blob([ListaBytes], { type: 'image/png' });
                const imgURL = URL.createObjectURL(blob);

                
                foto.src = imgURL;
            }
            card.appendChild(foto);

            const conteudo = document.createElement('div');

            const titulo = document.createElement('h2');
            titulo.className = "card-title";
            titulo.textContent = `Bicicleta - ${dados.message[i].id}`;
            conteudo.appendChild(titulo);

            const descricao = document.createElement("p");
            descricao.className = "card-description";
            descricao.textContent = textoDescricao;
            descricao.style = "white-space: pre-line;";
            conteudo.appendChild(descricao);

            card.appendChild(conteudo);

            const destino = document.getElementById("listaBicicletas");
            destino.appendChild(card);
        }
    }
    catch(erro){
        alert("Falha ao tentar comunicação com o servidor");
    }
}

async function cadastrarBicicleta() {   
    const inputFoto = document.getElementById("foto");
    const inputUsuario = document.getElementById("UsuarioDono");
    const inputEstacao = document.getElementById("ID_Estacao");

    const formulario = new FormData();
    
    formulario.append('foto', inputFoto.files[0]);
    formulario.append('ID_UsuarioDono', inputUsuario.value);
    formulario.append('ID_EstacaoAtual', inputEstacao.value);

    console.log(formulario.keys());
    console.log(formulario.getAll('ID_UsuarioDono'));
    console.log(formulario.getAll('ID_EstacaoAtual'));

    try{
        await fetch('http://localhost:3000/bicicleta', {
            method: 'POST',
            body: formulario
        })
        .then(async response => {
            console.log(response);
            if(response.ok){
                alert("Estacao criada");

                inputFoto.value = '';
                inputUsuario.value = '';
                inputEstacao.value = '';

                await receberBicicletas();
            }
            else{
                alert("Deu ruim");
            }
        });


    }
    catch(erro){
        alert("Falha ao tentar comunicação com o servidor");
    }
}

const botao = document.getElementById("cadastrar");
botao.addEventListener("click", cadastrarBicicleta);

async function receberDados(){
    await receberUsuarios();
    await receberEstacoes();
    await receberBicicletas();
}

receberDados();