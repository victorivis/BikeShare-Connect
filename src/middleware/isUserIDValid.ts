import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import { InterfaceUser } from "../models/User";

async function isUserIDValid(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { ID_UsuarioDono } = req.body;

        const usuario: InterfaceUser | null = await User.findOne({_id: ID_UsuarioDono});

        if(!usuario){
            res.status(400).json({message: "ID de usuario invalido"});
        }
        else{
            next();
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default isUserIDValid;