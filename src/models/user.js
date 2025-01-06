
import { sequelize } from "../../database/sequelize.js";
import { DataTypes } from "sequelize";


const User = sequelize.define('usuario',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.ENUM('Comum',
                'Administrador de Bicicletas',
                'Administrador Geral'), // valores possíveis
            allowNull: false,
        },
        cpf_cnpj: {
            type: DataTypes.STRING(14),
            allowNull: false,
            unique: true,
        },
        nome: {
            type: DataTypes.STRING(100),
        },
        telefone: {
            type: DataTypes.STRING(11),
        },
        senha: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING(100),
        },
        email: {
            type: DataTypes.STRING(100),
        },
        fotoPerfil: {
            type: DataTypes.BLOB,
        },
    },
    {
        tableName: 'usuario', // Nome da tabela no banco
        timestamps: false, // Cria campos createdAt e updatedAt
    }
);

export default User;

