import { Sequelize } from 'sequelize';

export default {
  async up (queryInterface) {
    await queryInterface.createTable('bicicleta', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      disponivel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      estadoConservacao: {
        type: Sequelize.STRING,
      },
      foto: {
        type: Sequelize.BLOB,
      },
      ID_EstacaoAtual: {
        type: Sequelize.INTEGER,
        references: {
          model: 'estacao',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      ID_UsuarioDono: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuario',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('bicicleta');
  }
};
