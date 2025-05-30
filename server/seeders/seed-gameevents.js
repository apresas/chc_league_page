'use strict';

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.resolve(__dirname, '../../client/src/data/gameEvents_seed.json');
    const raw = fs.readFileSync(filePath);
    const data = JSON.parse(raw);

    const events = data.map(e => ({
      id: uuidv4(),
      gameId: e.gameId,
      period: e.period,
      time: e.time,
      type: e.type,
      teamId: e.teamId,
      playerId: e.playerId,
      description: e.description,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('GameEvents', events, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GameEvents', null, {});
  }
};
