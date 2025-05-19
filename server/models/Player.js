const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Team = require("./Team");

const Player = sequelize.define("Player", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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

module.exports = Player;
