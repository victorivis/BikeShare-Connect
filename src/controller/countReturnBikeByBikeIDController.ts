import { Request, Response } from 'express';
import CountReturnBikeByBikeID from '../service/CountReturnBikebyBikeID';

async function countReturnBikeByBikeIDController(req: Request, res: Response){
    try {
        const id = req.params.id;
        const total = await CountReturnBikeByBikeID(id);
        res.status(200).json(total);        
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
}

export default countReturnBikeByBikeIDController;
