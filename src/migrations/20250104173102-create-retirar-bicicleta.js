import { Sequelize } from 'sequelize';

export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('retirar_bicicleta', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ID_Usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuario',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      ID_Estacao: {
        type: Sequelize.INTEGER,
        references: {
          model: 'estacao',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      ID_Bicicleta: {
        type: Sequelize.INTEGER,
        references: {
          model: 'bicicleta',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      horarioRetirada: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      dataRetirada: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('retirar_bicicleta');
  }
};
