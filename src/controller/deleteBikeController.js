import Bicicleta from "../models/Bike.js";
import mongoose from "mongoose";

async function deleteBikeController(req, res) {
    try {
        const { id } = req.params;

        //Converte para o id para o tipo reconhecido no banco de dados
        const objectId = new mongoose.Types.ObjectId(id);
        const bicicletaDeletada = await Bicicleta.findByIdAndDelete(objectId);

        if (!bicicletaDeletada) {
            return res.status(404).json({ message: "Bicicleta não encontrada." });
        }
        
        res.status(200).json({ message: "Bicicleta deletada com sucesso", Bicicleta: bicicletaDeletada });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default deleteBikeController;
