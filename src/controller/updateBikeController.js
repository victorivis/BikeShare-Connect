import Bicicleta from "../models/Bike.js";
import mongoose from "mongoose";

async function updateBikeController(req, res){
    try{        
        if(req.file && req.file.buffer){
            req.body.foto = req.file.buffer;
        }
        //Se nao tiver foto deleta a chave para manter a foto antiga
        else{
            delete req.body.foto;
        }      

        const { id } = req.params;

        //Converte para o id para o tipo reconhecido no banco de dados
        const objectId = new mongoose.Types.ObjectId(id);
        const bicicletaAtualizada = await Bicicleta.findByIdAndUpdate(objectId, req.body, { new: true });
        
        // Verifica se a estação foi encontrada
        if (!bicicletaAtualizada) {
            return res.status(404).json({ message: "Bicicleta não encontrada." });
        }
        
        res.status(200).json(bicicletaAtualizada);
    } catch(error){
        res.status(400).json(error);
        console.log(error);
    }
}

export default updateBikeController;