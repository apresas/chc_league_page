'use strict';

const { Op } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    const { Game, TeamStandings } = require('../models');
    const season = '2024-25';

    // Get all completed games
    const games = await Game.findAll({
      where: {
        status: { [Op.ne]: 'scheduled' }
      }
    });

    const teamStats = {};

    for (const game of games) {
      const {
        homeTeamId,
        awayTeamId,
        homeScore,
        awayScore,
        status
      } = game;

      // Initialize teams
      [homeTeamId, awayTeamId].forEach((teamId) => {
        if (!teamStats[teamId]) {
          teamStats[teamId] = {
            teamId,
            season,
            gamesPlayed: 0,
            wins: 0,
            losses: 0,
            otLosses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0
          };
        }
      });

      const home = teamStats[homeTeamId];
      const away = teamStats[awayTeamId];

      home.gamesPlayed += 1;
      away.gamesPlayed += 1;

      home.goalsFor += homeScore;
      home.goalsAgainst += awayScore;

      away.goalsFor += awayScore;
      away.goalsAgainst += homeScore;

      const isOT = status === 'OT Final' || status === 'SO Final';

      if (homeScore > awayScore) {
        home.wins += 1;
        home.points += 2;
        if (isOT) {
          away.otLosses += 1;
          away.points += 1;
        } else {
          away.losses += 1;
        }
      } else {
        away.wins += 1;
        away.points += 2;
        if (isOT) {
          home.otLosses += 1;
          home.points += 1;
        } else {
          home.losses += 1;
        }
      }
    }

    // Clean and insert
    await TeamStandings.destroy({ where: { season } });

    const final = Object.values(teamStats);
    await TeamStandings.bulkCreate(final);

    console.log(`✅ Seeded TeamStandings for ${final.length} teams`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TeamStandings', null, {});
  }
};
