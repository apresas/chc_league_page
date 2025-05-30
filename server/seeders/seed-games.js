'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, "../../client/src/data/gameSchedule.json"); // update path
    const rawData = fs.readFileSync(filePath);
    const schedule = JSON.parse(rawData);

    const games = schedule.map(g => ({
      id: g.gameId,
      date: g.date,
      homeTeamId: g.home.teamId,
      awayTeamId: g.away.teamId,
      homeTeamAbrev: g.home.abrev,
      awayTeamAbrev: g.away.abrev,
      homeScore: g.home.score ?? null,
      awayScore: g.away.score ?? null,
      status: g.status,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Games', games, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {});
  }
};
