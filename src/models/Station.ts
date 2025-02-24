import mongoose from "../../database/mongoose";
import { Document } from "mongoose";
import { Schema } from "mongoose";

const { Types } = mongoose;

interface InterfaceStation extends Document {
    nome: string;
    foto?: Buffer;
    localizacao: {
        type: string;
        coordinates: [number, number];
    };
    descricao?: string;
}

const stationSchema: Schema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 100,
    },
    foto: {
        type: Buffer,
    },
    localizacao: {
        type: { type: String, enum: ['Point'] },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
    },
    descricao: {
        type: String,
        maxlength: 500,
        required: false,
    },
});

stationSchema.index(
    { nome: "text" },
    { default_language: "pt" }
);

const Station = mongoose.model<InterfaceStation>('Station', stationSchema);
export default Station;
export { InterfaceStation };