const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Team = require("./Team");

const Game = sequelize.define("Game", {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  homeTeamAbrev: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeamAbrev: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  awayScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  homeStartingGoalieId: DataTypes.STRING,
  awayStartingGoalieId: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Scheduled",
  },
});

// Use distinct aliases: homeTeam and awayTeam
Game.belongsTo(Team, {
  // as: "homeTeam",
  foreignKey: "homeTeamId",
  targetKey: "id",
});

Game.belongsTo(Team, {
  // as: "awayTeam",
  foreignKey: "awayTeamId",
  targetKey: "id",
});

module.exports = Game;
