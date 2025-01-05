import { sequelize } from "../../database/sequelize.js";
import { DataTypes } from "sequelize";

const RetirarBicicleta = sequelize.define(
    'retirar_bicicleta',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ID_Usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: 'usuario',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
        },
        ID_Estacao: {
            type: DataTypes.INTEGER,
            references: {
                model: 'estacao',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false,
        },
        ID_Bicicleta: {
            type: DataTypes.INTEGER,
            references: {
                model: 'bicicleta',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
        },
        horarioRetirada: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        dataRetirada: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        tableName: 'retirar_bicicleta',
        timestamps: false,
    }
);

export default RetirarBicicleta;
