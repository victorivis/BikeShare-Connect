import express from 'express';
import multer from 'multer';
import cors from 'cors';

import routes from './routes/all.routes.js';

const formData = multer();
const server = new express();
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true}))
server.use(express.json());

//Rotas da API
server.use(routes);

const port = 3000;

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});