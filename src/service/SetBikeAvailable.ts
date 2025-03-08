import mongoose from "mongoose";
import Bike, { InterfaceBike } from "../models/Bike";
import CountBorrowBikeByBikeID from "./CountBorrowBikeByBikeID";
import CountReturnBikeByBikeID from "./CountReturnBikebyBikeID";

async function SetBikeAvailable(ID_Bicicleta: string) {
    const ObjectID = new mongoose.Types.ObjectId(ID_Bicicleta);

    const retiradas: number = await CountBorrowBikeByBikeID(ID_Bicicleta);
    const devolvidas: number = await CountReturnBikeByBikeID(ID_Bicicleta);
    
    //Bicicleta nao pode ser marcada como disponivel se ainda nao tiver sido entregue
    if(retiradas!=devolvidas){
        return -1;
    }

    const newBike: InterfaceBike | null = await Bike.findByIdAndUpdate(ObjectID, {disponivel: true}, {new: true});
    return newBike;
}

export default SetBikeAvailable;