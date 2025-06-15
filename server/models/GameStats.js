const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Game = require("./Game");
const Team = require("./Team");

const GameStats = sequelize.define("GameStats", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
gameId: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true, // <== this helps Sequelize map the conflict target
},
  homeShotsFor: DataTypes.INTEGER,
  awayShotsFor: DataTypes.INTEGER,
  homeHits: DataTypes.INTEGER,
  awayHits: DataTypes.INTEGER,
  homeFaceoffsWon: DataTypes.INTEGER,
  awayFaceoffsWon: DataTypes.INTEGER,
  homePowerplayOpportunities: DataTypes.INTEGER,
  awayPowerplayOpportunities: DataTypes.INTEGER,
  homePowerplayGoals: DataTypes.INTEGER,
  awayPowerplayGoals: DataTypes.INTEGER,
  homePenaltyMinutes: DataTypes.INTEGER,
  awayPenaltyMinutes: DataTypes.INTEGER,
});

// GameStats.belongsTo(Game, {foreignKey: "gameId"})

GameStats.associate = function () {
  GameStats.belongsTo(Game, {
    foreignKey: "gameId",
    // targetKey: "id",
    // as: "game",
  });
};

module.exports = GameStats;
