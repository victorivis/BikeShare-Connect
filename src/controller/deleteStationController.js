import Station from "../models/Station.js";
import mongoose from "mongoose";

async function deleteStationController(req, res) {
    try {
        const { id } = req.params;

        //Converte para o id para o tipo reconhecido no banco de dados
        const objectId = new mongoose.Types.ObjectId(id);
        const estacaoDeletada = await Station.findByIdAndDelete(objectId);

        if (!estacaoDeletada) {
            return res.status(404).json({ message: "Estação não encontrada." });
        }
        
        res.status(200).json({ message: "Estação deletada com sucesso", estacao: estacaoDeletada });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default deleteStationController;
