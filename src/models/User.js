import mongoose from "../../database/mongoose.js";

const {Schema} = mongoose;

const usuarioEsquema = new Schema({
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

usuarioEsquema.index({ cpf_cnpj: 1, email: 1 });

const User = mongoose.model('Usuario', usuarioEsquema);

export default User;