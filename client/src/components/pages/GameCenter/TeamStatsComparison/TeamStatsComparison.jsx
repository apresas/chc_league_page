import React, { useEffect, useState } from "react";
// import gameSchedule from "../../../../data/gameSchedule.json";
// import gameStats from "../../../../data/gameStats.json";
import "./teamStatsComparison.css";
import { Link } from "react-router-dom";

const TeamStatsComparison = ({ stat, gameId, homeId, awayId }) => {
  const setPowerplay = (goals, attempts) => {
    return attempts > 0 ? ((goals / attempts) * 100).toFixed(1) + "%" : "0%";
  };

  const setFaceoffs = (stats) => {
    const totalFaceoffs = stat.homeFaceoffsWon + stat.awayFaceoffsWon;
    return totalFaceoffs > 0
      ? ((stats / totalFaceoffs) * 100).toFixed(1) + "%"
      : "0%";
  };

  const statCategories = [
    { label: "Shots", home: stat.homeShotsFor, away: stat.awayShotsFor },
    { label: "Goals", home: stat.Game.homeScore, away: stat.Game.awayScore },
    {
      label: "Power Play %",
      home: setPowerplay(
        stat.homePowerplayGoals,
        stat.homePowerplayOpportunities
      ),
      away: setPowerplay(
        stat.awayPowerplayGoals,
        stat.awayPowerplayOpportunities
      ),
    },
    {
      label: "Penalty Minutes",
      home: stat.homePenaltyMinutes,
      away: stat.awayPenaltyMinutes,
    },
    {
      label: "Faceoff %",
      home: setFaceoffs(stat.homeFaceoffsWon),
      away: setFaceoffs(stat.awayFaceoffsWon),
    },
    { label: "Hits", home: stat.homeHits, away: stat.awayHits },
  ];

  const calculatePercentage = (homeValue, awayValue) => {
    const total = homeValue + awayValue;
    if (total === 0) return "0%";
    return `${((homeValue / total) * 100).toFixed(1)}`;
  };

  const calculatePowerPlayShare = (homeGoals, awayGoals, home, away) => {
    const totalGoals = homeGoals + awayGoals;
    const totalTries = home + away;
    if (totalTries === 0) return { home: "0%", away: "0%" };

    const homeShare = ((homeGoals / totalGoals) * 100).toFixed(1);
    const awayShare = ((awayGoals / totalGoals) * 100).toFixed(1);

    if (homeShare === awayShare) {
      return {
        home: "50%",
        away: "50%",
      };
    } else {
      return {
        home: `${homeShare}%`,
        away: `${awayShare}%`,
      };
    }
  };

  let faceoff = statCategories[4].home;
  let faceoffNumber = 100 - parseFloat(faceoff.replace("%", ""));
  let faceoffString = faceoffNumber.toString();

  return (
    <div className="team-stats-comparison">
      <div className="team-stats-header">
        <Link
          to={`/teams/${stat.Game.homeTeam.id}`}
          className="headerLogo__teamStats link"
        >
          <img src={stat.Game.homeTeam.logo} alt="" className="" />
        </Link>
        <h1>Game Stats</h1>
        <Link
          to={`/teams/${stat.Game.awayTeam.id}`}
          className="headerLogo__teamStats link"
        >
          <img src={stat.Game.awayTeam.logo} alt="" className="" />
        </Link>
      </div>

      <div className="team-stats-grid">
        {statCategories.map((stats, index) => {
          let percentage = calculatePercentage(stats.home, stats.away);

          return (
            <div key={index} className="team-row__teamStats">
              <div className="content__teamStats">
                <div className="stat__teamStats home__teamStats">
                  {/* {stats.home}{" "} */}
                  {stats.label === "Power Play %" ? (
                    <div className="powerplay-rate">
                      {stats.home}
                      <div className="powerplay-value">
                        ({stat.homePowerplayGoals} /{" "}
                        {stat.homePowerplayOpportunities})
                      </div>
                    </div>
                  ) : (
                    stats.home
                  )}
                </div>
                <div className="stats-label__teamStats">{stats.label}</div>
                <div className="stat__teamStats away__teamStats">
                  {/* {stats.away} */}
                  {stats.label === "Power Play %" ? (
                    <div className="powerplay-rate">
                      <div className="powerplay-value">
                        ({stat.awayPowerplayGoals} /{" "}
                        {stat.awayPowerplayOpportunities})
                      </div>
                      {stats.away}
                    </div>
                  ) : (
                    stats.away
                  )}
                </div>
              </div>
              <div className="stats-bar">
                <div
                  className="seperator"
                  style={{
                    left: `${
                      stats.label === "Faceoff %"
                        ? `${faceoff}`
                        : stats.label === "Power Play %"
                        ? calculatePowerPlayShare(
                            stat.homePowerplayGoals,
                            stat.awayPowerplayGoals,
                            stat.homePowerplayOpportunities,
                            stat.awayPowerplayOpportunities
                          ).home
                        : `${percentage}%`
                    }`,
                    width: `${
                      stats.label === "Faceoff %"
                        ? `${faceoffString}%`
                        : stats.label === "Power Play %"
                        ? `${
                            100 -
                            calculatePowerPlayShare(
                              stat.homePowerplayGoals,
                              stat.awayPowerplayGoals,
                              stat.homePowerplayOpportunities,
                              stat.awayPowerplayOpportunities
                            ).home.replace("%", "")
                          }%`
                        : `${100 - percentage}%`
                    }`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamStatsComparison;
