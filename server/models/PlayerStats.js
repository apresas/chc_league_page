const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
  {}
);
module.exports = PlayerStats;
