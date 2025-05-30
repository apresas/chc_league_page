'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GoalieStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Players',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      gameId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Games',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      shotsAgainst: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      saves: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      goalsAgainst: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      savePercentage: Sequelize.FLOAT,
      timeOnIce: Sequelize.INTEGER,
      shutout: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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

    await queryInterface.addIndex('GoalieStats', ['playerId', 'gameId'], {
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GoalieStats');
  }
};
