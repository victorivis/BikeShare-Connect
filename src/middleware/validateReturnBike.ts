import { Request, Response, NextFunction } from "express";
import CountBorrowBikeByBikeID from "../service/CountBorrowBikeByBikeID";
import CountReturnBikeByBikeID from "../service/CountReturnBikebyBikeID";
import CountBorrowBikeByUserID from "../service/CountBorrowBikebyUserID";
import CountReturnBikeByUserID from "../service/CountReturnBikeByUserID";

async function validateReturnBike(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { ID_Bicicleta, ID_Usuario } = req.body;
        const retiradasBicicleta: number = await CountBorrowBikeByBikeID(ID_Bicicleta);
        const devolucoesBicicleta: number = await CountReturnBikeByBikeID(ID_Bicicleta);

        if(retiradasBicicleta-devolucoesBicicleta!=1){
            res.status(403).json({error: "Essa bicicleta não pode ser devolvida antes de retirada"});
            return;
        }

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