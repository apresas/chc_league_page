"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Game = require("./Game");
const Player = require("./Player");
const Team = require("./Team");
const { updatePlayerStats } = require("../utils/updatePlayerStats");
const { updateSeasonStats } = require("../utils/updateSeasonStats");


const GoalEvents = sequelize.define("GoalEvent", {
  gameId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  team: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  period: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scorerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assistIds: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

GoalEvents.afterCreate(async (event) => {
  await updatePlayerStats(event.gameId);
  await updateSeasonStats(event.gameId);
});

GoalEvents.belongsTo(Player, { foreignKey: "scorerId" });
GoalEvents.belongsTo(Game, { foreignKey: "gameId" });
GoalEvents.belongsTo(Team, { foreignKey: "teamId" });

module.exports = GoalEvents;
