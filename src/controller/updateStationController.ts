import { Request, Response } from "express";
import mongoose from "mongoose";
import Station, { databaseEstacao, InterfaceStation } from "../models/Station";
import multer from "multer";
import client from "../../database/redis";
import { json } from "stream/consumers";

const formData = multer();

async function updateStationController(req: Request, res: Response){
    try {
        // Se o arquivo foi enviado, processa a foto
        if (req.file && req.file.buffer) {
            req.body.foto = req.file.buffer;
        } else {
            // Se não, deleta a chave de foto para manter a foto antiga
            delete req.body.foto;
        }

        // Se a localização não foi modificada, não processa
        if (!(req.body.localizacao === false)) {
            const coordenadas: number[] = req.body.localizacao.split(" ").map((coord: string) => parseFloat(coord));
            const localCorreto = {
                type: "Point",
                coordinates: [coordenadas[0], coordenadas[1]],
            };
            req.body.localizacao = localCorreto;
        }

        const { id } = req.params;

        // Converte o id para o tipo reconhecido no banco de dados
        const objectId = new mongoose.Types.ObjectId(id);
        const estacaoAtualizada: InterfaceStation | null = await Station.findByIdAndUpdate(objectId, req.body, { new: true });

        // Verifica se a estação foi encontrada
        if (!estacaoAtualizada) {
            res.status(404).json({ message: "Estação não encontrada." });
        }
        else{
            const cache: string | null = await client.get(databaseEstacao);
            if(cache != null){
                const estacoesCache: InterfaceStation[] = JSON.parse(cache);
                const indice = estacoesCache.findIndex(estacao => estacao._id==id);
                estacoesCache[indice] = estacaoAtualizada;
                
                client.set(databaseEstacao, JSON.stringify(estacoesCache));
            }

            res.status(200).json(estacaoAtualizada);
        }
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
        console.log(error);
    }
}

export default updateStationController;
