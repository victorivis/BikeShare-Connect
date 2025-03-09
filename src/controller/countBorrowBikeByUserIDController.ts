import { Request, Response } from 'express';
import CountBorrowBikeByUserID from '../service/CountBorrowBikeByUserID';

async function countBorrowBikeByUserIDController(req: Request, res: Response){
    try {
        const id = req.params.id;
        const total = await CountBorrowBikeByUserID(id);
        res.status(200).json(total);        
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
}

export default countBorrowBikeByUserIDController;
