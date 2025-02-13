import mongoose from "../../database/mongoose.js";

const {Schema} = mongoose;

const estacaoEsquema = new Schema({
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


estacaoEsquema.index(
    {nome: "text"},
    {default_language: "pt"}
);

const Estacao = mongoose.model('Estacao', estacaoEsquema);
export default Estacao;