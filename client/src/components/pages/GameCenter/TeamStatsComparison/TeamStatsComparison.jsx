import React, { useEffect, useState } from "react";
import gameSchedule from "../../../../data/gameSchedule.json";
import gameStats from "../../../../data/gameStats.json";
import "./teamStatsComparison.css";

const TeamStatsComparison = ({ gameId }) => {
  const [gameData, setGameData] = useState(null);
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    const game = gameSchedule.find((game) => game.gameId === gameId);
    const stats = gameStats.find((stat) => stat.gameId === gameId);

    // console.log(stats)

    if (game && stats) {
      setGameData(game);
      setStatsData(stats);
    }
  }, [gameId]);

//   console.log(statsData);

  if (!gameData || !statsData) return <div>Loading game data...</div>;

  const { home, away } = gameData;
  const homeStats = statsData.home;
  const awayStats = statsData.away;

  const calculatePowerPlayPercentage = (teamStats) => {
    const { powerPlayGoals, powerPlayOpportunities } = teamStats;
    return powerPlayOpportunities > 0
      ? ((powerPlayGoals / powerPlayOpportunities) * 100).toFixed(1) + "%"
      : "0%";
  };

  const calculateFaceoffPercentage = (teamStats) => {
    const { faceoffWins, faceoffLosses } = teamStats;
    const totalFaceoffs = faceoffWins + faceoffLosses;
    return totalFaceoffs > 0
      ? ((faceoffWins / totalFaceoffs) * 100).toFixed(1) + "%"
      : "0%";
  };

  const statCategories = [
    { label: "Shots", home: home.shotsFor, away: away.shotsFor },
    { label: "Goals", home: home.score, away: away.score },
    {
      label: "Power Play %",
      home: calculatePowerPlayPercentage(homeStats),
      away: calculatePowerPlayPercentage(awayStats),
    },
    {
      label: "Penalty Minutes",
      home: homeStats.penaltyMinutes,
      away: awayStats.penaltyMinutes,
    },
    {
      label: "Faceoff %",
      home: calculateFaceoffPercentage(homeStats),
      away: calculateFaceoffPercentage(awayStats),
    },
    { label: "Hits", home: homeStats.hits, away: awayStats.hits },
    {
      label: "Blocked Shots",
      home: homeStats.blockedShots,
      away: awayStats.blockedShots,
    },
  ];

  const calculatePercentage = (homeValue, awayValue) => {
    const total = homeValue + awayValue;
    if (total === 0) return "0%";
    return `${((homeValue / total) * 100).toFixed(1)}`;
  };

  const calculatePowerPlayShare = (homeGoals, awayGoals) => {
    const totalGoals = homeGoals + awayGoals;
    if (totalGoals === 0) return { home: "0%", away: "0%" };

    const homeShare = ((homeGoals / totalGoals) * 100).toFixed(1);
    const awayShare = ((awayGoals / totalGoals) * 100).toFixed(1);

    return {
      home: `${homeShare}%`,
      away: `${awayShare}%`,
    };
  };

//   console.log(homeStats);

//   console.log(
//     calculatePowerPlayShare(homeStats.powerPlayGoals, awayStats.powerPlayGoals)
//       .home
//   );

  let faceoff = statCategories[4].home;
  let faceoffNumber = 100 - parseFloat(faceoff.replace("%", ""));
  let faceoffString = faceoffNumber.toString();

  return (
    <div className="team-stats-comparison">
      <div className="team-stats-header">
        <img src={home.logo} alt="" className="" />
        <h1>Game Stats</h1>
        <img src={away.logo} alt="" className="" />
      </div>

      <div className="team-stats-grid">
        {statCategories.map((stats, index) => {
          let percentage = calculatePercentage(stats.home, stats.away);

          return (
            <div className="team-row__teamStats">
              <div className="content__teamStats">
                <div className="stat__teamStats home__teamStats">
                  {/* {stats.home}{" "} */}
                  {stats.label === "Power Play %" ? (
                    <div className="powerplay-rate">
                      {stats.home}
                      <div className="powerplay-value">
                        ({homeStats.powerPlayGoals} /{" "}
                        {homeStats.powerPlayOpportunities})
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
                        ({awayStats.powerPlayGoals} /{" "}
                        {awayStats.powerPlayOpportunities})
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
                            homeStats.powerPlayGoals,
                            awayStats.powerPlayGoals
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
                              homeStats.powerPlayGoals,
                              awayStats.powerPlayGoals
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

        {/* <div className="team-column">
          {statCategories.map((stat, index) => (
            <div key={index} className="team-stat-value">
              {stat.home}
            </div>
          ))}
        </div>

        <div className="stat-column">
          {statCategories.map((stat, index) => (
            <div key={index} className="stat-label">
              {stat.label}
            </div>
          ))}
        </div>

        <div className="team-column">
          {statCategories.map((stat, index) => (
            <div key={index} className="team-stat-value">
              {stat.away}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default TeamStatsComparison;
