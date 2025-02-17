import Bicicleta from "../models/Bike.js";

async function createBikeController(req, res){
    try{
        const foto = req.file != null ? req.file.buffer : "";
        req.body.foto = foto;


        const bicicleta = new Bicicleta(req.body);
        bicicleta.disponivel = (!bicicleta.ID_EstacaoAtual ? false : true);

        await bicicleta.save();
        res.status(201).json(bicicleta);
    } catch(error){
        res.status(400).json(error);
        console.log(error);
    }
}

export default createBikeController;