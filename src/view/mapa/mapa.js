//API Leaflet

var map = L.map('map').setView([-6.88, -38.58], 13);
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

//Comunicacao com o banco de dados
//Infelizmente CORS e um monte de outras politicas obrigam a fazer tudo num unico script

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
            const imagem = objetoFoto.data.length == 0 ? "" :
             `<img src="${imgURL}" alt="Imagem" style="width: 100px;" />`;
            
             const textoPopUp = 
            `<div>
                <p>${dados.message[i].nome}</p>
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

async function enviarFormulario() {
    const latitude = marcadorEstacao.getLatLng().lat;
    const longitude = marcadorEstacao.getLatLng().lng;

    const inputNome = document.getElementById("nome");
    const nome = inputNome.value;
    const inputFile = document.getElementById("foto");
    
    console.log(inputFile.files.length);
    if(nome==""){
        alert("Preencha o nome");
        return;
    }

    if(marcadorEstacao._mapToAdd==null){
        alert("Clique no mapa para marcar o local da estacao");
        return;
    }

    //Me surpreende muito que isso nao causa erro
    const foto = inputFile.files[0];

    const posMarcador = `'POINT(${latitude} ${longitude})', 4326`;
    console.log(posMarcador);
    console.log("Arquivo", inputFile.files[0]);

    const formData = new FormData();
    formData.append('foto', foto);
    formData.append('nome', nome);
    formData.append('localizacao', posMarcador);
 
    await fetch('http://localhost:3000/estacao', {
            method: 'POST',
            body: formData
        }
    )
    .then(response => {
        console.log(response);
        if(response.ok){
            alert("Estacao criada");
        }
        else{
            alert("Deu ruim");
        }
    });

    //Limpar os campos
    inputNome.value = '';
    inputFile.value = '';
}

async function enviarERecriar(){
    await enviarFormulario();
    await receberMarcadores();
}

const botao = document.getElementById("submit-estacao");
botao.addEventListener('click', enviarERecriar);