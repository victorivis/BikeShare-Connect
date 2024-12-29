import { sequelize } from "../../database/sequelize.js";
import { DataTypes } from "sequelize";

const Estacao = sequelize.define(
    'estacao',
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: {
          type: DataTypes.STRING(100),
        },
        foto: {
          type: DataTypes.BLOB,
        },
        localizacao: {
          type: DataTypes.GEOMETRY,
        },
    },
    {
        tableName: 'estacao',
        timestamps: false
    }
);

export default Estacao;