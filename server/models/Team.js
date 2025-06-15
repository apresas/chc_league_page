const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TeamStandings = require("./TeamStandings")

const Team = sequelize.define("Team", {
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4,
  //   primaryKey: true,
  // },
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
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

Team.hasOne(TeamStandings, {
  foreignKey: 'teamId',
  as: 'standings'
});

module.exports = Team;
