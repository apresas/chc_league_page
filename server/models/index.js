const Team = require("./Team");
const Player = require("./Player");
const Game = require("./Game");

Team.hasMany(Player, { foreignKey: "teamId" });
Game.hasMany(Player, { foreignKey: "homeTeamId" });
Game.hasMany(Player, { foreignKey: "awayTeamId" });

module.exports = { Team, Player, Game };
