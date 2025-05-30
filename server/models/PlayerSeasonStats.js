const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Player = require("./Player");
const Team = require("./Team");

const PlayerSeasonStats = sequelize.define(
  "PlayerSeasonStats",
  {
    playerId: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
    season: DataTypes.STRING,
    totalGoals: DataTypes.INTEGER,
    totalAssists: DataTypes.INTEGER,
    totalShots: DataTypes.INTEGER,
    totalHits: DataTypes.INTEGER,
    totalFaceoffWins: DataTypes.INTEGER,
    totalPenaltyMinutes: DataTypes.INTEGER,
  },
  {}
);

PlayerSeasonStats.associate = function () {
  PlayerSeasonStats.belongsTo(Player, {
    foreignKey: "playerId",
    as: "player",
  });
  PlayerSeasonStats.belongsTo(Team, {
    foreignKey: "teamId",
    as: "team",
  });
};

module.exports = PlayerSeasonStats;
