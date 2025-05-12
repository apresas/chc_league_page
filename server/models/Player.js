const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Team = require("./Team");

const Player = sequelize.define("Player", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  position: DataTypes.STRING,
  positionType: DataTypes.STRING,
  height: DataTypes.STRING,
  weight: DataTypes.INTEGER,
});

Player.belongsTo(Team, { foreignKey: "teamId" });

module.exports = Player;
