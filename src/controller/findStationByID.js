import Station from "../models/Station.js";

async function findStationByIDController(req, res){
    try{
        const { id } = req.params;
        const station = await Station.findById(id);
        res.status(200).json(station);
    } catch(error){
        res.status(400).json(error);
    }
}

export default findStationByIDController;