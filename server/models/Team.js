const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Team = sequelize.define("Team", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  abrev: DataTypes.STRING,
  division: DataTypes.STRING,
  logo: DataTypes.STRING,
});

module.exports = Team;
