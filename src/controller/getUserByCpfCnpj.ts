import User from "../models/User";
import { Request, Response } from "express";
import { InterfaceUser } from "../models/User"; // Importando a InterfaceUser

async function getUserByCpfCnpj(req: Request, res: Response): Promise<void> {
    try {
        const { cpfCnpj } = req.params;

        const usuario: InterfaceUser | null = await User.findOne({ cpf_cnpj: cpfCnpj });
        
        if (!usuario) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }
        
        res.status(200).json(usuario);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export default getUserByCpfCnpj;
