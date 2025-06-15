const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Team = require("./Team");

const TeamStandings = sequelize.define("TeamStandings", {
  teamId: DataTypes.INTEGER,
  season: DataTypes.STRING,
  gamesPlayed: DataTypes.INTEGER,
  wins: DataTypes.INTEGER,
  losses: DataTypes.INTEGER,
  otLosses: DataTypes.INTEGER,
  goalsFor: DataTypes.INTEGER,
  goalsAgainst: DataTypes.INTEGER,
  points: DataTypes.INTEGER,
});

TeamStandings.associate = function () {
  TeamStandings.belongsTo(Team, {
    foreignKey: "teamId",
    as: "team",
  });
};


//   TeamStandings.belongsTo(Team, {
//     foreignKey: 'teamId',
//     as: 'team' // ✅ matches your include
//   });


module.exports = TeamStandings;
