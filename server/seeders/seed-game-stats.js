"use strict";

const { Game, GameEvents, GameStats } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const games = await Game.findAll({
      where: {
        status: {
          [Sequelize.Op.ne]: "scheduled",
        },
      },
    });

    for (const game of games) {
      const events = await GameEvents.findAll({
        where: { gameId: game.id },
      });

      const initial = {
        homeShotsFor: 0,
        awayShotsFor: 0,
        homeHits: 0,
        awayHits: 0,
        homeFaceoffsWon: 0,
        awayFaceoffsWon: 0,
        homePowerplayGoals: 0,
        awayPowerplayGoals: 0,
        homePowerplayOpportunities: 0,
        awayPowerplayOpportunities: 0,
        homePenaltyMinutes: 0,
        awayPenaltyMinutes: 0,
      };

      const homeId = game.homeTeamId;
      const awayId = game.awayTeamId;

      for (const e of events) {
        const isHome = e.teamId === homeId;
        const key = isHome ? "home" : "away";

        switch (e.type) {
          case "shot":
            initial[`${key}ShotsFor`]++;
            break;
          case "hit":
            initial[`${key}Hits`]++;
            break;
          case "faceoff":
            initial[`${key}FaceoffsWon`]++;
            break;
          case "penalty":
            // Assume penaltyType is "minor" or "major"
            const minutes = e.penaltyType === "major" ? 5 : 2;
            initial[`${key}PenaltyMinutes`] += minutes;
            initial[`${key}PowerplayOpportunities`]++;
            break;
          case "goal":
            if (e.powerPlay) {
              initial[`${key}PowerplayGoals`]++;
            }
            break;
        }
      }

      await GameStats.upsert({
        gameId: game.id,
        ...initial,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("GameStats", null, {});
  },
};
