'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('PlayerSeasonStats', 'playerId', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('PlayerSeasonStats', 'playerId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
