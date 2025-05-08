import React, { useMemo, useState, useEffect } from "react";
import "./scoringLeaders.css";
import LeaderCard from "./LeaderCard/LeaderCard";
import LeaderList from "./LeaderList/LeaderList";
import goalEvents from "../../data/gameEvents.json";

function ScoringLeaders({ team, roster, position = null }) {
  const [selected, setSelected] = useState("points");
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  const handleSelect = (type) => {
    setSelected(type);
  };

  /**
   * Calculate player stats based on goalEvents data.
   */
  const dataMap = useMemo(() => {
    const goalMap = {};
    const assistMap = {};

    goalEvents.forEach((goal) => {
      const scorer = goal.scorerId;
      const assists = goal.assistIds || [];

      // Record goals
      if (scorer) {
        goalMap[scorer] = (goalMap[scorer] || 0) + 1;
      }

      // Record assists
      assists.forEach((aid) => {
        assistMap[aid] = (assistMap[aid] || 0) + 1;
      });
    });

    // Construct player data with stats
    let playerStats = roster.map((player) => {
      const id = player.id;
      const goals = goalMap[id] || 0;
      const assists = assistMap[id] || 0;

      return {
        player,
        goals,
        assists,
        points: goals + assists,
      };
    });

    // Filter by position if specified
    if (position) {
      playerStats = playerStats.filter(
        (entry) => entry.player.positionType === position
      );
    }

    return {
      points: playerStats.sort((a, b) => b.points - a.points).slice(0, 5),
      goals: playerStats.sort((a, b) => b.goals - a.goals).slice(0, 5),
      assists: playerStats.sort((a, b) => b.assists - a.assists).slice(0, 5),
    };
  }, [roster, position]);

  const dataSet = dataMap[selected];

  // Update hovered player when dataSet changes
  useEffect(() => {
    if (dataSet.length > 0) {
      setHoveredPlayer(dataSet[0]);
    } else {
      setHoveredPlayer(null);
    }
  }, [dataSet, selected]);

  return (
    <div className="scoring-leader">
      <div className="scoring-header">
        <h1>{position}</h1>
      </div>
      <div className="scoring-controls">
        <div className="scoring-controls-btns">
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
        </div>
      </div>

      <div className="scoring-grid">
        <LeaderCard team={team} player={hoveredPlayer} type={selected} />

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
