import mongoose from 'mongoose';
import { Request, Response } from 'express';
import BorrowBike, { InterfaceBorrowBike } from "../models/BorrowBike";
import Bike, { InterfaceBike } from '../models/Bike';
import SetBikeUnavailable from '../service/SetBikeUnavailable';

async function createBorrowBikeController(req: Request, res: Response){
    try {
        const { ID_Bicicleta } = req.body;

        const bicicleta: InterfaceBike | null = await Bike.findById(ID_Bicicleta);
        if(!bicicleta || bicicleta.disponivel==false){
            res.status(400).json({error: "Essa bicicleta está indisponível."});
        }
        else{
            await SetBikeUnavailable(ID_Bicicleta);
            const borrowBike: InterfaceBorrowBike = new BorrowBike(req.body);

            await borrowBike.save();
            res.status(201).json(borrowBike);
        }
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
}

export default createBorrowBikeController;
