import React, { useState, useEffect } from "react";
import "./GameSummary.css";
import { Link } from "react-router-dom";
import TeamStatsComparison from "../TeamStatsComparison/TeamStatsComparison";
import BoxScore from "../BoxScore/BoxScore";

const GameSummary = ({
  game,
  goalEvents,
  gameEvents,
  homeId,
  awayId,
  boxScore,
  teams,
  currentGame,
  stats,
  matchups,
}) => {
  const { date, home, away } = game;

  const [selected, setSelected] = useState("Summary");
  const [seriesRecordLabel, setSeriesRecordLabel] = useState("");

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

  // Filtering Goal Events
  const gameGoals = goalEvents
    .filter((event) => event.gameId === currentGame.id)
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

  const homeTeam = boxScore.filter((team) => team.teamId === teams.homeTeam.id);
  const awayTeam = boxScore.filter((team) => team.teamId === teams.awayTeam.id);

  const homeRoster = homeTeam ? homeTeam : [];
  const awayRoster = awayTeam ? awayTeam : [];
  // const homeTeam = teamRosters.find((team) => team.team === home.abrev);
  // const awayTeam = teamRosters.find((team) => team.team === away.abrev);

  // const homeRoster = homeTeam ? homeTeam.roster : [];
  // const awayRoster = awayTeam ? awayTeam.roster : [];

  // Helper function to get player info
  const getPlayerInfo = (playerId) => {
    const player =
      homeRoster.find((p) => p.Player.id === playerId) ||
      awayRoster.find((p) => p.Player.id === playerId);

    return player
      ? `${player.Player.firstName} ${player.Player.lastName}`
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
  useEffect(() => {
    if (matchups.length > 0) {
      const h2hGames = matchups;
      const h2hRecord = {
        [teams.homeTeam.abrev]: { wins: 0, losses: 0, ties: 0 },
        [teams.awayTeam.abrev]: { wins: 0, losses: 0, ties: 0 },
      };

      h2hGames.forEach((g) => {
        const homeScore = g.homeScore;
        const awayScore = g.awayScore;

        if (homeScore > awayScore) {
          h2hRecord[g.homeTeam.abrev].wins += 1;
          h2hRecord[g.awayTeam.abrev].losses += 1;
        } else if (homeScore < awayScore) {
          h2hRecord[g.awayTeam.abrev].wins += 1;
          h2hRecord[g.homeTeam.abrev].losses += 1;
        } else {
          h2hRecord[g.homeTeam.abrev].ties += 1;
          h2hRecord[g.awayTeam.abrev].ties += 1;
        }
      });
      const homeTeamWins = h2hRecord[teams.homeTeam.abrev].wins;
      const awayTeamWins = h2hRecord[teams.awayTeam.abrev].wins;

      let h2hLeader = `Tied ${homeTeamWins} - ${awayTeamWins}`;

      if (homeTeamWins > awayTeamWins) {
        h2hLeader = `${teams.homeTeam.abrev} leads ${homeTeamWins} - ${awayTeamWins}`;
      } else if (awayTeamWins > homeTeamWins) {
        h2hLeader = `${teams.awayTeam.abrev} leads ${awayTeamWins} - ${homeTeamWins}`;
      }
      setSeriesRecordLabel(h2hLeader);
    }
  }, [matchups]);

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
              const periodEvents = goalEvents.filter(
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
            teams={teams}
            boxScore={boxScore}
            game={currentGame}
            stats={stats}
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
              <div key={period} className="header-label">
                {period}
              </div>
            ))}
            <div className="header-label">T</div>
          </div>
          <div className="line-score-row">
            <Link to={`/teams/${homeId}`} className="line-score-name link">
              <img src={`${home.logo}`} alt="" />
              {home.abrev}
            </Link>
            {periods.map((period, index) => (
              <div key={index} className="period-scores">
                {periodScores.home[index]}
              </div>
            ))}
            <div className="period-scores">{home.score}</div>
          </div>
          <div className="line-score-row">
            <Link to={`/teams/${awayId}`} className="line-score-name link">
              <img src={`${away.logo}`} alt="" />
              {away.abrev}
            </Link>
            {periods.map((period, index) => (
              <div key={index} className="period-scores">
                {periodScores.away[index]}
              </div>
            ))}
            <div className="period-scores">{away.score}</div>
          </div>
        </div>
        <TeamStatsComparison
          stat={stats}
          gameId={game.gameId}
          homeId={homeId}
          awayId={awayId}
        />
        <div className="head-to-head-header">
          <h1>Season Series</h1>
          <div className="series-record">
            {seriesRecordLabel} {}
          </div>
        </div>
        <div className="head-to-head-grid">
          {matchups.length > 0 ? (
            matchups.map((match, index) => (
              <Link
                key={index}
                to={`/gamecenter/${matchups[index].id}`}
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
                        <img src={match.homeTeam.logo} alt="" />
                        <span>{match.homeTeam.abrev}</span>
                      </div>
                      {match.status !== "Scheduled" ? (
                        <span className="score__headToHead">
                          {match.homeScore}
                        </span>
                      ) : (
                        <span className="score__headToHead">-</span>
                      )}
                    </div>
                    <div className="vs__headToHead">
                      <span>vs</span>
                    </div>
                    <div className="team__headToHead away__headToHead">
                      <div className="team-name__headToHead">
                        <img src={match.awayTeam.logo} alt="" />
                        <span>{match.awayTeam.abrev}</span>
                      </div>
                      {match.status !== "Scheduled" ? (
                        <span className="score__headToHead">
                          {match.awayScore}
                        </span>
                      ) : (
                        <span className="score__headToHead">-</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
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
