const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Team = require("./Team");

const Game = sequelize.define("Game", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  date: DataTypes.DATE,
  homeScore: DataTypes.INTEGER,
  awayScore: DataTypes.INTEGER,
  status: DataTypes.STRING,
});

Game.belongsTo(Team, { as: "homeTeam", foreignKey: "homeTeamId" });
Game.belongsTo(Team, { as: "awayTeam", foreignKey: "awayTeamId" });

module.exports = Game;
