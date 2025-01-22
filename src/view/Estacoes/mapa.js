    // popUp do SweetAlert

async function confirmarOperacao(codigoCorreto, textoDescricao=null, textoBotao=null) {
    const codigoParaMostrar = codigoCorreto;
    
    return Swal.fire({
        title: 'Confirmar deleção',
        html: !textoDescricao ? `Digite o ID abaixo para confirmar:<br><span style="font-size: 20px; color: #000000; font-weight: bold;">${codigoParaMostrar}</span>` : textoDescricao,
        input: 'text',
        inputPlaceholder: 'Digite o código',
        showCancelButton: true,
        confirmButtonText: !textoBotao ? 'Deletar' : textoBotao,
        cancelButtonText: 'Cancelar',
        preConfirm: (codigoDigitado) => {
            if (codigoDigitado != codigoCorreto) {
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

async function selecionarOpcao(lista) {
    const pos = await Swal.fire({
        title: 'Escolha uma opção:',
        input: 'select',
        inputOptions: lista.reduce((acc, item, index) => {
            acc[index] = item;  // Cria um objeto para mapear índice -> item
            return acc;
        }, {}),
        inputPlaceholder: 'Selecione uma opção',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        preConfirm: (selectedIndex) => {
            if (selectedIndex !== null) {
                return selectedIndex;
            } else {
                return null;
            }
        },
        customClass: {
            popup: 'swal2-popup',
            input: 'swal2-select'
        }
    });

    if(pos.isConfirmed==false){
        return null;
    }
    else if(pos.value == ''){
        return null
    }
    return pos.value;
}

    // API Leaflet

const posPadrao = [-6.88, -38.58]; //Cajazeiras
const zoomProximo = 17;
const zoom = 13;
var map = L.map('map').setView(posPadrao, zoom);
const grupoMarcadores = L.layerGroup().addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var iconeVermelho = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var marcadorEstacao = L.marker([40.5, -0.09], { icon: iconeVermelho} ).addTo(grupoMarcadores);

function onMapClick(e) {
    if(marcadorEstacao._mapToAdd == null){
        marcadorEstacao.addTo(grupoMarcadores);
    }
    marcadorEstacao.setLatLng(e.latlng);
}

map.on('click', onMapClick);

var iconePessoa = L.icon({
    iconUrl: '../assets/pin-pessoa.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

let pararLocalizacao=false;
async function receberLocalizacaoAtual(){
    function sucesso(pos){
        if(pararLocalizacao==false){
            let posX=pos.coords.latitude;
            let posY=pos.coords.longitude;
    
            map.setView([posX, posY], 17);
            L.marker([posX, posY], {icon: iconePessoa}).addTo(map);
            pararLocalizacao=true;
        }
    }
    function falha(erro){
        if(pararLocalizacao==false){
            alert("Nao foi possível receber a localização atual");
            pararLocalizacao=true;
        }
    }

    navigator.geolocation.watchPosition(sucesso, falha, {
        //enableHighAccuracy: true,
        timeout: 5000
    });
};
receberLocalizacaoAtual();

    //Comunicacao com o banco de dados
    //Infelizmente CORS e um monte de outras politicas obrigam a fazer tudo num unico script

const ehAdmin = window.ehAdmin;

async function deletarEstacao(id){
    const confimado = await confirmarOperacao(id);
    
    console.log("Confirmado");
    console.log(confimado);

    if(confimado == true){
        try{
            const resposta = await fetch(`http://localhost:3000/estacao/${id}`, {
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
}

async function criadorBotaoDeletar(id) {
    await deletarEstacao(id);
    await receberMarcadores();
}

async function criadorBotaoEditar(id) {
    await enviarFormulario(editarEstacao, id);
    await receberMarcadores();
}

async function receberMarcadores(){
    try{
        grupoMarcadores.clearLayers();
        const resposta = await fetch("http://localhost:3000/estacao", {
            method: "GET",
        })

        const dados = await resposta.json();

        for(let i=0; i<dados.message.length; i++){
            const endereco = dados.message[i].localizacao.coordinates;
            let temp = L.marker([endereco[0], endereco[1]]).addTo(grupoMarcadores);            

            //Bruxaria para ler imagem
            const objetoFoto = dados.message[i].foto;
            const ListaBytes = new Uint8Array(objetoFoto.data);
            const blob = new Blob([ListaBytes], { type: 'image/png' });
            const imgURL = URL.createObjectURL(blob);

            //Informacoes no popUp da estacao
            const imagem = objetoFoto.data.length == 0 ? '' :
             `<img src="${imgURL}" alt="Imagem" style="width: 100px;" />`;

            const botaoEditar = !ehAdmin ? '' : `
                <button class="editStationButton" onclick = "criadorBotaoEditar(${dados.message[i].id})">
                    <img src="../assets/drawIcon.png" alt="alterar" style="width: 16px;" />
                </button>
            `;

            const botaoDeletar = !ehAdmin ? '' : `
                <button class="deleteStationButton" onclick = "criadorBotaoDeletar(${dados.message[i].id})">
                    <img src="../assets/trash.png" alt="lixo" style="width: 16px;" />
                </button>
            `;

            const descricaoEstacao = dados.message[i].descricao;

             const textoPopUp = 
            `<div>
                <p>${dados.message[i].nome} ${botaoEditar} ${botaoDeletar} </p>
                <p>${descricaoEstacao} </p>
                ${imagem}
            </div>`;

            temp.on('mouseover', evento => {
                temp.bindPopup(textoPopUp).openPopup();
            });
        }
    }
    catch(erro){
        alert("Falha ao tentar comunicação com o servidor");
    }
}

receberMarcadores();

async function criarEstacao(formData, id){
    await fetch('http://localhost:3000/estacao', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log(response);
        if(response.ok){
            alert("Estacao criada");
        }
        else{
            alert("Deu ruim");
        }
    });
}

async function editarEstacao(formData, id) {
    console.log("Editando", id);
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    //if(false){
        await fetch(`http://localhost:3000/estacao/${id}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => {
            console.log(response);
            if(response.ok){
                alert("Estacao Editada");
            }
            else{
                alert("Deu ruim");
            }
        });
    //}
}

async function enviarFormulario(funcaoDaRequisicao, id=null) {
    const latitude = marcadorEstacao.getLatLng().lat;
    const longitude = marcadorEstacao.getLatLng().lng;

    const inputNome = document.getElementById("nome");
    const nome = inputNome.value;
    const inputFile = document.getElementById("foto");
    const inputDescricao = document.getElementById("descricao");
    const descricao = inputDescricao.value;

    console.log("descricao");
    console.log(descricao);
    
    console.log(inputFile.files.length);
    if(funcaoDaRequisicao==criarEstacao && nome==""){
        alert("Preencha o nome");
        return;
    }

    let posMarcador='';
    if(marcadorEstacao._mapToAdd==null){
        if(funcaoDaRequisicao==criarEstacao){
            alert("Clique no mapa para marcar o local da estacao");
            return;
        }
    }
    else{
        posMarcador = `'POINT(${latitude} ${longitude})', 4326`;
    }

    //Me surpreende muito que isso nao causa erro
    const foto = inputFile.files[0];

    console.log(posMarcador);
    console.log("Arquivo", inputFile.files[0]);

    const formData = new FormData();
    formData.append('foto', foto);
    if(nome!='') formData.append('nome', nome);
    if(posMarcador!='') formData.append('localizacao', posMarcador);
    if(descricao!='') formData.append('descricao', descricao);

    console.log("form");
    console.log(formData.getAll("descricao"));
 
    await funcaoDaRequisicao(formData, id);

    //Limpar os campos
    inputNome.value = '';
    inputFile.value = '';
    inputDescricao.value = '';
}

async function enviarERecriar(){
    await enviarFormulario(criarEstacao);
    await receberMarcadores();
}

if(ehAdmin==true){
    const botaoEstacao = document.getElementById("submit-estacao");
    botaoEstacao.addEventListener('click', enviarERecriar);
}

const botaoPesquisa = document.querySelector(".searchButton");
const inputPesquisa = document.querySelector(".searchInput");

botaoPesquisa.addEventListener("click", async ()=>{

    fetch(`https://nominatim.openstreetmap.org/search?q=${inputPesquisa.value}&format=json`)
        .then(async response => await response.json())
        .then(async data => {
            if(data.length == 0){
                alert('Não foi possivel encontrar nenhuma localizacao com esse nome');
            }
            
            console.log(data);
            lista = []

            data.forEach(element => {
                lista.push(element.display_name);
            });

            const posSelecionada = await selecionarOpcao(lista);

            if(posSelecionada!=null){
                let centro = [data[posSelecionada].lat, data[posSelecionada].lon];
                map.setView(centro, zoomProximo);
            }       
        });
});