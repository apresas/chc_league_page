const Team = require("./Team");
const Player = require("./Player");
const Game = require("./Game");
const GameEvents = require("./GameEvents");
const GameStats = require("./GameStats");

// Associations
Team.hasMany(Player, { foreignKey: "teamId" });
Player.belongsTo(Team, { foreignKey: "teamId" });

Game.belongsTo(Team, { as: "homeTeam", foreignKey: "homeTeamId" });
Game.belongsTo(Team, { as: "awayTeam", foreignKey: "awayTeamId" });

Game.hasMany(GameEvents, { foreignKey: "gameId" });
GameEvents.belongsTo(Game, { foreignKey: "gameId" });

Game.hasMany(GameStats, { foreignKey: "gameId" });
GameStats.belongsTo(Game, { foreignKey: "gameId" });

GameEvents.belongsTo(Team, { foreignKey: "teamId" });
GameEvents.belongsTo(Player, { foreignKey: "playerId" });

module.exports = { Team, Player, Game, GameEvents, GameStats };
