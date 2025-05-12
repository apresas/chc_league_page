import React, { useState } from "react";
import "./GameSummary.css";
import teamRosters from "../../../../data/teamRosters.json";
import gameData from "../../../../data/gameSchedule.json";
import { Link } from "react-router-dom";
import TeamStatsComparison from "../TeamStatsComparison/TeamStatsComparison";
import BoxScore from "../BoxScore/BoxScore";

const GameSummary = ({ game, goalEvents }) => {
  const { date, home, away } = game;

  const [selected, setSelected] = useState("Summary");

  const handelSelect = (view) => {
    setSelected(view);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

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
  const headToHeadGames = gameData
    .filter(
      (match) =>
        (match.home.abrev === home.abrev && match.away.abrev === away.abrev) ||
        (match.home.abrev === away.abrev && match.away.abrev === home.abrev)
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const headToHeadRecord = {
    [home.abrev]: { wins: 0, losses: 0, ties: 0 },
    [away.abrev]: { wins: 0, losses: 0, ties: 0 },
  };

  headToHeadGames.forEach((game) => {
    const homeScore = game.home.score;
    const awayScore = game.away.score;

    if (homeScore > awayScore) {
      headToHeadRecord[game.home.abrev].wins += 1;
      headToHeadRecord[game.away.abrev].losses += 1;
    } else if (homeScore < awayScore) {
      headToHeadRecord[game.away.abrev].wins += 1;
      headToHeadRecord[game.home.abrev].losses += 1;
    } else {
      headToHeadRecord[game.home.abrev].ties += 1;
      headToHeadRecord[game.away.abrev].ties += 1;
    }
  });

  // Determine Series Leader
  //   let seriesLeader = "Tied";
  const homeWins = headToHeadRecord[home.abrev].wins;
  const awayWins = headToHeadRecord[away.abrev].wins;
  let seriesLeader = `Tied ${homeWins} - ${awayWins}`;

  if (homeWins > awayWins) {
    seriesLeader = `${home.abrev} leads ${homeWins} - ${awayWins}`;
  } else if (awayWins > homeWins) {
    seriesLeader = `${away.abrev} leads ${awayWins} - ${homeWins}`;
  }

  return (
    <div className="game-summary">
      {/* Scoring Summary */}
      <div className="summary-main">
        <div className="controls__gameSummary">
          <div className="control_btns__gameSummary">
            <button
              className={`control-btn__gameSummary ${
                selected === "Summary" ? "btn-selected__gameSummary" : null
              }`}
              onClick={() => handelSelect("Summary")}
            >
              Summary
            </button>
            <button
              className={`control-btn__gameSummary ${
                selected === "Box" ? "btn-selected__gameSummary" : null
              }`}
              onClick={() => handelSelect("Box")}
            >
              Box Score
            </button>
            <button
              className={`control-btn__gameSummary ${
                selected === "Play" ? "btn-selected__gameSummary" : null
              }`}
              onClick={() => handelSelect("Play")}
            >
              Play-By-Play
            </button>
          </div>
        </div>
        {selected === "Summary" ? (
          <>
            {" "}
            <h1>Scoring Summary</h1>
            {periods.map((period) => {
              const periodEvents = gameGoals.filter(
                (event) => event.period === period
              );

              return (
                <div key={period} className="period-section">
                  {periodEvents.length > 0 || period !== "OT" ? (
                    <h3>{period} Period</h3>
                  ) : null}
                  {periodEvents.length > 0 ? (
                    periodEvents.map((event, index) => {
                      const scorer = getPlayerInfo(event.scorerId);
                      const assists = event.assistIds.length
                        ? event.assistIds
                            .map((id) => getPlayerInfo(id))
                            .join(", ")
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
                              <img
                                src={`/teamIcons/${event.team}.svg`}
                                alt=""
                              />
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
                              {homeScore} - {awayScore}{" "}
                              <span>{leadingTeam}</span>
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
                    <div className="no-events">No Events</div>
                  )}
                </div>
              );
            })}
          </>
        ) : selected === "Box" ? (
          <BoxScore
            home={game.home}
            away={game.away}
            teamRosters={teamRosters}
            gameId={gameId}
          />
        ) : null}
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
        <div className="head-to-head-header">
          <h1>Season Series</h1>
          <div className="series-record">
            {seriesLeader} {}
          </div>
        </div>
        <div className="head-to-head-grid">
          {headToHeadGames.length > 0 ? (
            headToHeadGames.map((match, index) => (
              <Link
                to={`/gamecenter/${headToHeadGames[index].gameId}`}
                className="link"
              >
                <div key={index} className="head-to-head-tile">
                  <div className="header__headToHead">
                    <div className="match-date">{formatDate(match.date)}</div>
                    <div className="match-status">{match.status}</div>
                  </div>
                  <div className="match-teams">
                    <div className="team__headToHead home__headToHead">
                      <div className="team-name__headToHead">
                        <img src={match.home.logo} alt="" />
                        <span>{match.home.abrev}</span>
                      </div>
                      <span className="score__headToHead">
                        {match.home.score}
                      </span>
                    </div>
                    <div className="vs__headToHead">
                      <span>vs</span>
                    </div>
                    <div className="team__headToHead away__headToHead">
                      <div className="team-name__headToHead">
                        <img src={match.away.logo} alt="" />
                        <span>{match.away.abrev}</span>
                      </div>
                      <span className="score__headToHead">
                        {match.away.score}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-matches">No previous matchups</div>
          )}
        </div>
        <TeamStatsComparison gameId={game.gameId} />
      </div>
    </div>
  );
};

export default GameSummary;
