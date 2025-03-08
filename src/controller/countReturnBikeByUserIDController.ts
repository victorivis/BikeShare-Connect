import { Request, Response } from 'express';
import CountReturnBikeByUserID from '../service/CountReturnBikeByUserID';

async function countReturnBikeByUserIDController(req: Request, res: Response){
    try {
        const id = req.params.id;
        const total = await CountReturnBikeByUserID(id);
        res.status(200).json(total);        
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
}

export default countReturnBikeByUserIDController;
