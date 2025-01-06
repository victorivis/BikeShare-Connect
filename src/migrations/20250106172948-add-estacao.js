import { Sequelize } from 'sequelize';

export default {
  up: async (queryInterface) => {
    await queryInterface.addColumn('estacao', 'descricao', {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('estacao', 'descricao');
  },
};