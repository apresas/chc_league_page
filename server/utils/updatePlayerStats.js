async function updatePlayerStats(gameId, { GoalEvents, GameEvents, PlayerStats }) {
  await PlayerStats.destroy({ where: { gameId } });

  const goals = await GoalEvents.findAll({ where: { gameId } });
  const assistsMap = {};

  const goalStats = goals.reduce((acc, event) => {
    const key = `${event.scorerId}-${event.teamId}`;
    acc[key] = acc[key] || {
      playerId: event.scorerId, teamId: event.teamId, gameId,
      goals: 0, assists: 0, shots: 0, hits: 0, faceoffWins: 0, penaltyMinutes: 0
    };
    acc[key].goals += 1;

    (event.assistIds || []).forEach(aid => {
      const aKey = `${aid}-${event.teamId}`;
      assistsMap[aKey] = assistsMap[aKey] || {
        playerId: aid, teamId: event.teamId, gameId,
        goals: 0, assists: 0, shots: 0, hits: 0, faceoffWins: 0, penaltyMinutes: 0
      };
      assistsMap[aKey].assists += 1;
    });

    return acc;
  }, {});

  const events = await GameEvents.findAll({ where: { gameId } });
  const eventStats = {};

  for (const event of events) {
    const { playerId, teamId, type } = event;
    if (!playerId) continue;

    const key = `${playerId}-${teamId}`;
    eventStats[key] = eventStats[key] || {
      playerId, teamId, gameId,
      goals: 0, assists: 0, shots: 0, hits: 0, faceoffWins: 0, penaltyMinutes: 0
    };

    switch (type) {
      case 'shot': eventStats[key].shots += 1; break;
      case 'hit': eventStats[key].hits += 1; break;
      case 'faceoff': eventStats[key].faceoffWins += 1; break;
      case 'penalty': eventStats[key].penaltyMinutes += 2; break;
    }
  }

  const finalStats = { ...eventStats };

  for (const [key, val] of Object.entries(goalStats)) {
    finalStats[key] = { ...finalStats[key], ...val };
  }

  for (const [key, val] of Object.entries(assistsMap)) {
    if (!finalStats[key]) finalStats[key] = val;
    else finalStats[key].assists = val.assists;
  }

  await PlayerStats.bulkCreate(Object.values(finalStats));
}

module.exports = { updatePlayerStats };
