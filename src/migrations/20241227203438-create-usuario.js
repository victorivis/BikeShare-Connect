import { Sequelize } from 'sequelize';

export default {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TYPE tipousuario AS ENUM (
        'Comum',
        'Administrador de Bicicletas',
        'Administrador Geral'
      );
    `);
    
    await queryInterface.createTable('usuario', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo: {
        type: 'tipousuario', // Usa o tipo ENUM criado
        allowNull: false,
      },
      cpf_cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
      },
      nome: {
        type: Sequelize.STRING(100),
      },
      telefone: {
        type: Sequelize.STRING(11),
      },
      senha: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING(100),
      },
      email: {
        type: Sequelize.STRING(100),
      },
      fotoPerfil: {
        type: Sequelize.BLOB,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('usuario');
    await queryInterface.sequelize.query('DROP TYPE tipousuario');
  },
};
