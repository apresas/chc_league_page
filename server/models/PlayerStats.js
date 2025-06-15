const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Team = require("./Team");
const Player = require("./Player");

const PlayerStats = sequelize.define(
  "PlayerStats",
  {
    playerId: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
    gameId: DataTypes.STRING,
    goals: DataTypes.INTEGER,
    assists: DataTypes.INTEGER,
    shots: DataTypes.INTEGER,
    hits: DataTypes.INTEGER,
    faceoffWins: DataTypes.INTEGER,
    penaltyMinutes: DataTypes.INTEGER,
  },
);

PlayerStats.associate = function () {
  PlayerStats.belongsTo(Player, {
    foreignKey: "playerId",
    as: "player",
  });
  PlayerStats.belongsTo(Team, {
    foreignKey: "teamId",
    as: "team",
  });
};
module.exports = PlayerStats;
