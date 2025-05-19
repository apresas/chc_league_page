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
  homeScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  awayScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Scheduled",
  },
});

// Use distinct aliases: homeTeam and awayTeam
Game.belongsTo(Team, {
  as: "HomeTeam",
  foreignKey: "homeTeamId",
  targetKey: "id",
});

Game.belongsTo(Team, {
  as: "AwayTeam",
  foreignKey: "awayTeamId",
  targetKey: "id",
});

module.exports = Game;
