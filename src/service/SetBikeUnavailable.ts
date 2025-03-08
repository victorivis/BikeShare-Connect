import mongoose from "mongoose";
import Bike, { InterfaceBike } from "../models/Bike";

async function SetBikeUnavailable(ID_Bicicleta: string) {
    const ObjectID = new mongoose.Types.ObjectId(ID_Bicicleta);
    const newBike: InterfaceBike | null = await Bike.findByIdAndUpdate(ObjectID, {disponivel: false}, {new: true});
    return newBike;
}

export default SetBikeUnavailable;