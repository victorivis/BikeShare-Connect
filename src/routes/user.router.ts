import { Router } from "express";

const routesUser = Router();

import viewUserController from "../controller/viewUserController";
import createUserController from "../controller/createUserController";
import deleteUserController from "../controller/deleteUserController";
import updateUserController from "../controller/updateUserController";
import viewUserControllerSimplified from "../controller/viewUserControllerSimplified";
import login from "../controller/login.js";

import getUserByCpfCnpj from "../controller/getUserByCpfCnpj";
import getUserByEmail from "../controller/getUserByEmail";

import multer from "multer";
const formData = multer();

//Para visualizacao no postman sem alguns mb de inteiros na foto de perfil
routesUser.get("/users/simplified", viewUserControllerSimplified);

routesUser.get("/users", viewUserController);
routesUser.post("/users", formData.single("fotoPerfil"), createUserController);
routesUser.delete("/users/:id", deleteUserController);
routesUser.put("/users/:id", formData.single("fotoPerfil"), updateUserController);
routesUser.post("/login", login);

routesUser.get("/users/cpfCnpj/:cpfCnpj", getUserByCpfCnpj);
routesUser.get("/users/email/:email", getUserByEmail);

export default routesUser;