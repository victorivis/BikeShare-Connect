import User from "../models/User.js";
import mongoose from "mongoose";

async function updateUserController(req, res){
    try{        
        if(req.file && req.file.buffer){
            req.body.fotoPerfil = req.file.buffer;
        }
        //Se nao tiver fotoPerfil deleta a chave para manter a fotoPerfil antiga
        else{
            delete req.body.fotoPerfil;
        }
        const { id } = req.params;

        //Converte para o id para o tipo reconhecido no banco de dados
        const objectId = new mongoose.Types.ObjectId(id);
        const usuarioAtualizado = await User.findByIdAndUpdate(objectId, req.body, { new: true });

        // Verifica se o usuario foi encontrado
        if (!usuarioAtualizado) {
            return res.status(404).json({ message: "Usuario não encontrado." });
        }

        res.status(200).json(usuarioAtualizado);
    } catch(error){
        res.status(400).json(error);
        console.log(error);
    }
}

export default updateUserController;