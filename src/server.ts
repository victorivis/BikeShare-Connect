import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';

import routes from './routes/all.routes';

const formData = multer();
const server = express();

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

//Rotas da API
server.use(routes);

const port = 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
