import mongoose from "../../database/mongoose";
import { Document, Schema } from "mongoose";

interface InterfaceUser extends Document {
    tipo: 'Comum' | 'Administrador de Bicicletas' | 'Administrador Geral';
    cpf_cnpj: string;
    nome: string;
    telefone?: string;
    senha: string;
    endereco?: string;
    email: string;
    fotoPerfil?: Buffer;
}

const userSchema = new Schema<InterfaceUser>({
    tipo: {
        type: String,
        enum: ['Comum', 'Administrador de Bicicletas', 'Administrador Geral'],
        required: true
    },
    cpf_cnpj: {
        type: String,
        maxlength: 14,
        required: true,
        unique: true,
    },
    nome: {
        type: String,
        maxlength: 100,
        required: true,
    },
    telefone: {
        type: String,
        maxlength: 11,
        required: false,
    },
    senha: {
        type: String,
        maxlength: 100,
        required: true,
    },
    endereco: {
        type: String,
    },
    email: {
        type: String,
        maxlength: 100,
        required: true,
        unique: true,
    },
    fotoPerfil: {
        type: Buffer,
    },
});

userSchema.index({ cpf_cnpj: 1, email: 1 });

const databaseUsuario = 'Usuario';
const User = mongoose.model<InterfaceUser>(databaseUsuario, userSchema);

export default User;
export { InterfaceUser, databaseUsuario };