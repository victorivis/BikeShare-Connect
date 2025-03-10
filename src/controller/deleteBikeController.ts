import { Request, Response } from 'express';
import Bicicleta, { InterfaceBike } from "../models/Bike";
import mongoose, { Types } from "mongoose";
import CountBorrowBikeByBikeID from '../service/CountBorrowBikeByBikeID';
import { error } from 'console';

// Tipando o parâmetro id como string
async function deleteBikeController(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;

        if(await CountBorrowBikeByBikeID(id)!=0){
            res.status(501).json({error: "Essa bicicleta tem um historico de movimentação. Se realmente quiser deletá-la apague primeiro esse histórico."});
            return;
        }

        // Converte o id para o tipo ObjectId do MongoDB
        const objectId: Types.ObjectId = new mongoose.Types.ObjectId(id);
        const bicicletaDeletada: InterfaceBike | null = await Bicicleta.findByIdAndDelete(objectId);

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
