const Team = require("./Team");
const Player = require("./Player");
const Game = require("./Game");
const GameEvents = require("./GameEvents");
const GameStats = require("./GameStats");
const GoalieStats = require("./GoalieStats");
const PlayerStats = require("./PlayerStats");
const GoalEvents = require("./GoalEvents")
const PlayerSeasonStats = require("./PlayerSeasonStats")
const GoalieSeasonStats = require("./GoalieSeasonStats")


// Associations
Team.hasMany(Player, { foreignKey: "teamId" });
Player.belongsTo(Team, { foreignKey: "teamId" });

Game.belongsTo(Team, { as: "homeTeam", foreignKey: "homeTeamId" });
Game.belongsTo(Team, { as: "awayTeam", foreignKey: "awayTeamId" });
Game.belongsTo(Player, { foreignKey: 'homeStartingGoalieId', as: 'homeGoalie' });
Game.belongsTo(Player, { foreignKey: 'awayStartingGoalieId', as: 'awayGoalie' });

Game.hasMany(GameEvents, { foreignKey: "gameId" });
GameEvents.belongsTo(Game, { foreignKey: "gameId" });

Game.hasMany(GameStats, { foreignKey: "gameId" });
GameStats.belongsTo(Game, { foreignKey: "gameId" });

GameEvents.belongsTo(Team, { foreignKey: "teamId" });
GameEvents.belongsTo(Player, { foreignKey: "playerId" });

GameEvents.belongsTo(Player, { foreignKey: 'playerId', as: 'player' });
GameEvents.belongsTo(Game, { foreignKey: 'gameId', as: 'game' });

// PlayerStats.belongsTo(Player, { foreignKey: 'playerId' });
// GoalieStats.belongsTo(Player, { foreignKey: 'playerId' });

// Player.hasMany(PlayerStats, { foreignKey: 'playerId' });
// Player.hasMany(GoalieStats, { foreignKey: 'playerId' });

// Setup stat table associations
// if (Player && PlayerStats) {
//   Player.hasMany(PlayerStats, { foreignKey: 'playerId' });
//   PlayerStats.belongsTo(Player, { foreignKey: 'playerId' });
// }

// if (Player && GoalieStats) {
//   Player.hasMany(GoalieStats, { foreignKey: 'playerId' });
//   GoalieStats.belongsTo(Player, { foreignKey: 'playerId' });
// }

// if (Game && PlayerStats) {
//   Game.hasMany(PlayerStats, { foreignKey: 'gameId', sourceKey: 'id' });
//   PlayerStats.belongsTo(Game, { foreignKey: 'gameId', targetKey: 'id' });
// }

// if (Game && GoalieStats) {
//   Game.hasMany(GoalieStats, { foreignKey: 'gameId', sourceKey: 'id' });
//   GoalieStats.belongsTo(Game, { foreignKey: 'gameId', targetKey: 'id' });
// }

// Setup PlayerSeasonStats table associations
if (Player && PlayerSeasonStats) {
  Player.hasMany(PlayerSeasonStats, { foreignKey: 'playerId' });
  PlayerSeasonStats.belongsTo(Player, { foreignKey: 'playerId' });
}

if (Team && PlayerSeasonStats) {
  Team.hasMany(PlayerSeasonStats, { foreignKey: 'teamId', sourceKey: 'id' });
  PlayerSeasonStats.belongsTo(Team, { foreignKey: 'teamId', targetKey: 'id' });
}

// Setup GoalieSeasonStats table associtaions
if (Player && GoalieSeasonStats) {
  Player.hasMany(GoalieSeasonStats, { foreignKey: 'playerId' });
  GoalieSeasonStats.belongsTo(Player, { foreignKey: 'playerId' });
}

if (Team && GoalieSeasonStats) {
  Team.hasMany(GoalieSeasonStats, { foreignKey: 'teamId', sourceKey: 'id' });
  GoalieSeasonStats.belongsTo(Team, { foreignKey: 'teamId', targetKey: 'id' });
}


module.exports = { Team, Player, Game, GameEvents, GameStats, PlayerStats, GoalieStats, GoalEvents, PlayerSeasonStats, GoalieSeasonStats  };


