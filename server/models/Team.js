const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Team = sequelize.define("Team", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mascot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abrev: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  est: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  division: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Team;
