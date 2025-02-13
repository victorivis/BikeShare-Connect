import Station from "../models/Station.js";

async function createStationController(req, res){
    try{
        const coordenadas = req.body.localizacao.split(" ").map(coord => parseFloat(coord));
        const localCorreto = {
            type: "Point",
            coordinates: [coordenadas[1], coordenadas[0]],
        }
        req.body.localizacao = localCorreto;

        const estacao = new Station(req.body);
        await estacao.save();
        res.status(201).json(estacao);
    } catch(error){
        res.status(400).json(error);
    }
}

export default createStationController;