import User from "../models/User";
import { Request, Response } from "express";
import { InterfaceUser } from "../models/User"; // Importando a InterfaceUser

async function findUserByID(req: Request, res: Response){
    try {
        const { id } = req.params;

        const usuario: InterfaceUser | null = await User.findOne({ _id: id });
        
        if (!usuario) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }
        
        res.status(200).json(usuario);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export default findUserByID;
