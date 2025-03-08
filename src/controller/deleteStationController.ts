import { Request, Response } from "express";
import Station, {InterfaceStation, databaseEstacao} from "../models/Station";
import mongoose from "mongoose";
import client from "../../database/redis";

async function deleteStationController(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        // Converte o id para o tipo reconhecido no banco de dados
        const objectId = new mongoose.Types.ObjectId(id);
        const estacaoDeletada = await Station.findByIdAndDelete(objectId);

        if (!estacaoDeletada) {
            res.status(404).json({ message: "Estação não encontrada." });
            return;
        }
        
        const cache: string | null = await client.get(databaseEstacao)
        if(cache!=null){
            const estacoesCache: InterfaceStation[] = JSON.parse(cache);
            const updatedEstacoes = estacoesCache.filter(estacao => estacao._id !== id);
            await client.set(databaseEstacao, JSON.stringify(updatedEstacoes));
        }

        res.status(200).json({ message: "Estação deletada com sucesso", estacao: estacaoDeletada });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
    }
}

export default deleteStationController;