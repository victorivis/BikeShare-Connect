import { sequelize } from "../../database/sequelize.js";
import { DataTypes } from "sequelize";

const Bicicleta = sequelize.define(
    'bicicleta', 
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      disponivel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      estadoConservacao: {
        type: DataTypes.STRING,
      },
      foto: {
        type: DataTypes.BLOB,
      },
      ID_EstacaoAtual: {
        type: DataTypes.INTEGER,
        references: {
          model: 'estacao',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      ID_UsuarioDono: {
        type: DataTypes.INTEGER,
        references: {
          model: 'usuario',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        allowNull: false,
      },
    },
    {
        tableName: 'bicicleta',
        timestamps: false
    }
);

export default Bicicleta;