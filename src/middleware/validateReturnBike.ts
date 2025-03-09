import { Request, Response, NextFunction } from "express";
import CountBorrowBikeByBikeID from "../service/CountBorrowBikeByBikeID";
import CountReturnBikeByBikeID from "../service/CountReturnBikeByBikeID";
import CountBorrowBikeByUserID from "../service/CountBorrowBikeByUserID";
import CountReturnBikeByUserID from "../service/CountReturnBikeByUserID";
import GetLastBorrowBikeByBikeID from "../service/GetLastBorrowBikeByBikeID";
import BorrowBike, { InterfaceBorrowBike } from "../models/BorrowBike";
import { error } from "console";

async function validateReturnBike(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { ID_Bicicleta } = req.body;
        const retiradasBicicleta: number = await CountBorrowBikeByBikeID(ID_Bicicleta);
        const devolucoesBicicleta: number = await CountReturnBikeByBikeID(ID_Bicicleta);

        if(retiradasBicicleta-devolucoesBicicleta!=1){
            res.status(403).json({error: "Essa bicicleta não pode ser devolvida antes de retirada"});
            return;
        }

        const borrowBike: InterfaceBorrowBike | null = await GetLastBorrowBikeByBikeID(ID_Bicicleta);
        if(!borrowBike){
            throw new Error;
        }
        
        const ID_Usuario = borrowBike.ID_Usuario.toString();
        req.body.ID_Usuario = ID_Usuario;
        
        const retiradasUsuario: number = await CountBorrowBikeByUserID(ID_Usuario);
        const devolucoesUsuario: number = await CountReturnBikeByUserID(ID_Usuario);

        if(retiradasUsuario-devolucoesUsuario!=1){
            res.status(403).json({error: "Esse usuario não pode devolver antes de retirar uma bicicleta"});
            return;
        }

        next();

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default validateReturnBike;