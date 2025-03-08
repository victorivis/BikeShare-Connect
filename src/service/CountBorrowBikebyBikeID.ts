import mongoose from "mongoose";
import BorrowBike, { InterfaceBorrowBike } from "../models/BorrowBike";

async function CountBorrowBikeByBikeID(ID_Bicicleta: string) {
    const ObjectID = new mongoose.Types.ObjectId(ID_Bicicleta);
    const count = await BorrowBike.countDocuments({ ID_Bicicleta: ObjectID });
    return count;
}

export default CountBorrowBikeByBikeID;