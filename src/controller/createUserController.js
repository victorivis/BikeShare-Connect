import User from "../models/User.js";

async function createUserController(req, res){
    try{
        const fotoPerfil = req.file != null ? req.file.buffer : "";
        req.body.fotoPerfil = fotoPerfil;

        const usuarioCPF = await User.findOne({cpf_cnpj: req.body.cpf_cnpj});
        if(!usuarioCPF == false){
            res.status(400).json("Ja existe um usuario com esse CPF");
            return;
        }

        const usuarioEmail = await User.findOne({email: req.body.email});
        if(!usuarioEmail == false){
            res.status(400).json("Ja existe um usuario com esse email");
            return;
        }

        const usuario = new User(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    } catch(error){
        res.status(400).json(error);
        console.log(error);
    }
}

export default createUserController;