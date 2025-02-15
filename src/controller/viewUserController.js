import User from "../models/User.js";

async function viewUserController(req, res){
    try{
        const usuario = await User.find({});
        res.status(200).json(usuario);
    } catch(error){
        res.status(400).json(error);
    }
}

export default viewUserController;