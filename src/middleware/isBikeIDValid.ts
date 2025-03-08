import { Request, Response, NextFunction } from 'express';
import Bike, { InterfaceBike } from "../models/Bike";

async function isBikeIDValid(req: Request, res: Response, next: NextFunction){
    try {
        const { ID_Bicicleta } = req.body;
        const bike: InterfaceBike | null = await Bike.findOne({_id: ID_Bicicleta});

        if(!bike){
            res.status(400).json({message: "ID de bicicleta invalido"});
        }
        else{
            next();
        }
    } catch (error: any) {
        res.status(500).json({ error: error});
    }
}

export default isBikeIDValid;