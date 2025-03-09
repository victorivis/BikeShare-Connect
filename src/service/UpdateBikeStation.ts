import mongoose from "mongoose";
import Bike, { InterfaceBike } from "../models/Bike";
import Station, { InterfaceStation } from "../models/Station";

async function UpdateBikeStation(ID_Bicicleta: string, ID_Estacao: string) {
    const BikeObjectID = new mongoose.Types.ObjectId(ID_Bicicleta);
    const StationObjectID = new mongoose.Types.ObjectId(ID_Estacao);

    const station: InterfaceStation | null = await Station.findById(StationObjectID);
    
    if(station!=null){
        const newBike: InterfaceBike | null = await Bike.findByIdAndUpdate(BikeObjectID, {ID_EstacaoAtual: StationObjectID}, {new: true});
        return newBike;
    }
    return null;
}

export default UpdateBikeStation;