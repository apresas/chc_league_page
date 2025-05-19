const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Game = require("./Game");
const Player = require("./Player");
const Team = require("./Team");

const GameEvents = sequelize.define("GameEvents", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  gameId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Game,
      key: "id",
    },
  },
  teamId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Team,
      key: "id",
    },
  },
  playerId: {
    type: DataTypes.UUID,
    references: {
      model: Player,
      key: "id",
    },
  },
  period: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  eventType: {
    type: DataTypes.ENUM("Goal", "Shot", "Hit", "Penalty", "Faceoff", "Blocked Shot"),
    allowNull: false,
  },
  assistIds: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

GameEvents.belongsTo(Game, { foreignKey: "gameId" });
GameEvents.belongsTo(Team, { foreignKey: "teamId" });
GameEvents.belongsTo(Player, { foreignKey: "playerId" });

module.exports = GameEvents;
