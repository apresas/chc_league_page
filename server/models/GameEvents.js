const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Game = require("./Game");
const Player = require("./Player");
const Team = require("./Team");
const { updatePlayerStats } = require("../utils/updatePlayerStats");
const { updateSeasonStats } = require("../utils/updateSeasonStats");
const { updateGoalieSeasonStats } = require("../utils/updateGoalieSeasonStats");

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
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Team,
      key: "id",
    },
  },
  playerId: {
    type: DataTypes.STRING,
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
  type: {
    // type: DataTypes.ENUM("goal", "shot", "hit", "penalty", "faceoff", "blocked shot"),
    type: DataTypes.STRING,
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

GameEvents.afterCreate(async (event) => {
    const { updateGoalieSeasonStats } = require('../utils/updateGoalieSeasonStats');
  await updatePlayerStats(event.gameId);
  await updateSeasonStats(event.gameId);
  await updateGoalieSeasonStats('2024-25');
});


// GameEvent.afterCreate(() => updateGoalieSeasonStats('2024-25'));
// GameEvent.afterUpdate(() => updateGoalieSeasonStats('2024-25'));
// GameEvent.afterDestroy(() => updateGoalieSeasonStats('2024-25'));

GameEvents.belongsTo(Game, { foreignKey: "gameId" });
GameEvents.belongsTo(Team, { foreignKey: "teamId" });
GameEvents.belongsTo(Player, { foreignKey: "playerId" });

module.exports = GameEvents;
