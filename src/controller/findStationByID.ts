import { Request, Response } from "express";
import Station, { InterfaceStation } from "../models/Station";

async function findStationByIDController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const station: InterfaceStation | null = await Station.findById(id);

        if (!station) {
            res.status(404).json({ message: "Estação não encontrada." });
            return;
        }

        res.status(200).json(station);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
    }
}

export default findStationByIDController;
