import { Request, Response } from "express";
import Station from "../models/Station";
import mongoose from "mongoose";

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

        res.status(200).json({ message: "Estação deletada com sucesso", estacao: estacaoDeletada });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
    }
}

export default deleteStationController;