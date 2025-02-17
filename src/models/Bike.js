import mongoose from "../../database/mongoose.js";

const { Schema } = mongoose;

const bicicletaEsquema = new Schema({
    disponivel: {
        type: Boolean,
        required: true,
    },
    descricao: {
        type: String,
        maxlength: 500,
    },
    foto: {
        type: Buffer,
    },
    ID_EstacaoAtual: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Estacao",
        default: null,
    },
    ID_UsuarioDono: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
},);

bicicletaEsquema.index(
    {nome: "text"},
    {default_language: "pt"}
);

const Bicicleta = mongoose.model("Bicicleta", bicicletaEsquema);
export default Bicicleta;