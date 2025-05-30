"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Games", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      homeTeamAbrev: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      awayTeamAbrev: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      homeScore: {
        type: Sequelize.INTEGER,
      },
      awayScore: {
        type: Sequelize.INTEGER,
      },
      final: {
        type: Sequelize.STRING,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Games");
  },
};
