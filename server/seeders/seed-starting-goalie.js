"use strict";

const gameSchedule = require("../../client/src/data/gameSchedule.json"); // adjust path if needed

module.exports = {
  async up(queryInterface, Sequelize) {
    const games = await queryInterface.sequelize.query(
      `SELECT id FROM "Games";`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const updates = [];

    for (const game of games) {
      const scheduled = gameSchedule.find((g) => g.gameId === game.id);
      if (!scheduled) continue;

      const homeStartingGoalieId = scheduled.home?.startingGoalie || null;
      const awayStartingGoalieId = scheduled.away?.startingGoalie || null;

      updates.push(
        queryInterface.bulkUpdate(
          "Games",
          {
            homeStartingGoalieId,
            awayStartingGoalieId,
          },
          { id: game.id }
        )
      );
    }

    return Promise.all(updates);
  },

  async down(queryInterface) {
    return Promise.all([
      queryInterface.bulkUpdate("Games", { homeStartingGoalieId: null }, {}),
      queryInterface.bulkUpdate("Games", { awayStartingGoalieId: null }, {}),
    ]);
  },
};
