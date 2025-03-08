import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import { InterfaceUser } from "../models/User";

async function setBikeParam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = req.params.id;
        req.body.ID_Bicicleta = id;
        next();

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default setBikeParam;