"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn("Games", "homeTeamAbrev", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("Games", "awayTeamAbrev", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn("Games", "homeTeamAbrev"),
      queryInterface.removeColumn("Games", "awayTeamAbrev"),
    ]);
  },
};
