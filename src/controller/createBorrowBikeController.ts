import mongoose from 'mongoose';
import { Request, Response } from 'express';
import BorrowBike, { InterfaceBorrowBike } from "../models/BorrowBike";
import Bike, { InterfaceBike } from '../models/Bike';
import SetBikeUnavailable from '../service/SetBikeUnavailable';

type BorrowBikeRequest = {
    ID_Usuario: string;
    ID_Bicicleta: string;
};

async function createBorrowBikeController(req: Request, res: Response){
    try {
        const borrowBikeData = req.body as BorrowBikeRequest;

        const bicicleta: InterfaceBike | null = await Bike.findById(borrowBikeData.ID_Bicicleta);
        if(!bicicleta || bicicleta.disponivel==false){
            res.status(400).json({error: "Essa bicicleta está indisponível."});
        }
        else{
            const ID_Estacao = bicicleta.ID_EstacaoAtual;

            await SetBikeUnavailable(borrowBikeData.ID_Bicicleta, true);
            const borrowBike: InterfaceBorrowBike = new BorrowBike({
                ID_Usuario: borrowBikeData.ID_Usuario,
                ID_Bicicleta: borrowBikeData.ID_Bicicleta,
                ID_Estacao
            });

            await borrowBike.save();
            res.status(201).json(borrowBike);
        }
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
}

export default createBorrowBikeController;
