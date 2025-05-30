'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlayerSeasonStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      teamId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      season: {
        type: Sequelize.STRING, // e.g., "2024-25"
        allowNull: false
      },
      totalGoals: Sequelize.INTEGER,
      totalAssists: Sequelize.INTEGER,
      totalShots: Sequelize.INTEGER,
      totalHits: Sequelize.INTEGER,
      totalFaceoffWins: Sequelize.INTEGER,
      totalPenaltyMinutes: Sequelize.INTEGER,
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

  async down(queryInterface) {
    await queryInterface.dropTable('PlayerSeasonStats');
  }
};
