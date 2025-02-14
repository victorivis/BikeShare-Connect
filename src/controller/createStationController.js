import Station from "../models/Station.js";

async function createStationController(req, res){
    try{
        const foto = req.file != null ? req.file.buffer : "";
        req.body.foto = foto;

        const coordenadas = req.body.localizacao.split(" ").map(coord => parseFloat(coord));
        const localCorreto = {
            type: "Point",
            coordinates: [coordenadas[0], coordenadas[1]],
        }
        req.body.localizacao = localCorreto;

        const estacao = new Station(req.body);
        await estacao.save();
        res.status(201).json(estacao);
    } catch(error){
        res.status(400).json(error);
        console.log(error);
    }
}

export default createStationController;