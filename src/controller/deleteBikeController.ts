import { Request, Response } from 'express';
import Bicicleta, { InterfaceBicicleta } from "../models/Bike";
import mongoose, { Types } from "mongoose";

// Tipando o parâmetro id como string
async function deleteBikeController(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;

        // Converte o id para o tipo ObjectId do MongoDB
        const objectId: Types.ObjectId = new mongoose.Types.ObjectId(id);
        const bicicletaDeletada: InterfaceBicicleta | null = await Bicicleta.findByIdAndDelete(objectId);

        if (!bicicletaDeletada) {
            res.status(404).json({ message: "Bicicleta não encontrada." });
            return;
        }

        res.status(200).json({ message: "Bicicleta deletada com sucesso", Bicicleta: bicicletaDeletada });
    } catch (error) {
        res.status(400).json({ error });
    }
}

export default deleteBikeController;
