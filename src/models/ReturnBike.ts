import mongoose, { Schema, Document } from 'mongoose';

interface InterfaceReturnBike extends Document {
    ID_Usuario: mongoose.Types.ObjectId;
    ID_Estacao: mongoose.Types.ObjectId;
    ID_Bicicleta: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt?: Date;
}

const ReturnBikeSchema = new Schema<InterfaceReturnBike>(
    {
        ID_Usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        ID_Estacao: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Station',
            required: true,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        ID_Bicicleta: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bike',
            required: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }
    },
    {
        timestamps: true,
    }
);

const databaseDevolverBicicleta = 'ReturnBike'
const BorrowBike = mongoose.model<InterfaceReturnBike>(databaseDevolverBicicleta, ReturnBikeSchema);

export default BorrowBike;
export { InterfaceReturnBike };