import React from "react";
import "./GameSummary.css";
import teamRosters from "../../../../data/teamRosters.json";
import gameData from "../../../../data/gameSchedule.json";

const GameSummary = ({ game, goalEvents }) => {
  const { date, home, away } = game;

  // Construct the gameId for filtering goal events
  const gameId = `${date}_${home.abrev}_${away.abrev}`;
  const gameGoals = goalEvents
    .filter((event) => event.gameId === gameId)
    .sort((a, b) => {
      const periodOrder = ["1st", "2nd", "3rd", "OT"];
      const periodA = periodOrder.indexOf(a.period);
      const periodB = periodOrder.indexOf(b.period);

      if (periodA !== periodB) {
        return periodA - periodB;
      }

      // If periods are the same, sort by time
      const [minA, secA] = a.time.split(":").map(Number);
      const [minB, secB] = b.time.split(":").map(Number);

      return minA * 60 + secA - (minB * 60 + secB);
    });

  // Get home and away rosters
  const homeTeam = teamRosters.find((team) => team.team === home.abrev);
  const awayTeam = teamRosters.find((team) => team.team === away.abrev);

  const homeRoster = homeTeam ? homeTeam.roster : [];
  const awayRoster = awayTeam ? awayTeam.roster : [];

  // Helper function to get player info
  const getPlayerInfo = (playerId) => {
    const player =
      homeRoster.find((p) => p.id === playerId) ||
      awayRoster.find((p) => p.id === playerId);

    return player
      ? `${player.name.first} ${player.name.last}`
      : "Unknown Player";
  };

  // Initialize score tracking
  let homeScore = 0;
  let awayScore = 0;

  // Period breakdown structure
  const periods = ["1st", "2nd", "3rd", "OT"];
  const periodScores = {
    home: [0, 0, 0, 0],
    away: [0, 0, 0, 0],
  };

  gameGoals.forEach((goal) => {
    const periodIndex = periods.indexOf(goal.period);
    if (periodIndex !== -1) {
      if (goal.team === home.abrev) {
        periodScores.home[periodIndex] += 1;
      } else {
        periodScores.away[periodIndex] += 1;
      }
    }
  });

  // Filter for head-to-head matchups
  const headToHeadGames = gameData.filter(
    (match) =>
      (match.home.abrev === home.abrev && match.away.abrev === away.abrev) ||
      (match.home.abrev === away.abrev && match.away.abrev === home.abrev)
  );

  return (
    <div className="game-summary">
      {/* Scoring Summary */}
      <div className="summary-main">
        <h1>Scoring Summary</h1>

        {periods.map((period) => {
          console.log(period);
          const periodEvents = gameGoals.filter(
            (event) => event.period === period
          );

          console.log(periodEvents)

          return (
            <div key={period} className="period-section">
              {periodEvents.length > 0 ? <h3>{period} Period</h3> : null}
              {periodEvents.length > 0 ? (
                periodEvents.map((event, index) => {
                  const scorer = getPlayerInfo(event.scorerId);
                  const assists = event.assistIds.length
                    ? event.assistIds.map((id) => getPlayerInfo(id)).join(", ")
                    : "Unassisted";

                  if (event.team === home.abrev) {
                    homeScore += 1;
                  } else {
                    awayScore += 1;
                  }

                  const leadingTeam =
                    homeScore > awayScore
                      ? `${home.abrev}`
                      : awayScore > homeScore
                      ? `${away.abrev}`
                      : "TIED";

                  return (
                    <div key={index} className="scoring-event">
                      <div className="scoring-player">
                        <div className="scoring-portrait">
                          <img src={`/teamIcons/${event.team}.svg`} alt="" />
                        </div>
                        <div className="scoring-player-info">
                          <span className="player-name">{scorer}</span>
                          <span className="scoring-assists">
                            {" "}
                            {event.team === home.abrev ? (
                              <img src={`${home.logo}`} alt="" />
                            ) : (
                              <img src={`${away.logo}`} alt="" />
                            )}
                            {assists}
                          </span>
                        </div>
                      </div>
                      <div className="scoring-score-tile">
                        <div className="scoring-score">
                          {homeScore} - {awayScore} <span>{leadingTeam}</span>
                        </div>
                        Score
                      </div>
                      <div className="scoring-time-tile">
                        <div className="scoring-time">{event.time}</div>
                        Time
                      </div>
                    </div>
                  );
                })
              ) : period === "OT" ? null : (
                <div className="no-events">No events in this period.</div>
              )}
            </div>
          );
        })}
      </div>
      {/* Period Breakdown */}
      <div className="summary-sideBar">
        <div className="period-breakdown">
          <h1>Line Score</h1>
          <div className="line-score-header">
            <span />
            {periods.map((period) => (
              <div className="header-label">{period}</div>
            ))}
            <div className="header-label">T</div>
          </div>
          <div className="line-score-row">
            <div className="line-score-name">
              <img src={`${home.logo}`} alt="" />
              {home.abrev}
            </div>
            {periods.map((period, index) => (
              <div className="period-scores">{periodScores.home[index]}</div>
            ))}
            <div className="period-scores">{home.score}</div>
          </div>
          <div className="line-score-row">
            <div className="line-score-name">
              <img src={`${away.logo}`} alt="" />
              {away.abrev}
            </div>
            {periods.map((period, index) => (
              <div className="period-scores">{periodScores.away[index]}</div>
            ))}
            <div className="period-scores">{away.score}</div>
          </div>
        </div>
        <h1>Head-to-Head</h1>
        <div className="head-to-head-grid">
          {headToHeadGames.length > 0 ? (
            headToHeadGames.map((match, index) => (
              <div key={index} className="head-to-head-tile">
                <div className="match-date">{match.date}</div>
                <div className="match-teams">
                  <span>
                    {match.home.abrev} vs {match.away.abrev}
                  </span>
                </div>
                <div className="match-score">
                  {match.home.score} - {match.away.score}
                </div>
                <div className="match-status">{match.status}</div>
              </div>
            ))
          ) : (
            <div className="no-matches">No previous matchups</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameSummary;
