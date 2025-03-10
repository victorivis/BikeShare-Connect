const token = localStorage.getItem("token");

async function confirmarOperacao(codigoCorreto, palavraValidar) {
    const codigoParaMostrar = codigoCorreto;
    
    return Swal.fire({
        title: 'Confirmar deleção',
        html: `Digite o ID abaixo para confirmar:<br><span style="font-size: 20px; color: #000000; font-weight: bold;">${palavraValidar}</span>`,
        input: 'text',
        inputPlaceholder: 'Digite o código',
        showCancelButton: true,
        confirmButtonText: 'Deletar',
        cancelButtonText: 'Cancelar',
        preConfirm: (codigoDigitado) => {
            if (codigoDigitado != palavraValidar) {
                Swal.showValidationMessage('Código incorreto');
                return false;
            }
            return true;
        }
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            return true;
        } else {
            return false; 
        }
    });
}

async function deletarBicicleta(id){

    try{
        const resposta = await fetch(`http://localhost:3000/bike/${id}`, {
            headers: {"Authorization": "Bearer " + token},
            method: "DELETE",
        });

        if (!resposta.ok) {
            const mensagem = `Erro: ${resposta.status} - ${resposta.statusText}`;
            alert(`Falha ao deletar a estação. ${mensagem}`);
            return;
        }
    }
    catch(erro){
        alert("Deu algum erro");
    }
}

function criadorDeletar(id, validador) {
    return async ()=>{
        const confimado = await confirmarOperacao(id, validador);

        if(confimado == true){
            await deletarBicicleta(id);
            await receberBicicletas();
        }
    }
}

async function receberUsuarios() {
    try{
        const resposta = await fetch("http://localhost:3000/users", {
            headers: {"Authorization": "Bearer " + token},
            method: "GET",
        });
        const usuarios = await resposta.json();
        
        console.log("usuarios");
        console.log(usuarios);

        const destino = document.getElementById("UsuarioDono");
        for(let i=0; i<usuarios.length; i++){
            const novaOpcao = document.createElement("option");
            novaOpcao.value = usuarios[i]._id;
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
        const resposta = await fetch("http://localhost:3000/station", {
            headers: {"Authorization": "Bearer " + token},
            method: "GET",
        });
        const estacoes = await resposta.json();
        
        const destino = document.getElementById("ID_Estacao");
        for(let i=0; i<estacoes.length; i++){
            const novaOpcao = document.createElement("option");
            novaOpcao.value = estacoes[i]._id;
            novaOpcao.textContent = `${estacoes[i].nome} - ${estacoes[i]._id}`;
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
        const resposta = await fetch("http://localhost:3000/bike", {
            headers: {"Authorization": "Bearer " + token},
            method: "GET",
        });
        const dados = await resposta.json();
        
        for(let i=0; i<dados.length; i++){
            const textoDescricao = !dados[i].descricao ? "Sem descrição" : dados[i].descricao;

            //Inserir card de estacao
            const card = document.createElement('div');
            card.className = "card";

            const foto = document.createElement('img');
            if(dados[i].foto){
                //Bruxaria para ler imagem
                const objetoFoto = dados[i].foto;
                const ListaBytes = new Uint8Array(objetoFoto.data);
                const blob = new Blob([ListaBytes], { type: 'image/png' });
                const imgURL = URL.createObjectURL(blob);

                
                foto.src = imgURL;
            }
            card.appendChild(foto);

            const conteudo = document.createElement('div');
            conteudo.className = "card-content"

            const titulo = document.createElement('h2');
            titulo.className = "card-title";
            titulo.textContent = `Bike #${i+1}`;
            conteudo.appendChild(titulo);

            const descricao = document.createElement("p");
            descricao.className = "card-description";
            descricao.textContent = textoDescricao;
            descricao.style = "white-space: pre-line;";
            conteudo.appendChild(descricao);

            if(dados[i].ID_EstacaoAtual){

                let station;
                try{
                    const stationResponse = await fetch(`http://localhost:3000/station/${dados[i].ID_EstacaoAtual}`, {
                        headers: {"Authorization": "Bearer " + token},
                        method: "GET",
                    });
                    station = await stationResponse.json();
                }
                catch(erro){
                    alert("Erro ao tentar buscar estacao");
                }
                        
            
                const nomeEstacao = station.nome;

                const estacao = document.createElement("p");
                estacao.className = "card-station";
                const iconeEstacao=document.createElement("img");
                iconeEstacao.src = "../assets/locationIcon.png";
                const textoEstacao = document.createTextNode(`Estação ${nomeEstacao}`);
                estacao.appendChild(iconeEstacao);
                estacao.appendChild(textoEstacao);
                conteudo.appendChild(estacao);

                if(window.ehADM){
                    const botao = document.createElement("button");
                    botao.id="button-trash"
                    const imagemBotao = document.createElement("img");
                    imagemBotao.src = "../assets/trash.png";
                    imagemBotao.id = "trash";
                    botao.appendChild(imagemBotao);
                    botao.onclick=criadorDeletar(dados[i]._id, i+1);
                    estacao.appendChild(botao);
                }
            }
            else{
                const indisponivel = document.createElement("p");
                indisponivel.className = "card-station";
                indisponivel.textContent = "Indisponível";
                conteudo.appendChild(indisponivel);

                if(window.ehADM){
                    const botao = document.createElement("button");
                    botao.id="button-trash"
                    const imagemBotao = document.createElement("img");
                    imagemBotao.src = "../assets/trash.png";
                    imagemBotao.id = "trash";
                    botao.appendChild(imagemBotao);
                    botao.onclick=criadorDeletar(dados[i]._id, i+1);
                    indisponivel.appendChild(botao);
                }
            }

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
    const inputDescricao = document.getElementById("descricao");

    const formulario = new FormData();
    
    formulario.append('foto', inputFoto.files[0]);
    formulario.append('ID_UsuarioDono', inputUsuario.value);
    formulario.append('ID_EstacaoAtual', inputEstacao.value);
    formulario.append('descricao', inputDescricao.value);

    console.log(formulario.keys());
    console.log(formulario.getAll('ID_UsuarioDono'));
    console.log(formulario.getAll('ID_EstacaoAtual'));

    try{
        await fetch('http://localhost:3000/bike', {
            headers: {"Authorization": "Bearer " + token},
            method: 'POST',
            body: formulario
        })
        .then(async response => {
            console.log(response);
            if(response.ok){
                alert("Bicicleta criada");

                inputFoto.value = '';
                inputUsuario.value = '';
                inputEstacao.value = '';
                inputDescricao.value = '';

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

if(window.ehADM){
    const botao = document.getElementById("cadastrar");
    botao.addEventListener("click", cadastrarBicicleta);
}

async function receberDados(){
    if(window.ehADM){
        await receberUsuarios();
        await receberEstacoes();
    }
    await receberBicicletas();
}

receberDados();