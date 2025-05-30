// migration for SkaterStats
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SkaterStats', {
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
      penaltyMinutes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      timeOnIce: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('SkaterStats', ['playerId', 'gameId'], {
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SkaterStats');
  }
};
