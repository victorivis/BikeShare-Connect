import { Request, Response, NextFunction } from 'express';
import Station, { InterfaceStation } from "../models/Station";

async function isStationIDValid(req: Request, res: Response, next: NextFunction){
    try {
        const { ID_Estacao } = req.body;
        const estacao: InterfaceStation | null = await Station.findOne({_id: ID_Estacao});

        if(!estacao){
            res.status(400).json({message: "ID de estacao invalido"});
        }
        else{
            next();
        }
    } catch (error: any) {
        res.status(500).json({ error: error});
    }
}

export default isStationIDValid;