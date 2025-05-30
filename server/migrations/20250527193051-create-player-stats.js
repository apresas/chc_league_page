'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlayerStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      teamId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      gameId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      goals: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      assists: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      shots: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      hits: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      faceoffWins: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      penaltyMinutes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PlayerStats');
  }
};
