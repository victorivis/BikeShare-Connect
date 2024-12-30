import { marcadorEstacao } from "./mapa.js";

function enviarFormulario(){
    document.getElementById("nome");
    console.log("Marcador importado ", marcadorEstacao.getLatLng());
}

const botao = document.getElementById("submit-estacao");
botao.addEventListener('click', enviarFormulario);