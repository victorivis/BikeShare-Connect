import mongoose from "mongoose";
import Bike, { InterfaceBike } from "../models/Bike";

async function SetBikeUnavailable(ID_Bicicleta: string,  retirada?: boolean) {
    const ObjectID = new mongoose.Types.ObjectId(ID_Bicicleta);
    
    if(retirada==true){
        const newBike: InterfaceBike | null = await Bike.findByIdAndUpdate(ObjectID, {disponivel: false, ID_EstacaoAtual: null}, {new: true});
    }
    else{
        const newBike: InterfaceBike | null = await Bike.findByIdAndUpdate(ObjectID, {disponivel: false}, {new: true});
        return newBike;
    }
}

export default SetBikeUnavailable;