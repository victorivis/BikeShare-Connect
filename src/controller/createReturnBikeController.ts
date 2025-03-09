import mongoose from 'mongoose';
import { Request, Response } from 'express';
import ReturnBike, { InterfaceReturnBike } from "../models/ReturnBike";
import Bike, { InterfaceBike } from '../models/Bike';
import SetBikeAvailable from '../service/SetBikeAvailable';

async function createReturnBikeController(req: Request, res: Response){
    try {
        const { ID_Bicicleta, ID_Estacao } = req.body;

        const bicicleta: InterfaceBike | null = await Bike.findById(ID_Bicicleta);
        if(!bicicleta || bicicleta.disponivel==true){
            res.status(400).json({error: "Não é possível devolver essa bicicleta"});
        }
        else{            
            const borrowedBike: InterfaceReturnBike = new ReturnBike(req.body);
            await borrowedBike.save();
            
            await SetBikeAvailable(ID_Bicicleta, ID_Estacao);

            res.status(201).json(borrowedBike);
        }
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
}

export default createReturnBikeController;
