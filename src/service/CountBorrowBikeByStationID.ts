import mongoose from "mongoose";
import BorrowBike, { InterfaceBorrowBike } from "../models/BorrowBike";

async function CountBorrowBikeByStationID(ID_Estacao: string) {
    const ObjectID = new mongoose.Types.ObjectId(ID_Estacao);
    const count = await BorrowBike.countDocuments({ ID_Estacao: ObjectID });
    return count;
}

export default CountBorrowBikeByStationID;