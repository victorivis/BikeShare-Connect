import mongoose, { Schema, Document } from 'mongoose';
import { databaseBicicleta } from './Bike';
import { databaseEstacao } from './Station';
import { databaseUsuario } from './User';

interface InterfaceBorrowBike extends Document {
    ID_Usuario: mongoose.Types.ObjectId;
    ID_Estacao: mongoose.Types.ObjectId;
    ID_Bicicleta: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt?: Date;
}

const BorrowBikeSchema = new Schema<InterfaceBorrowBike>(
    {
        ID_Usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: databaseUsuario,
            required: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        ID_Estacao: {
            type: mongoose.Schema.Types.ObjectId,
            ref: databaseEstacao,
            required: true,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        ID_Bicicleta: {
            type: mongoose.Schema.Types.ObjectId,
            ref: databaseBicicleta,
            required: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }
    },
    {
        timestamps: true,
    }
);

const databaseRetirarBicicleta = 'BorrowBike'
const BorrowBike = mongoose.model<InterfaceBorrowBike>(databaseRetirarBicicleta, BorrowBikeSchema);

export default BorrowBike;
export { InterfaceBorrowBike };