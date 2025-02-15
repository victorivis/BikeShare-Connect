import Station from "../models/Station.js";

async function viewStationController(req, res){
    try{
        const estacao = await Station.find({});
        res.status(200).json(estacao);
    } catch(error){
        res.status(400).json(error);
    }
}

export default viewStationController;