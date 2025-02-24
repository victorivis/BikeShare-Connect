import User from "../models/User";
import { Request, Response } from "express";
import { InterfaceUser } from "../models/User";

async function viewUserControllerSimplified(req: Request, res: Response): Promise<void> {
    try {
        const usuarios: InterfaceUser[] = await User.find({});
        
        //Para nao ter problema no postman 
        usuarios.forEach(usuario => {
            usuario.fotoPerfil = usuario.fotoPerfil?.slice(0, 2);
        });

        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default viewUserControllerSimplified;
