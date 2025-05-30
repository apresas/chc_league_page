'use strict';

const sequelize = require("../sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GoalEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      gameId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      team: {
        type: Sequelize.STRING,
        allowNull: false
      },
      period: {
        type: Sequelize.STRING,
        allowNull: false
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      scorerId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      assistIds: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GoalEvents');
  }
};
