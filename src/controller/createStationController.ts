import { Request, Response } from "express";
import Station, { InterfaceStation } from "../models/Station";

interface FileRequest extends Request {
    file?: Express.Multer.File;
}

async function createStationController(req: FileRequest, res: Response) {
    try {
        const foto = req.file != null ? req.file.buffer : "";
        req.body.foto = foto;

        const coordenadas: number[] = req.body.localizacao.split(" ").map((coord: string) => parseFloat(coord));
        const localCorreto = {
            type: "Point",
            coordinates: [coordenadas[0], coordenadas[1]],
        };
        req.body.localizacao = localCorreto;

        const estacao: InterfaceStation = new Station(req.body);
        await estacao.save();
        res.status(201).json(estacao);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
        console.log(error);
    }
}

export default createStationController;
