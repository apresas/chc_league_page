'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Games', 'homeStartingGoalieId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Games', 'awayStartingGoalieId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Games', 'homeStartingGoalieId');
    await queryInterface.removeColumn('Games', 'awayStartingGoalieId');
  }
};
