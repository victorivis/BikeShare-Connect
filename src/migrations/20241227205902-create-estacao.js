import { Sequelize } from 'sequelize';

export default {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis_topology;');

    await queryInterface.createTable('estacao', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      foto: {
        type: Sequelize.BLOB,
      },
      localizacao: {
        type: Sequelize.GEOMETRY,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('estacao');

    await queryInterface.sequelize.query('DROP EXTENSION postgis_topology;');
    await queryInterface.sequelize.query('DROP EXTENSION postgis;');
  },
};
