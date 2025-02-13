import Station from "../models/Station.js";

async function createStationController(req, res){
    try{
        const estacao = new Station(req.body);
        await estacao.save();
        res.status(201).json(estacao);
    } catch(error){
        res.status(400).json(error);
    }
}

export default createStationController;