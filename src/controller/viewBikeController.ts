import { Request, Response } from 'express';
import Bicicleta, { InterfaceBike } from "../models/Bike";

async function viewBikeController(req: Request, res: Response){
    try {
        const bicicletas: InterfaceBike[] = await Bicicleta.find({});
        
        res.status(200).json(bicicletas);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
    }
}

export default viewBikeController;
