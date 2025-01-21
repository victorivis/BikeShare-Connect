import { sequelize } from "../../database/sequelize.js";
import Estacao from "../models/estacaoModel.js"

async function getEstacao(){
    return await Estacao.findAll();
}

async function createEstacao(objeto){
    try{
        await Estacao.create(objeto);
    }
    catch(error){
        throw new Error("Error creating object");
    }
}

async function deleteEstacao(id) {
    try{
        return await Estacao.destroy({
            where: {
                id: id
            }
        });
    }
    catch(erro){
        throw new Error(`Could not delete object with id ${id}`);
    }
}

async function updateEstacao(id, data) {
    const estacao = await Estacao.findByPk(id);  // Encontra o usuário pelo ID
    if (!estacao) return null;

    try {
        const updatedUser = await estacao.update(data);
        return updatedUser;
    } catch (error) {
        console.error("Error updating estacao:", error);
        throw new Error("Failed to update estacao");
    }
}

//Depois corrigir para prevenir SQL injection
async function geomFromText(texto){
    const [resposta, metadados] = await sequelize.query(`SELECT * FROM ST_GeomFromText(${texto}) as local`);
    return resposta[0].local;
}

export { getEstacao, createEstacao, geomFromText, deleteEstacao, updateEstacao };