import { Request, Response, NextFunction } from 'express';
import Station, { InterfaceStation } from "../models/Station";

async function isStationIDValid(req: Request, res: Response, next: NextFunction){
    try {
        const { ID_EstacaoAtual } = req.body;
        const estacao: InterfaceStation | null = await Station.findOne({_id: ID_EstacaoAtual});

        if(!estacao){
            res.status(400).json({message: "ID de estacao invalido"});
        }
        else{
            next();
        }
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
    }
}

export default isStationIDValid;