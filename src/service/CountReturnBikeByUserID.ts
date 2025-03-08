import mongoose from "mongoose";
import ReturnBike, { InterfaceReturnBike } from "../models/ReturnBike";

async function CountReturnBikeByUserID(ID_Usuario: string) {
    const ObjectID = new mongoose.Types.ObjectId(ID_Usuario);
    const count = await ReturnBike.countDocuments({ ID_Usuario: ObjectID });
    return count;
}

export default CountReturnBikeByUserID;