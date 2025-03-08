import { Request, Response } from "express";
import SetBikeAvailable from "../service/SetBikeAvailable";
import { InterfaceBike } from "../models/Bike";

async function setBikeAvailableController(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const bicicleta: InterfaceBike | Number | null = await SetBikeAvailable(id);

        if(!bicicleta){
            res.status(400).json({error: "Bicicleta não encontrada"});
        }
        else if(bicicleta==-1){
            res.status(403).json({erro: "Não é possível marcar como disponível uma bicicleta não devolvida"})
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
