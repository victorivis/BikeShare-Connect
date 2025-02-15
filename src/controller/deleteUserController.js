import User from "../models/User.js";
import mongoose from "mongoose";

async function deleteUserController(req, res) {
    try {
        const { id } = req.params;

        //Converte para o id para o tipo reconhecido no banco de dados
        const objectId = new mongoose.Types.ObjectId(id);
        const usuarioDeletado = await User.findByIdAndDelete(objectId);
        console.log(objectId);
        console.log(usuarioDeletado);

        if (!usuarioDeletado) {
            return res.status(404).json({ message: "Usuario não encontrado." });
        }
        
        res.status(200).json({ message: "Usuario deletado com sucesso", usuario: usuarioDeletado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default deleteUserController;