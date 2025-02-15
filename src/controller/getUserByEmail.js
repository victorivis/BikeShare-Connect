import User from "../models/User.js";

async function getUserByEmail(req, res){
    try{
        const { email } = req.params;

        const usuario = await User.findOne({email: email});
        res.status(200).json(usuario);
    } catch(error){
        res.status(400).json(error);
    }
}

export default getUserByEmail;