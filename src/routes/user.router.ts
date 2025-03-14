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
import findUserByID from "../controller/findUserByIDController.js";

//middlewares
import validateCpfCnpj from "../middleware/validateCpfCnpj";
import isAdmin from "../middleware/isAdmin";
import isOwnUserOrAdmin from "../middleware/isOwnUserOrAdmin";
import validateUserPhone from "../middleware/validateUserPhone";
import validateUserEmail from "../middleware/validateUserEmail";
import isCreatingAdmin from "../middleware/isCreatingAdmin";

import multer from "multer";
const formData = multer();

//Para visualizacao no postman sem alguns mb de inteiros na foto de perfil
routesUser.get("/users/simplified", isAdmin, viewUserControllerSimplified);

routesUser.get("/users", isAdmin, viewUserController);
routesUser.post("/users", formData.single("fotoPerfil"), isCreatingAdmin, validateCpfCnpj, validateUserPhone, validateUserEmail, createUserController);
routesUser.delete("/users/:id", isAdmin, deleteUserController);
routesUser.patch("/users/:id", formData.single("fotoPerfil"), isOwnUserOrAdmin, validateUserPhone, validateUserEmail, updateUserController);
routesUser.post("/login", login);

routesUser.get("/users/:id", findUserByID);
routesUser.get("/users/cpfCnpj/:cpfCnpj", isAdmin, getUserByCpfCnpj);
routesUser.get("/users/email/:email", isAdmin, getUserByEmail);

export default routesUser;