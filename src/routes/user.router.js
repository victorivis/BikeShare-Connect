import { Router } from "express";

const routesUser = Router();

import viewUserController from "../controller/viewUserController.js";
import createUserController from "../controller/createUserController.js";
import deleteUserController from "../controller/deleteUserController.js";
import updateUserController from "../controller/updateUserController.js";
import login from "../controller/login.js";

import getUserByCpfCnpj from "../controller/getUserByCpfCnpj.js";
import getUserByEmail from "../controller/getUserByEmail.js";

import multer from "multer";
const formData = multer();

routesUser.get("/users", viewUserController);
routesUser.post("/users", formData.single("fotoPerfil"), createUserController);
routesUser.delete("/users/:id", deleteUserController);
routesUser.put("/users/:id", formData.single("fotoPerfil"), updateUserController);
routesUser.post("/login", login);

routesUser.get("/users/cpfCnpj/:cpfCnpj", getUserByCpfCnpj);
routesUser.get("/users/email/:email", getUserByEmail);

export default routesUser;

/*{
    "tipo": "Comum",
    "cpf_cnpj": "12345678901",
    "nome": "João Silva",
    "telefone": "11987654321",
    "senha": "minhaSenhaSegura",
    "endereco": "Rua das Flores, 123 - São Paulo, SP",
    "email": "joao.silva@email.com",
    "fotoPerfil": ""
}*/