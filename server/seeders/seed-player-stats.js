'use strict';
const { updatePlayerStats } = require('../utils/updatePlayerStats');
const { Game, GoalEvents, GameEvents, PlayerStats } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    const games = await Game.findAll();
    for (const game of games) {
      await updatePlayerStats(game.id, { GoalEvents, GameEvents, PlayerStats });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PlayerStats', null, {});
  }
};
