import Bicicleta from "../models/Bike.js";

async function viewBikeController(req, res){
    try{
        const bicicleta = await Bicicleta.find({});
        res.status(200).json(bicicleta);
    } catch(error){
        res.status(400).json(error);
    }
}

export default viewBikeController;