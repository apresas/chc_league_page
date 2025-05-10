import React, { useMemo, useState, useEffect } from "react";
import "./scoringLeaders.css";
import LeaderCard from "./LeaderCard/LeaderCard";
import LeaderList from "./LeaderList/LeaderList";
// import goalEvents from "../../data/gameEvents.json";
import goalEvents from "../../data/goalEvents.json";
import gamesData from "../../data/gameSchedule.json";
// import gamesData from "../../data/scheduledGames.json";

function ScoringLeaders({ team, roster, header, view = "skaters" }) {
  const [selected, setSelected] = useState(
    view === "goalies" ? "gaa" : "points"
  );
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  const handleSelect = (type) => {
    setSelected(type);
  };

  /**
   * Calculate Skater and Goalie Stats
   */
  const dataMap = useMemo(() => {
    const goalMap = {};
    const assistMap = {};
    const goalieStats = {};

    goalEvents.forEach((goal) => {
      const scorer = goal.scorerId;
      const assists = goal.assistIds || [];
      const goalies = goal.goalieIds || [];

      if (scorer) {
        goalMap[scorer] = (goalMap[scorer] || 0) + 1;
      }

      assists.forEach((aid) => {
        assistMap[aid] = (assistMap[aid] || 0) + 1;
      });

      goalies.forEach((gid) => {
        if (!goalieStats[gid]) {
          goalieStats[gid] = {
            shotsAgainst: 0,
            goalsAgainst: 0,
            wins: 0,
            gamesPlayed: 0,
          };
        }
        goalieStats[gid].shotsAgainst += 1;
        goalieStats[gid].goalsAgainst += 1;
      });
    });

    // Calculate Goalie Stats from `scheduledGames.json`
    gamesData.forEach((game) => {
      const { home, away } = game;

      const updateGoalieStats = (team, opponent, isHome) => {
        const goalieId = team.startingGoalie;
        if (!goalieId) return;

        const goalsAgainst = isHome ? opponent.score : team.score;
        const shotsAgainst = isHome ? opponent.shotsFor : team.shotsFor;
        const isWin = team.score > opponent.score;

        if (!goalieStats[goalieId]) {
          goalieStats[goalieId] = {
            shotsAgainst: 0,
            goalsAgainst: 0,
            wins: 0,
            gamesPlayed: 0,
          };
        }

        goalieStats[goalieId].goalsAgainst += goalsAgainst;
        goalieStats[goalieId].shotsAgainst += shotsAgainst;
        goalieStats[goalieId].gamesPlayed += 1;

        if (isWin) {
          goalieStats[goalieId].wins += 1;
        }

        console.log(goalieStats[goalieId])
      };

      updateGoalieStats(home, away, true);
      updateGoalieStats(away, home, false);
    });

    let playerStats = roster.map((player) => {
      const id = player.id;
      const goals = goalMap[id] || 0;
      const assists = assistMap[id] || 0;
      const points = goals + assists;

      const isGoalie = player.positionType === "Goalie";
      const goalieData = goalieStats[id] || {
        shotsAgainst: 0,
        goalsAgainst: 0,
        wins: 0,
        gamesPlayed: 0,
      };

      const savePct =
        goalieData.shotsAgainst > 0
          ? (
              (goalieData.shotsAgainst - goalieData.goalsAgainst) /
              goalieData.shotsAgainst
            ).toFixed(3)
          : "0.000";

      const gaa =
        goalieData.gamesPlayed > 0
          ? (goalieData.goalsAgainst / goalieData.gamesPlayed).toFixed(2)
          : "--";

      return {
        player,
        goals,
        assists,
        points,
        savePct,
        gaa,
        wins: goalieData.wins,
      };
    });

    // Apply view filters
    if (view === "forwards") {
      playerStats = playerStats.filter(
        (entry) => entry.player.positionType === "Forward"
      );
    } else if (view === "defense") {
      playerStats = playerStats.filter(
        (entry) => entry.player.positionType === "Defense"
      );
    } else if (view === "goalies") {
      playerStats = playerStats.filter(
        (entry) => entry.player.positionType === "Goalie"
      );
    } else if (view === "skaters") {
      playerStats = playerStats.filter(
        (entry) => entry.player.positionType !== "Goalie"
      );
    }

    return {
      points: playerStats.sort((a, b) => b.points - a.points).slice(0, 5),
      goals: playerStats.sort((a, b) => b.goals - a.goals).slice(0, 5),
      assists: playerStats.sort((a, b) => b.assists - a.assists).slice(0, 5),
      savePct: playerStats
        .sort((a, b) => parseFloat(b.savePct) - parseFloat(a.savePct))
        .slice(0, 5),
      gaa: playerStats
        .sort((a, b) => parseFloat(a.gaa) - parseFloat(b.gaa))
        .slice(0, 5),
      wins: playerStats.sort((a, b) => b.wins - a.wins).slice(0, 5),
    };
  }, [roster, view]);

  const dataSet = dataMap[selected];

  useEffect(() => {
    if (dataSet.length > 0) {
      setHoveredPlayer(dataSet[0]);
    } else {
      setHoveredPlayer(null);
    }
  }, [dataSet, selected]);

   /**
   * Set Default Selection Based on Lowest GAA for Goalies
   */
   useEffect(() => {
    if (view === "goalies" && dataMap.gaa.length > 0) {
      setSelected("gaa");
      setHoveredPlayer(dataMap.gaa[0]);
    } else if (dataSet.length > 0) {
      setHoveredPlayer(dataSet[0]);
    }
  }, [dataMap, view]);

  return (
    <div className="scoring-leader">
      <h3 className="scoring-header">{header}</h3>
      <div className="scoring-controls">
        <div className="scoring-controls-btns">
          {view === "goalies" ? (
            <>
              <button
                className={`scoring-btn ${
                  selected === "gaa" ? "btn-selected" : null
                }`}
                onClick={() => handleSelect("gaa")}
              >
                GAA
              </button>
              <button
                className={`scoring-btn ${
                  selected === "savePct" ? "btn-selected" : null
                }`}
                onClick={() => handleSelect("savePct")}
              >
                SV%
              </button>
              <button
                className={`scoring-btn ${
                  selected === "wins" ? "btn-selected" : null
                }`}
                onClick={() => handleSelect("wins")}
              >
                Wins
              </button>
            </>
          ) : (
            <>
              <button
                className={`scoring-btn ${
                  selected === "points" ? "btn-selected" : null
                }`}
                onClick={() => handleSelect("points")}
              >
                Points
              </button>
              <button
                className={`scoring-btn ${
                  selected === "goals" ? "btn-selected" : null
                }`}
                onClick={() => handleSelect("goals")}
              >
                Goals
              </button>
              <button
                className={`scoring-btn ${
                  selected === "assists" ? "btn-selected" : null
                }`}
                onClick={() => handleSelect("assists")}
              >
                Assists
              </button>
            </>
          )}
        </div>
      </div>

      <div className="scoring-grid__scoringLeaders">
        <LeaderCard team={team} player={hoveredPlayer} type={selected} view={view}/>

        <LeaderList
          data={dataSet}
          defaultSelectedId={hoveredPlayer ? hoveredPlayer.player.id : null}
          onHover={setHoveredPlayer}
          renderRow={(row) => (
            <>
              <div className="leader-list-cell">
                {row.player.name.first} {row.player.name.last}
              </div>
              <div className="leader-list-cell">{row[selected]}</div>
            </>
          )}
        />
      </div>
    </div>
  );
}

export default ScoringLeaders;
