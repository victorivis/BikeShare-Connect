import mongoose from "mongoose";
import BorrowBike, { InterfaceBorrowBike } from "../models/BorrowBike";

async function GetLastBorrowBikeByBikeID(ID_Bicicleta: string) {
    const borrowBike = await BorrowBike.find({ ID_Bicicleta })
      .sort({ created_at: -1 })
      .exec();

    const last = borrowBike.length-1;

    return borrowBike[last];
}

export default GetLastBorrowBikeByBikeID;