'use strict';

const { updateSeasonStats } = require('../utils/updateSeasonStats');

module.exports = {
  async up (queryInterface, Sequelize) {
    // Set the season you're seeding for (can be dynamic if needed)
    const season = '2024-25';
    await updateSeasonStats(season);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PlayerSeasonStats', null, {});
  }
};
