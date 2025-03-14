import { Request, Response } from 'express';
import User, { redisUser } from "../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import client from '../../database/redis';
import { error } from 'console';

interface FileRequest extends Request {
  file?: Express.Multer.File;
}

async function updateUserController(req: FileRequest, res: Response): Promise<void> {
  try {
    if (req.file && req.file.buffer) {
      req.body.fotoPerfil = req.file.buffer;
    }
    // Se nao tiver fotoPerfil deleta a chave para manter a fotoPerfil antiga
    else {
      delete req.body.fotoPerfil;
    }

    const { id } = req.params;

    if(req.body.cpf_cnpj != undefined){
      res.status(400).json({error: "Não é possível alterar o CPF/CNPJ"});
      return;
    }

    if(req.body.senha){
      // Criptografa senha. 4 eh um numero legal
      const saltRounds = 4; 
      const hashedPassword = await bcrypt.hash(req.body.senha, saltRounds);
      req.body.senha = hashedPassword;
    }

    // Converte para o id para o tipo reconhecido no banco de dados
    const objectId = new mongoose.Types.ObjectId(id);
    const usuarioAtualizado = await User.findByIdAndUpdate(objectId, req.body, { new: true });

    if(!usuarioAtualizado){
      res.status(400).json({error: "Usuario nao existe"});
      return;
    }
    client.set(redisUser+id, JSON.stringify(usuarioAtualizado));

    res.status(200).json(usuarioAtualizado);
  } catch (error:any) {
    res.status(400).json(error);
    console.log(error);
  }
}

export default updateUserController;
