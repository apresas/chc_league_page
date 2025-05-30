'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GoalieSeasonStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      playerId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      teamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      season: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gamesPlayed: Sequelize.INTEGER,
      shotsAgainst: Sequelize.INTEGER,
      saves: Sequelize.INTEGER,
      goalsAgainst: Sequelize.INTEGER,
      savePct: Sequelize.FLOAT,
      gaa: Sequelize.FLOAT,
      wins: Sequelize.INTEGER,
      shutouts: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('GoalieSeasonStats');
  },
};
