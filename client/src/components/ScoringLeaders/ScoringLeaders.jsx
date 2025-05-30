import React, { useMemo, useState, useEffect } from "react";
import "./scoringLeaders.css";
import LeaderCard from "./LeaderCard/LeaderCard";
import LeaderList from "./LeaderList/LeaderList";
import Spinner from "../Spinner/Spinner";

function ScoringLeaders({ team, roster, header, view = "skaters" }) {
  const [seasonStats, setSeasonStats] = useState([]);
  const [goalieStats, setGoalieStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(
    view === "goalies" ? "gaa" : "points"
  );
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      setLoading(true);
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      try {
        const [player, goalie] = await Promise.all([
          fetch(
            `http://localhost:5000/api/playerSeasonStats/search?teamId=${team.id}`
          ).then((res) => res.json()),
          fetch(
            `http://localhost:5000/api/goalieSeasonStats/search?teamId=${team.id}`
          ).then((res) => res.json()),
          delay(1250), // minimum 2 second delay to show spinner
        ]);

        // const data = await res.json();
        setSeasonStats(player);
        setGoalieStats(goalie);

        // console.log(player);
      } catch (error) {
        console.error("Failed to fetch roster:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, [team.id]);

  const leaderBoards = useMemo(() => {
    if (!seasonStats.length && !goalieStats.length) return {};

    const goalies = goalieStats.map((stat) => {
      const player = stat.Player || {
        firstName: "Unknown",
        lastName: "Goalie",
        number: "--",
        positionAbrev: "--",
        positionType: "Goalie",
      };

      const team = stat.Team || {
        name: "Unknown",
        abrev: "--",
        logo: "",
      };

      return {
        player,
        team,
        savePct: stat.savePct?.toFixed(3) || "0.000",
        gaa: stat.gaa?.toFixed(2) || "--",
        wins: stat.wins || 0,
        points: 0, // so it doesn't break sorting
        goals: 0,
        assists: 0,
      };
    });

    const players = seasonStats.map((stat) => {
      const player = stat.Player || {
        firstName: "Unknown",
        lastName: "Player",
        number: "--",
        positionAbrev: "--",
        positionType: "Skater",
      };

      const team = stat.Team || {
        name: "Unknown",
        abrev: "--",
        logo: "",
      };
      return {
        player,
        team,
        goals: stat.totalGoals || 0,
        assists: stat.totalAssists || 0,
        points: (stat.totalGoals || 0) + (stat.totalAssists || 0),
        savePct: "--",
        gaa: "--",
        wins: "--",
      };
    });

    const skaters = players.filter((p) => p.player.positionType !== "Goalie");

    return {
      points: skaters.sort((a, b) => b.points - a.points).slice(0, 5),
      goals: skaters.sort((a, b) => b.goals - a.goals).slice(0, 5),
      assists: skaters.sort((a, b) => b.assists - a.assists).slice(0, 5),
      savePct: goalies
        .sort((a, b) => parseFloat(b.savePct) - parseFloat(a.savePct))
        .slice(0, 5),
      gaa: goalies
        .sort((a, b) => parseFloat(a.gaa) - parseFloat(b.gaa))
        .slice(0, 5),
      wins: goalies.sort((a, b) => b.wins - a.wins).slice(0, 5),
    };
  }, [seasonStats]);

  const handleSelect = (type) => {
    setSelected(type);
  };

  const statdataSet = leaderBoards[selected];

  // Set Default Hover
  useEffect(() => {
    if (!statdataSet || statdataSet.length === 0) {
      setHoveredPlayer(null);
      return;
    }

    setHoveredPlayer(statdataSet[0]);
  }, [statdataSet]);

  // Save Hoover
  // const defaultHover = useMemo(() => {
  //   const list = leaderBoards[selected];
  //   return list?.length > 0 ? list[0] : null;
  // }, [leaderBoards, selected]);

  // useEffect(() => {
  //   setHoveredPlayer(defaultHover);
  // }, [defaultHover]);

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

      {loading ? (
        <Spinner />
      ) : (
        <div
          className={`scoring-grid__scoringLeaders ${
            !loading ? "fade-in" : null
          }`}
        >
          <LeaderCard
            team={team}
            player={hoveredPlayer}
            type={selected}
            view={view}
          />
          <LeaderList
            loading={loading}
            data={statdataSet || []}
            goalieData={goalieStats}
            defaultSelectedId={hoveredPlayer ? hoveredPlayer.player.id : null}
            onHover={setHoveredPlayer}
            renderRow={(row) => (
              <>
                <div className="leader-list-cell">
                  {row.player.firstName} {row.player.lastName}
                </div>
                <div className="leader-list-cell">{row[selected]}</div>
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}

export default ScoringLeaders;
