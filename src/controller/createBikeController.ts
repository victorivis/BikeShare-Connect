import { Request, Response } from 'express';
import Bicicleta, { InterfaceBicicleta } from "../models/Bike";

interface FileRequest extends Request {
    file?: Express.Multer.File;
}

async function createBikeController(req: FileRequest, res: Response){
    try {
        const foto = req.file != null ? req.file.buffer : "";
        req.body.foto = foto;

        const bicicleta: InterfaceBicicleta = new Bicicleta(req.body);
        bicicleta.disponivel = !bicicleta.ID_EstacaoAtual;

        await bicicleta.save();
        res.status(201).json(bicicleta);
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
}

export default createBikeController;
