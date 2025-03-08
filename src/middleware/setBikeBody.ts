import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import { InterfaceUser } from "../models/User";

async function setBikeBody(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { ID_UsuarioDono, ID_EstacaoAtual } = req.body;
        req.body.ID_Estacao = ID_EstacaoAtual;
        req.body.ID_Usuario = ID_UsuarioDono;

        next();

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default setBikeBody;