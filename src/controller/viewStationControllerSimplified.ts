import { Request, Response } from "express";
import Station, { InterfaceStation } from "../models/Station";

async function viewStationControllerSimplified(req: Request, res: Response): Promise<void> {
    try {
        const estacoes: InterfaceStation[] = await Station.find({});

        estacoes.forEach(estacao => {estacao.foto = estacao.foto?.slice(0, 2)});

        res.status(200).json(estacoes);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
    }
}

export default viewStationControllerSimplified;
