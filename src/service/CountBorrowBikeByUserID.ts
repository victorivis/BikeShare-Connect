import mongoose from "mongoose";
import BorrowBike, { InterfaceBorrowBike } from "../models/BorrowBike";

async function CountBorrowBikeByUserID(ID_Usuario: string) {
    const ObjectID = new mongoose.Types.ObjectId(ID_Usuario);
    const count = await BorrowBike.countDocuments({ ID_Usuario: ObjectID });
    return count;
}

export default CountBorrowBikeByUserID;