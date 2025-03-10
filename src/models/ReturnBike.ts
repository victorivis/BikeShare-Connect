import mongoose, { Schema, Document } from 'mongoose';
import { databaseEstacao } from './Station';
import { databaseUsuario } from './User';
import { databaseBicicleta } from './Bike';

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
            ref: databaseUsuario,
            required: true,
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT',
        },
        ID_Estacao: {
            type: mongoose.Schema.Types.ObjectId,
            ref: databaseEstacao,
            required: true,
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT',
        },
        ID_Bicicleta: {
            type: mongoose.Schema.Types.ObjectId,
            ref: databaseBicicleta,
            required: true,
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT',
        }
    },
    {
        timestamps: true,
    }
);

const databaseDevolverBicicleta = 'ReturnBike'
const ReturnBike = mongoose.model<InterfaceReturnBike>(databaseDevolverBicicleta, ReturnBikeSchema);

export default ReturnBike;
export { InterfaceReturnBike };