"use strict";

const fs = require("fs");
const path = require("path");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Players', null, {}); // deletes all first
    const db = require("../models");
    const Team = db.Team;
    const teamList = await Team.findAll({ attributes: ["id", "abrev"] });
    const abrevToTeamId = {};
    teamList.forEach((team) => {
      abrevToTeamId[team.abrev] = team.id;
    });
    const filePath = path.resolve(
      __dirname,
      "../../client/src/data/teamRosters.json"
    ); // fix path
    const raw = fs.readFileSync(filePath);
    const teams = JSON.parse(raw);

    const players = [];

    for (const team of teams) {
      const teamAbrev = team.team;
      const teamId = abrevToTeamId[teamAbrev];
      if (!teamId) {
        console.warn(`No team ID found for abbreviation: ${teamAbrev}`);
        continue;
      }
      for (const player of team.roster) {
        players.push({
          id: player.id,
          firstName: player.name.first,
          lastName: player.name.last,
          position: player.position,
          positionAbrev: player.positionAbbr,
          positionType: player.positionType,
          class: player.class,
          number: player.number,
          height: player.height,
          weight: player.weight,
          teamId: teamId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert("Players", players, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Players", null, {});
  },
};
