import { where } from "sequelize";
import { sequelize } from "../../database/sequelize.js";
import Bicicleta from "../models/bicicletaModel.js"
import DevolverBicicleta from "../models/devolverBicicletaModel.js";
import RetirarBicicleta from "../models/retirarBicicletaModel.js";

async function getBicicleta(){
    return await Bicicleta.findAll();
}

async function filtrarBicicleta(id) {
    const resposta = await Bicicleta.findOne({where: {id: id}});
    if(resposta == null){
        throw new Error("Error creating object");
    }
    return resposta;
}

async function createBicicleta(objeto){
    try{
        if(!objeto.ID_EstacaoAtual){
            throw new Error("Error ID_EstacaoAtual can't be null");
        }
        await Bicicleta.create(objeto);
    }
    catch(error){
        throw new Error("Error creating object");
    }
}

async function deleteBicicleta(id) {
    try{
        return await Bicicleta.destroy({where: {id: id}});
    }
    catch(error){
        throw new Error("Error deleting object");
    }
}

async function retirarBicicleta(ID_Usuario, ID_Bicicleta) {
    try{
        const bicicleta = await filtrarBicicleta(ID_Bicicleta);
        const disponivel = bicicleta.dataValues.disponivel;
        const estacaoAtual = bicicleta.dataValues.ID_EstacaoAtual;
        if(!disponivel || !estacaoAtual){
            throw new Error("Bicleta or Usuario is not available");
        }

        const dataAtual = new Date();
        const horario = dataAtual.toTimeString().split(' ')[0];
        
        const novaBicicletaRetirada = {
            ID_Usuario: ID_Usuario,
            ID_Estacao: bicicleta.ID_EstacaoAtual,
            ID_Bicicleta: bicicleta.id,
            horarioRetirada: horario,
            dataRetirada: dataAtual,
        }
        const resposta = await RetirarBicicleta.create(novaBicicletaRetirada);

        bicicleta.disponivel = false;
        bicicleta.ID_EstacaoAtual = null;
        await bicicleta.save();

        return resposta;
    }
    catch(error){
        throw new Error("Can't retirar bicicleta");
    }
}

async function devolverBicicleta(ID_Usuario, ID_Bicicleta, ID_Estacao, comentarios) {
    try{
        const bicicleta = await filtrarBicicleta(ID_Bicicleta);

        if(!bicicleta || bicicleta.ID_EstacaoAtual){
            throw new Error("Can't return bicicleta. It's already on a station.");
        }

        const dataAtual = new Date();
        const horario = dataAtual.toTimeString().split(' ')[0];
        
        const novaBiciceltaDevolvida = {
            ID_Usuario: ID_Usuario,
            ID_Estacao: ID_Estacao,
            ID_Bicicleta: bicicleta.id,
            horarioDevolucao: horario,
            dataDevolucao: dataAtual,
            comentarios: comentarios
        }
        const resposta = await DevolverBicicleta.create(novaBiciceltaDevolvida);

        bicicleta.disponivel = true;
        bicicleta.ID_EstacaoAtual = ID_Estacao;
        await bicicleta.save();

        return resposta;
    }
    catch(error){
        throw new Error("Can't devolver bicicleta");
    }
}

async function BicicletasEstacao(ID_Estacao) {
    return await Bicicleta.findAll({where:{ID_EstacaoAtual: ID_Estacao}});
}

async function historicoEstacao(ID_Estacao) {
    try{
        //const bicicleta = await filtrarBicicleta(ID_Bicicleta);
        const r = RetirarBicicleta.findAll({where: {ID_Estacao: ID_Estacao}});
        const d = DevolverBicicleta.findAll({where: {ID_Estacao: ID_Estacao}});

        console.log(r);
        console.log(d);
    }
    catch(error){
        throw new Error("Can't devolver bicicleta");
    }
}

export { getBicicleta, createBicicleta, filtrarBicicleta, devolverBicicleta, retirarBicicleta, deleteBicicleta };