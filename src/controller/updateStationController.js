import Station from "../models/Station.js";
import mongoose from "mongoose";

async function updateStationController(req, res){
    try{        
        if(req.file && req.file.buffer){
            req.body.foto = req.file.buffer;
        }
        //Se nao tiver foto deleta a chave para manter a foto antiga
        else{
            delete req.body.foto;
        }

        //Se a localizacao nao tiver mudado nao eh necessario processa-la
        if(!(req.body.localizacao)==false){
            const coordenadas = req.body.localizacao.split(" ").map(coord => parseFloat(coord));
            const localCorreto = {
                type: "Point",
                coordinates: [coordenadas[0], coordenadas[1]],
            }
            req.body.localizacao = localCorreto;
        }        

        const { id } = req.params;

        //Converte para o id para o tipo reconhecido no banco de dados
        const objectId = new mongoose.Types.ObjectId(id);
        const estacaoAtualizada = await Station.findByIdAndUpdate(objectId, req.body, { new: true });
        
        // Verifica se a estação foi encontrada
        if (!estacaoAtualizada) {
            return res.status(404).json({ message: "Estação não encontrada." });
        }
        
        res.status(200).json(estacaoAtualizada);
    } catch(error){
        res.status(400).json(error);
        console.log(error);
    }
}

export default updateStationController;