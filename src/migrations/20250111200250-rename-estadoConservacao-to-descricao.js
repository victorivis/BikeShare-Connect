import { Sequelize } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('bicicleta', 'estadoConservacao', 'descricao');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('bicicleta', 'descricao', 'estadoConservacao');
  }
};
