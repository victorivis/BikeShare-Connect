import mongoose from 'mongoose';
import { Request, Response } from 'express';
import ReturnBike, { InterfaceReturnBike } from "../models/ReturnBike";
import Bike, { InterfaceBike } from '../models/Bike';

async function createReturnBikeController(req: Request, res: Response){
    try {
        const { ID_Bicicleta } = req.body;

        const bicicleta: InterfaceBike | null = await Bike.findById(ID_Bicicleta);
        if(!bicicleta || bicicleta.disponivel==true){
            res.status(400).json({error: "Não é possível devolver essa bicicleta"});
        }
        else{
            const objectId = new mongoose.Types.ObjectId(ID_Bicicleta);
            Bike.findByIdAndUpdate(objectId, {disponivel: false}, {new: true});
            const borrowBike: InterfaceReturnBike = new ReturnBike(req.body);

            await borrowBike.save();
            res.status(201).json(borrowBike);
        }
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
}

export default createReturnBikeController;
