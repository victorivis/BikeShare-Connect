import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface UserRequest extends Request {
  body: {
    email: string;
    senha: string;
  };
}

async function login(req: UserRequest, res: Response): Promise<void> {
  const { email, senha } = req.body;
  console.log("acessou metodo post /login");
  try {
    const user = await User.findOne({ email: email });
    
    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado" });
      return;
    }
    console.log(senha);
    console.log(user.senha);

    // Comparar a senha fornecida com o hash salvo no banco
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Senha incorreta" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, cpf_cnpj: user.cpf_cnpj, email: user.email, tipo: user.tipo }, // dados do payload
      "seuSegredoSuperSecreto",
      { expiresIn: "2h" }
    ); // gerando token com validade de 2 horas

    res.status(200).json({ message: "Login bem-sucedido", user, token });
    console.log("sucesso no login");
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro ao processar login" });
  }
};

export default login;
