"use strict";

const teamData = require("../../client/src/data/teamInfoData.json"); // adjust path as needed

module.exports = {
  async up(queryInterface, Sequelize) {
    const teams = teamData.teams.map((team) => ({
      id: team.id,
      name: team.name,
      mascot: team.mascot,
      city: team.city,
      abrev: team.abrev,
      logo: team.logo,
      est: team.est,
      division: team.div,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Teams", teams, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Teams", null, {});
  },
};
