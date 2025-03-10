import mongoose from "mongoose";
import ReturnBike, { InterfaceReturnBike } from "../models/ReturnBike"

async function CountBorrowBikeByStationID(ID_Estacao: string) {
    const ObjectID = new mongoose.Types.ObjectId(ID_Estacao);
    const count = await ReturnBike.countDocuments({ ID_Estacao: ObjectID });
    return count;
}

export default CountBorrowBikeByStationID;