"use strict";

const fs = require("fs");
const path = require("path");

module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.resolve(
      __dirname,
      "../../client/src/data/goalEvents.json"
    ); // adjust if needed
    const rawData = fs.readFileSync(filePath);
    const goalEvents = JSON.parse(rawData);

    // Format goalEvents to match DB model if needed
    const formattedEvents = goalEvents.map((event) => ({
    //   id: event.id,
      gameId: event.gameId,
      period: event.period,
      team: event.team,
      time: event.time,
      scorerId: event.scorerId,
      assistIds:
        Array.isArray(event.assistIds) && event.assistIds.length > 0
          ? event.assistIds
          : Sequelize.literal(`ARRAY[]::VARCHAR[]`), // <-- cast empty to string[]
      teamId: event.teamId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("GoalEvents", formattedEvents, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("GoalEvents", null, {});
  },
};
