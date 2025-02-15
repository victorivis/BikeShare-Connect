import User from "../models/User.js";

async function getUserByCpfCnpj(req, res){
    try{
        const { cpfCnpj } = req.params;

        const usuario = await User.findOne({cpf_cnpj: cpfCnpj});
        res.status(200).json(usuario);
    } catch(error){
        res.status(400).json(error);
    }
}

export default getUserByCpfCnpj;