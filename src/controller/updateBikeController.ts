import { Request, Response } from "express";
import mongoose from "mongoose";
import Bike , { InterfaceBike} from "../models/Bike";
import multer from "multer";

const formData = multer();

async function updateBikeController(req: Request, res: Response): Promise<void> {
    try {
        // Se o arquivo foi enviado, processa a foto
        if (req.file && req.file.buffer) {
            req.body.foto = req.file.buffer;
        } else {
            // Se não, deleta a chave de foto para manter a foto antiga
            delete req.body.foto;
        }

        const { id } = req.params;

        // Converte o id para o tipo reconhecido no banco de dados
        const objectId = new mongoose.Types.ObjectId(id);
        const bikeAtualizada: InterfaceBike | null = await Bike.findByIdAndUpdate(objectId, req.body, { new: true });

        // Verifica se a estação foi encontrada
        if (!bikeAtualizada) {
            res.status(404).json({ message: "Bicicleta não encontrada." });
            return;
        }

        res.status(200).json(bikeAtualizada);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
        console.log(error);
    }
}

export default updateBikeController;
