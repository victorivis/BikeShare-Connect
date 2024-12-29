import dotenv from "dotenv"
dotenv.config();

import DBconfig from "../config/config.js"
import {Sequelize} from "sequelize"

const nodeEnvironment = process.env.NODE_ENV || "development";
const databaseConfig = DBconfig[nodeEnvironment];

const sequelize = new Sequelize(
    databaseConfig.database,
    databaseConfig.username,
    databaseConfig.password,
    {
        host: databaseConfig.host,
        dialect: databaseConfig.dialect,
        port: databaseConfig.port,
        logging: databaseConfig.logging
    }
)

conectar();

async function conectar(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { sequelize };