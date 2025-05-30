'use strict';

const db = require('../models'); // ensures models are initialized via Sequelize
const { GoalEvents, PlayerStats } = db;

module.exports = {
  async up(queryInterface, Sequelize) {
    const goalEvents = await GoalEvents.findAll();
    const statsMap = new Map();

    for (const event of goalEvents) {
      const gameId = event.gameId;

      // Handle scorer
      const scorerKey = `${event.scorerId}_${gameId}`;
      if (!statsMap.has(scorerKey)) {
        statsMap.set(scorerKey, { playerId: event.scorerId, gameId, goals: 0, assists: 0 });
      }
      statsMap.get(scorerKey).goals += 1;

      // Handle assists
      for (const assistId of event.assistIds || []) {
        const assistKey = `${assistId}_${gameId}`;
        if (!statsMap.has(assistKey)) {
          statsMap.set(assistKey, { playerId: assistId, gameId, goals: 0, assists: 0 });
        }
        statsMap.get(assistKey).assists += 1;
      }
    }

    const timestamp = new Date();
    const formattedStats = Array.from(statsMap.values()).map(stat => ({
      ...stat,
      createdAt: timestamp,
      updatedAt: timestamp
    }));

    await queryInterface.bulkInsert('SkaterStats', formattedStats, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SkaterStats', null, {});
  }
};
