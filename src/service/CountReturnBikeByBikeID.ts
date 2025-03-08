import mongoose from "mongoose";
import ReturnBike, { InterfaceReturnBike } from "../models/ReturnBike";

async function CountReturnBikeByBikeID(ID_Bicicleta: string) {
    const ObjectID = new mongoose.Types.ObjectId(ID_Bicicleta);
    const count = await ReturnBike.countDocuments({ ID_Bicicleta: ObjectID });
    return count;
}

export default CountReturnBikeByBikeID;