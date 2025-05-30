// // models/GoalieStats.js
// "use strict";
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Player = require("./Player");
// const Game = require("./Game");

// const GoalieStats = sequelize.define(
//   "GoalieStats",
//   {
//     playerId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     gameId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     shotsAgainst: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0,
//     },
//     saves: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0,
//     },
//     goalsAgainst: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0,
//     },
//     savePercentage: {
//       type: DataTypes.FLOAT,
//     },
//     timeOnIce: {
//       type: DataTypes.INTEGER,
//     },
//     shutout: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   },
//   {
//     indexes: [{ unique: true, fields: ["playerId", "gameId"] }],
//   }
// );


//   GoalieStats.belongsTo(Player, { foreignKey: "playerId" });
//   GoalieStats.belongsTo(Game, { foreignKey: "gameId", targetKey: "id" });


// module.exports = GoalieStats;
