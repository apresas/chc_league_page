async function updateGoalieSeasonStats(season = "2024-25") {
  const { GameEvents, Player, Game, GoalieSeasonStats } = require("../models");
  console.log(`▶ Regenerating GoalieSeasonStats for season ${season}`);
  await GoalieSeasonStats.destroy({ where: { season } });

  const events = await GameEvents.findAll({
    include: [
      { model: Player, as: "player", attributes: ["id", "positionType"] },
      { model: Game, as: "game" },
    ],
  });

  const goalieEvents = events.filter(
    (e) => e.player?.positionType === "Goalie" && e.game
  );

  const gameMap = {}; // for caching scores by gameId
  const goalieGameStats = {};

  for (const event of goalieEvents) {
    const { playerId, teamId, gameId, type, game } = event;

    const key = `${playerId}-${teamId}-${gameId}`;

    if (!goalieGameStats[key]) {
      goalieGameStats[key] = {
        playerId,
        teamId,
        gameId,
        shots: 0,
        goals: 0,
        saves: 0,
      };
    }

    if (type === "shot") goalieGameStats[key].shots++;
    if (type === "goal") goalieGameStats[key].goals++;
    if (type === "save") goalieGameStats[key].saves++;

    if (!gameMap[gameId]) {
      gameMap[gameId] = {
        homeTeamId: game.homeTeamId,
        awayTeamId: game.awayTeamId,
        homeScore: game.homeScore,
        awayScore: game.awayScore,
      };
    }
  }

  // Aggregate per goalie-season
  const seasonStats = {};

  for (const [key, gstat] of Object.entries(goalieGameStats)) {
    const { playerId, teamId, gameId, shots, goals, saves } = gstat;
    const seasonKey = `${playerId}-${teamId}`;

    if (!seasonStats[seasonKey]) {
      seasonStats[seasonKey] = {
        playerId,
        teamId,
        season,
        gamesPlayed: 0,
        shotsAgainst: 0,
        goalsAgainst: 0,
        saves: 0,
        wins: 0,
        shutouts: 0,
      };
    }

    const teamWon = (() => {
      const game = gameMap[gameId];
      if (!game) return false;
      if (teamId === game.homeTeamId && game.homeScore > game.awayScore)
        return true;
      if (teamId === game.awayTeamId && game.awayScore > game.homeScore)
        return true;
      return false;
    })();

    const shutout = goals === 0 && teamWon;

    seasonStats[seasonKey].gamesPlayed += 1;
    seasonStats[seasonKey].shotsAgainst += shots;
    seasonStats[seasonKey].goalsAgainst += goals;
    seasonStats[seasonKey].saves += saves;
    if (teamWon) seasonStats[seasonKey].wins += 1;
    if (shutout) seasonStats[seasonKey].shutouts += 1;
  }

  const result = Object.values(seasonStats).map((s) => ({
    ...s,
    savePct: s.shotsAgainst ? s.saves / s.shotsAgainst : null,
    gaa: s.gamesPlayed ? s.goalsAgainst / s.gamesPlayed : null,
  }));

  await GoalieSeasonStats.bulkCreate(result);
  console.log(`✅ GoalieSeasonStats updated: ${result.length} goalies`);
}

module.exports = { updateGoalieSeasonStats };
