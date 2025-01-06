import express from "express"

import { getEstacao, createEstacao, geomFromText, deleteEstacao } from "./funcoesEstacao.js";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "./userController.js";
import { getBicicleta, createBicicleta, filtrarBicicleta, retirarBicicleta, devolverBicicleta } from "./funcoesBicicleta.js";

import multer from 'multer';
import cors from 'cors';

const formData = multer();
const server = new express();
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true}))

const port = 3000;
const ip = "localhost";

    /* Rotas estacoes */

//Recebe as estacoes sem crashar o PostMan
server.get("/reduzido", async (req, res, next) => {
    try{
        const resposta = await getEstacao();

        resposta.forEach((elemento) => {elemento.foto = ""})
        return res.status(200).json({message: resposta});
    }
    catch(erro){
        res.status(500).json({error: "Could not contact server database"});
    }
});

server.get("/estacao", async (req, res, next) => {
        try{
            const resposta = await getEstacao();
            return res.status(200).json({message: resposta});
        }
        catch(erro){
            res.status(500).json({error: "Could not contact server database"});
        }
    }
);

//Localizacao deve ser do tipo: "'POINT(-43.2096 -22.9035)', 4326"
server.post('/estacao', formData.single('foto'), async (req, res, next) => {
    try{
        const geometria = await geomFromText(req.body.localizacao);
        const foto = req.file != null ? req.file.buffer : "";

        const novaEstacao = {
            nome: req.body.nome,
            foto: foto,
            localizacao: geometria
        }
        await createEstacao(novaEstacao);

        return res.status(200).json({message: "Estacao created sucessfully"});
    }
    catch(erro){
        res.status(400).json({error: "Could not create object"});
    }
});

server.delete("/estacao/:id", async (req, res, next) => {
    const { id } = req.params;
    try{
        const resultado = await deleteEstacao(id);
        if(resultado > 0){
            res.status(200).json({message: "Estacao deleted sucessfully"});
        }
        else{
            res.status(400).json({error: "informed id is not valid"});
        }
    }
    catch(erro){
        res.status(500).json({error: "Some error on deleting has occurred"});
    }
});



    /* Rotas usuarios */

server.get("/users", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
    }
});


// Rota para obter um usuário pelo ID
server.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user" });
    }
});

// Rota para criar um novo usuário
server.post("/users", async (req, res) => {
    console.log("Received body:", req.body); // Log dos dados enviados
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error in POST /users:", error); // Log detalhado do erro
        res.status(400).json({ error: "Failed to create user" });
    }
});


// Rota para atualizar um usuário
server.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await updateUser(id, req.body);
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: "Failed to update user" });
    }
});

// Rota para deletar um usuário
server.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteUser(id);
        if (!deleted) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

    /* Rotas estacao */

server.get("/bicicleta", async (req, res, next) => {
    try{
        const resposta = await getBicicleta();
        return res.status(200).json({message: resposta});
    }
    catch(erro){
        res.status(500).json({error: "Could not contact server database"});
    }
});

server.post('/bicicleta', async (req, res, next) => {
    try{
        await createBicicleta(req.body);

        return res.status(200).json({message: "Estacao created sucessfully"});
    }
    catch(erro){
        res.status(400).json({error: "Could not create object"});
    }
});

server.get("/bicicleta/:id", async (req, res, next) => {
    const { id } = req.params;
    try{
        const resposta = await filtrarBicicleta(id);
        return res.status(200).json({message: resposta});
    }
    catch(erro){
        res.status(400).json({error: "Could not find desired bicicleta"});
    }
});

server.post("/retirarBicicleta", async (req, res, next) => {
    try{
        const { ID_Usuario, ID_Bicicleta } = req.body;
        console.log(ID_Usuario, ID_Bicicleta)
        const resposta = await retirarBicicleta(ID_Usuario, ID_Bicicleta);
        return res.status(200).json({message: resposta});
    }
    catch(erro){
        res.status(400).json({error: "Can't retirar bicicleta"});
    }
});

server.post("/retirarBicicleta", async (req, res, next) => {
    try{
        const { ID_Usuario, ID_Bicicleta } = req.body;
        console.log(ID_Usuario, ID_Bicicleta)
        const resposta = await retirarBicicleta(ID_Usuario, ID_Bicicleta);
        return res.status(200).json({message: resposta});
    }
    catch(erro){
        res.status(400).json({error: "Can't retirar bicicleta"});
    }
});

server.post("/devolverBicicleta", async (req, res, next) => {
    try{
        const { ID_Usuario, ID_Bicicleta, ID_Estacao, comentarios } = req.body;
        console.log(ID_Usuario, ID_Bicicleta)
        const resposta = await devolverBicicleta(ID_Usuario, ID_Bicicleta, ID_Estacao, comentarios);
        return res.status(200).json({message: resposta});
    }
    catch(erro){
        res.status(400).json({error: "Can't retirar bicicleta"});
    }
});

console.log(`Listening on port: ${port}`);
server.listen(port, ip);

console.log("Uau");