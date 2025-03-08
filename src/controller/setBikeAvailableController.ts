import { Request, Response } from "express";
import SetBikeAvailable from "../service/SetBikeAvailable";

async function setBikeAvailableController(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const bicicleta = await SetBikeAvailable(id);

        if(!bicicleta){
            res.status(400).json({error: "Bicicleta não encontrada"});
        }
        else{
            res.status(200).json(bicicleta);
        }        
    } catch (error: any) {
        res.status(400).json({error});
        console.log(error);
    }
}

export default setBikeAvailableController;
