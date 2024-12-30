var map = L.map('map').setView([-6.88, -38.58], 13);

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

var marcadorEstacao = L.marker([40.5, -0.09], { icon: iconeVermelho} ).addTo(map);

function onMapClick(e) {
    marcadorEstacao.setLatLng(e.latlng);
}

map.on('click', onMapClick);

async function receberMarcadores(){
    try{
        const resposta = await fetch("http://localhost:3000/estacao", {
            method: "GET",
        })

        const dados = await resposta.json();
        //console.log(dados);

        for(let i=0; i<dados.message.length; i++){
            const endereco = dados.message[i].localizacao.coordinates;
            let temp = L.marker([endereco[0], endereco[1]]).addTo(map);
            console.log(endereco);

            temp.on('mouseover', evento => {
                temp.bindPopup(dados.message[i].nome).openPopup();
            });
        }
    }
    catch(erro){
        alert("Falha ao tentar comunicação com o servidor");
    }
}

receberMarcadores();

//Infelizmente CORS e um monte de outras politicas obrigam a fazer tudo num unico script

async function enviarFormulario(){
    const latitude = marcadorEstacao.getLatLng().lat;
    const longitude = marcadorEstacao.getLatLng().lng;

    const nome = document.getElementById("nome");
    const posMarcador = `'POINT(${latitude} ${longitude})', 4326`;
    console.log(posMarcador);

    const dados = {
        nome: nome.value,
        localizacao: posMarcador
    };

    console.log(dados);
 
    fetch('http://localhost:3000/estacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        }
    )
    .then(response => {
        console.log(response);
        if(response.ok){
            alert("Deu bom!");
        }
        else{
            alert("Deu ruim");
        }
    });
}

const botao = document.getElementById("submit-estacao");
botao.addEventListener('click', enviarFormulario);