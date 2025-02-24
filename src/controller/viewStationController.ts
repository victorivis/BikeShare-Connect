import { Request, Response } from "express";
import Station, { InterfaceStation } from "../models/Station";

async function viewStationController(req: Request, res: Response): Promise<void> {
    try {
        const estacao: InterfaceStation[] = await Station.find({});
        res.status(200).json(estacao);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
    }
}

export default viewStationController;
