import mongoose from "mongoose";
import BorrowBike, { InterfaceBorrowBike } from "../models/BorrowBike";

async function GetLastBorrowBikeByBikeID(ID_Bicicleta: string) {
    const borrowBike = await BorrowBike.findOne({ ID_Bicicleta })
      .sort({ created_at: -1 })
      .exec();

    return borrowBike;
}

export default GetLastBorrowBikeByBikeID;