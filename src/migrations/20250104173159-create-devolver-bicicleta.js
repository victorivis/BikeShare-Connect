import { Sequelize } from 'sequelize';

export default {
  async up (queryInterface) {
    await queryInterface.createTable('devolver_bicicleta', {
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
      horarioDevolucao: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      dataDevolucao: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      comentarios: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('devolver_bicicleta');
  }
};
