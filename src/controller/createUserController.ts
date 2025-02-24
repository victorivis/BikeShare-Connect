import { Request, Response } from 'express';
import User, { InterfaceUser } from "../models/User";
import bcrypt from "bcrypt";

interface FileRequest extends Request {
  file?: Express.Multer.File;
}

async function createUserController(req: FileRequest, res: Response): Promise<void> {
  try {
    const fotoPerfil = req.file ? req.file.buffer : null;
    req.body.fotoPerfil = fotoPerfil;

    // Verificando se já existe um usuário com o mesmo CPF
    const usuarioCPF: InterfaceUser | null = await User.findOne({ cpf_cnpj: req.body.cpf_cnpj });
    if (usuarioCPF) {
      res.status(400).json({ error: "Já existe um usuário com esse CPF" });
      return;
    }

    // Verificando se já existe um usuário com o mesmo email
    const usuarioEmail: InterfaceUser | null = await User.findOne({ email: req.body.email });
    if (usuarioEmail) {
      res.status(400).json({ error: "Já existe um usuário com esse email" });
      return;
    }

    //Criptografa senha. 4 eh um numero legal
    const saltRounds = 4; 
    const hashedPassword = await bcrypt.hash(req.body.senha, saltRounds);
    req.body.senha = hashedPassword;
    
    const usuario: InterfaceUser = new User(req.body);
    await usuario.save();

    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export default createUserController;
