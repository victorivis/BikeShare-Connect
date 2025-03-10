import { Request, Response } from "express";
import { InterfaceUser , redisUser} from "../models/User"; // Importando a InterfaceUser
import findUserByID from "../service/findUserByID";
import client from "../../database/redis";

async function findUserByIDController(req: Request, res: Response){
    try {
        const { id } = req.params;
        let cacheUser: string | null = await findUserByID(id);
        if(cacheUser !== null){
            let usuario: InterfaceUser = JSON.parse(cacheUser);
        
            res.status(200).json(usuario);
        }
        else {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }
      
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export default findUserByIDController;
