const { Game, TeamStandings } = require('../models');

async function updateTeamStandings(season = '2024-25') {
  const games = await Game.findAll({
    where: { status: { [Op.ne]: 'scheduled' } }
  });

  const teamStats = {};

  for (const game of games) {
    const {
      homeTeamId,
      awayTeamId,
      homeScore,
      awayScore
    } = game;

    // Initialize both teams
    [homeTeamId, awayTeamId].forEach((teamId) => {
      if (!teamStats[teamId]) {
        teamStats[teamId] = {
          teamId,
          season,
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          otLosses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
        };
      }
    });

    const isTie = homeScore === awayScore;
    const isOT = game.resultType === 'OT' || game.resultType === 'SO'; // Optional

    // Update stats
    teamStats[homeTeamId].gamesPlayed += 1;
    teamStats[awayTeamId].gamesPlayed += 1;

    teamStats[homeTeamId].goalsFor += homeScore;
    teamStats[homeTeamId].goalsAgainst += awayScore;

    teamStats[awayTeamId].goalsFor += awayScore;
    teamStats[awayTeamId].goalsAgainst += homeScore;

    if (homeScore > awayScore) {
      teamStats[homeTeamId].wins += 1;
      isOT ? teamStats[awayTeamId].otLosses += 1 : teamStats[awayTeamId].losses += 1;
    } else {
      teamStats[awayTeamId].wins += 1;
      isOT ? teamStats[homeTeamId].otLosses += 1 : teamStats[homeTeamId].losses += 1;
    }
  }

  // Format for DB
  const final = Object.values(teamStats).map((stat) => ({
    ...stat,
    points: stat.wins * 2 + stat.otLosses
  }));

  await TeamStandings.destroy({ where: { season } });
  await TeamStandings.bulkCreate(final);

  console.log(`✅ TeamStandings updated for season ${season}`);
}
