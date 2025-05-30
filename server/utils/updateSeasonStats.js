async function updateSeasonStats(season = "2024-25") {
  const { PlayerStats, PlayerSeasonStats } = require("../models");
  // Clear previous totals for this season
  await PlayerSeasonStats.destroy({ where: { season } });

  // Aggregate from PlayerStats
  const stats = await PlayerStats.findAll();

  const seasonMap = {};

  for (const s of stats) {
    const key = `${s.playerId}-${s.teamId}`;
    if (!seasonMap[key]) {
      seasonMap[key] = {
        playerId: s.playerId,
        teamId: s.teamId,
        season,
        totalGoals: 0,
        totalAssists: 0,
        totalShots: 0,
        totalHits: 0,
        totalFaceoffWins: 0,
        totalPenaltyMinutes: 0,
      };
    }

    seasonMap[key].totalGoals += s.goals || 0;
    seasonMap[key].totalAssists += s.assists || 0;
    seasonMap[key].totalShots += s.shots || 0;
    seasonMap[key].totalHits += s.hits || 0;
    seasonMap[key].totalFaceoffWins += s.faceoffWins || 0;
    seasonMap[key].totalPenaltyMinutes += s.penaltyMinutes || 0;
  }

  // Insert into DB
  await PlayerSeasonStats.bulkCreate(Object.values(seasonMap));
}

module.exports = { updateSeasonStats };
