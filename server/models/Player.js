const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Team = require("./Team");
const PlayerSeasonStats = require("./PlayerSeasonStats")

const Player = sequelize.define("Player", {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  positionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  positionAbrev: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  height: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Player.belongsTo(Team, { foreignKey: "teamId" });
Team.hasMany(Player, { foreignKey: "teamId" });
Player.hasMany(PlayerSeasonStats, { foreignKey: 'playerId' });

module.exports = Player;
