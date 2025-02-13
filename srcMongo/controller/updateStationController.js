import Station from "../models/Station.js";
import mongoose from "mongoose";

async function updateStationController(req, res){
    try{
        const { id } = req.params;

        //Converte para o id para o tipo reconhecido no banco de dados
        const objectId = new mongoose.Types.ObjectId(id);
        const estacaoAtualizada = await Station.findByIdAndUpdate(objectId, req.body, { new: true });
        
        // Verifica se a estação foi encontrada
        if (!estacaoAtualizada) {
            return res.status(404).json({ message: "Estação não encontrada." });
        }
        
        res.status(200).json(estacaoAtualizada);
    } catch(error){
        res.status(400).json(error);
    }
}

export default updateStationController;