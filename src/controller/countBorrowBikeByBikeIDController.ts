import { Request, Response } from 'express';
import CountBorrowBikeByBikeID from '../service/CountBorrowBikebyBikeID';
import Bike from '../models/Bike';
import mongoose from 'mongoose';

async function countBorrowBikeByBikeIDController(req: Request, res: Response){
    try {
        const id = req.params.id;
        const total = await CountBorrowBikeByBikeID(id);
        res.status(200).json(total);        
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
}

export default countBorrowBikeByBikeIDController;
