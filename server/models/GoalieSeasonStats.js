const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Player = require("./Player");
const Team = require("./Team");

const GoalieSeasonStats = sequelize.define(
  "GoalieSeasonStats",
  {
    playerId: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
    season: DataTypes.STRING,
    gamesPlayed: DataTypes.INTEGER,
    shotsAgainst: DataTypes.INTEGER,
    saves: DataTypes.INTEGER,
    goalsAgainst: DataTypes.INTEGER,
    savePct: DataTypes.FLOAT,
    gaa: DataTypes.FLOAT,
    wins: DataTypes.INTEGER,
    shutouts: DataTypes.INTEGER,
  },
  {}
);

GoalieSeasonStats.associate = function () {
  GoalieSeasonStats.belongsTo(Player, {
    foreignKey: "playerId",
    as: "player",
  });

  GoalieSeasonStats.belongsTo(Team, {
    foreignKey: "teamId",
    as: "team",
  });
};

module.exports = GoalieSeasonStats;
