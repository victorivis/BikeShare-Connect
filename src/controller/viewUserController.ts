import User from "../models/User";
import { Request, Response } from "express";
import { InterfaceUser } from "../models/User"; // Importando a InterfaceUser

async function viewUserController(req: Request, res: Response): Promise<void> {
    try {
        const usuarios: InterfaceUser[] = await User.find({});
        res.status(200).json(usuarios);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export default viewUserController;