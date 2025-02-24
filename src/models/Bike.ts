import mongoose, { Document, Schema } from "mongoose";

interface InterfaceBicicleta extends Document {
  disponivel: boolean;
  descricao?: string;
  foto?: Buffer;
  ID_EstacaoAtual: mongoose.Schema.Types.ObjectId | null;
  ID_UsuarioDono: mongoose.Schema.Types.ObjectId;
}

const bicicletaEsquema = new Schema<InterfaceBicicleta>({
    disponivel: { 
        type: Boolean, required: true 
    },
    descricao: { 
        type: String, maxlength: 500 
    },
    foto: {
        type: Buffer 
    },
    ID_EstacaoAtual: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Estacao", 
        default: null 
    },
    ID_UsuarioDono: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Usuario", 
        required: true 
    }
});

bicicletaEsquema.index(
    {descricao: "text"},
    {default_language: "pt"}
);

const Bicicleta = mongoose.model<InterfaceBicicleta>("Bicicleta", bicicletaEsquema);
export default Bicicleta;
export { InterfaceBicicleta };