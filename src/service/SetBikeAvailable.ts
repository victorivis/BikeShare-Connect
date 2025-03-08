import mongoose from "mongoose";
import Bike, { InterfaceBike } from "../models/Bike";

async function SetBikeAvailable(ID_Bicicleta: string) {
    const ObjectID = new mongoose.Types.ObjectId(ID_Bicicleta);
    const newBike: InterfaceBike | null = await Bike.findByIdAndUpdate(ObjectID, {disponivel: true}, {new: true});
    return newBike;
}

export default SetBikeAvailable;