import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function login(req, res) {
    const { email, senha } = req.body;
    console.log("acessou metodo post /login");
    try {
        const user = await User.findOne({email: email});
        
        if (!user) {
            
            // Usuário não encontrado
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        console.log(senha);
        console.log(user.senha);

        // Comparar a senha fornecida com o hash salvo no banco
        // const isPasswordValid = await bcrypt.compare(senha, user.senha);
        const isPasswordValid = (senha == user.senha);
        if (!isPasswordValid) {
            // Senha incorreta
            return res.status(401).json({ error: "Senha incorreta" });
        }
          /*  if (senha !== user.senha) {
                return res.status(401).json({ error: "Senha incorreta" });
            }*/

        const token = jwt.sign(
            { id: user.id, cpf_cnpj: user.cpf_cnpj, email: user.email, tipo: user.tipo }, // dados do payload
            "seuSegredoSuperSecreto",
            { expiresIn: "3h" }
        ); //gerando token com validade de 1 hora;

        // Login bem-sucedido
        res.status(200).json({ message: "Login bem-sucedido", user , token});
        console.log("sucesso no login");
    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ error: "Erro ao processar login" });
    }
};

export default login;