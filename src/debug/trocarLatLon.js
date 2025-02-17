import mongoose from "mongoose";
import Estacao from "../models/Station.js"

async function trocarLatLon() {
    try {
        // Busca todas as estações no banco
        const estacoes = await Estacao.find();

        for (let estacao of estacoes) {
            if (estacao.localizacao && estacao.localizacao.coordinates.length === 2) {
                estacao.localizacao.coordinates = [
                    estacao.localizacao.coordinates[1], // Longitude
                    estacao.localizacao.coordinates[0], // Latitude
                ];
                
                await estacao.save();
                console.log(`Coordenadas corrigidas para a estação: ${estacao.nome}`);
            }
        }

        console.log("Todas as coordenadas foram corrigidas.");
    } catch (error) {
        console.error("Erro ao corrigir coordenadas:", error);
    }

    mongoose.disconnect();
}

trocarLatLon();