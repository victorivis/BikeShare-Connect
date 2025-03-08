import { Request, Response } from "express";
import Station, { InterfaceStation, databaseEstacao } from "../models/Station";
import client from "../../database/redis";

async function viewStationController(req: Request, res: Response): Promise<void> {
    try {
        let cache: string | null = await client.get(databaseEstacao);

        if(!cache){
            console.log("Not cached");
            const estacao: InterfaceStation[] = await Station.find({});
            cache = JSON.stringify(estacao);
            client.set(databaseEstacao, cache);
        }
        const estacoesCache: InterfaceStation[] = JSON.parse(cache);
        res.status(200).json(estacoesCache);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
    }
}

export default viewStationController;
