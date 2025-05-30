"use strict";

const { Game, GameEvents, GoalieSeasonStats } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const season = "2024-25";

    await GoalieSeasonStats.destroy({ where: { season } });

    const games = await Game.findAll({
      attributes: [
        "id",
        "homeTeamId",
        "awayTeamId",
        "homeScore",
        "awayScore",
        "homeStartingGoalieId",
        "awayStartingGoalieId",
        "status",
      ],
    });

    const goalieMap = {}; // key = goalieId

    // for (const game of games) {
    //   // Home goalie
    //   if (game.homeStartingGoalieId) {
    //     const id = game.homeStartingGoalieId;
    //     if (!goalieMap[id]) {
    //       goalieMap[id] = {
    //         playerId: id,
    //         teamId: game.homeTeamId,
    //         season,
    //         gamesPlayed: 0,
    //         goalsAgainst: 0,
    //         shotsAgainst: 0,
    //       };
    //     }
    //     goalieMap[id].gamesPlayed += 1;
    //     goalieMap[id].goalsAgainst += game.awayScore;
    //   }

    //   // Away goalie
    //   if (game.awayStartingGoalieId) {
    //     const id = game.awayStartingGoalieId;
    //     if (!goalieMap[id]) {
    //       goalieMap[id] = {
    //         playerId: id,
    //         teamId: game.awayTeamId,
    //         season,
    //         gamesPlayed: 0,
    //         goalsAgainst: 0,
    //         shotsAgainst: 0,
    //       };
    //     }
    //     goalieMap[id].gamesPlayed += 1;
    //     goalieMap[id].goalsAgainst += game.homeScore;
    //   }
    // }

    // Fetch all shot events

    for (const game of games) {
      if (game.status === "Scheduled") continue; // ⛔️ Skip unplayed games

      const {
        homeStartingGoalieId,
        awayStartingGoalieId,
        homeTeamId,
        awayTeamId,
        homeScore,
        awayScore,
      } = game;

      // Home goalie
      if (homeStartingGoalieId) {
        const id = homeStartingGoalieId;
        if (!goalieMap[id]) {
          goalieMap[id] = {
            playerId: id,
            teamId: homeTeamId,
            season,
            gamesPlayed: 0,
            goalsAgainst: 0,
            shotsAgainst: 0,
            wins: 0,
            shutouts: 0,
          };
        }
        const g = goalieMap[id];
        g.gamesPlayed += 1;
        g.goalsAgainst += awayScore;

        if (homeScore > awayScore) g.wins += 1;
        if (awayScore === 0) g.shutouts += 1;
      }

      // Away goalie
      if (awayStartingGoalieId) {
        const id = awayStartingGoalieId;
        if (!goalieMap[id]) {
          goalieMap[id] = {
            playerId: id,
            teamId: awayTeamId,
            season,
            gamesPlayed: 0,
            goalsAgainst: 0,
            shotsAgainst: 0,
            wins: 0,
            shutouts: 0,
          };
        }
        const g = goalieMap[id];
        g.gamesPlayed += 1;
        g.goalsAgainst += homeScore;

        if (awayScore > homeScore) g.wins += 1;
        if (homeScore === 0) g.shutouts += 1;
      }
    }

    const allEvents = await GameEvents.findAll({ where: { type: "shot" } });

    for (const event of allEvents) {
      const { gameId, teamId } = event;

      // find which goalie was facing this shot
      const game = games.find((g) => g.id === gameId);
      if (!game) continue;

      // if the shot was by away team, home goalie faced it
      if (game.awayTeamId === teamId && game.homeStartingGoalieId) {
        const goalie = goalieMap[game.homeStartingGoalieId];
        if (goalie) goalie.shotsAgainst += 1;
      }

      // if the shot was by home team, away goalie faced it
      if (game.homeTeamId === teamId && game.awayStartingGoalieId) {
        const goalie = goalieMap[game.awayStartingGoalieId];
        if (goalie) goalie.shotsAgainst += 1;
      }
    }

    // const finalStats = Object.values(goalieMap).map((g) => {
    //   const saves = g.shotsAgainst - g.goalsAgainst;
    //   return {
    //     ...g,
    //     saves,
    //     savePct: g.shotsAgainst ? saves / g.shotsAgainst : null,
    //     gaa: g.gamesPlayed ? g.goalsAgainst / g.gamesPlayed : null,
    //     wins: 0, // could be added later
    //     shutouts: 0, // could be added later
    //   };
    // });
    const finalStats = Object.values(goalieMap).map((g) => {
      const saves = g.shotsAgainst - g.goalsAgainst;
      return {
        ...g,
        saves,
        savePct: g.shotsAgainst ? saves / g.shotsAgainst : null,
        gaa: g.gamesPlayed ? g.goalsAgainst / g.gamesPlayed : null,
      };
    });

    await GoalieSeasonStats.bulkCreate(finalStats);
    console.log(`✅ Seeded GoalieSeasonStats for ${finalStats.length} goalies`);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("GoalieSeasonStats", null, {});
  },
};
