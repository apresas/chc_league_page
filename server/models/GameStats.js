const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Game = require("./Game");
const Team = require("./Team");

const GameStats = sequelize.define("GameStats", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  shots: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  hits: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  blockedShots: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  powerPlayGoals: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  penaltyMinutes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

GameStats.belongsTo(Game, { foreignKey: "gameId" });
GameStats.belongsTo(Team, { foreignKey: "teamId" });

module.exports = GameStats;
