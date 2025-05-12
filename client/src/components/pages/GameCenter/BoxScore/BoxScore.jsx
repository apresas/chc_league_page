import React, { useState, useEffect } from "react";
import goalEvents from "../../../../data/goalEvents.json";
import gameStats from "../../../../data/gameStats.json";
import "./BoxScore.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { FaSortUp, FaSortDown } from "react-icons/fa6";

const BoxScore = ({ home, away, teamRosters, gameId }) => {
  const [selectedTeam, setSelectedTeam] = useState("home");
  const [teamStats, setTeamStats] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    forwards: { field: "points", order: "desc" },
    defense: { field: "points", order: "desc" },
    goalies: { field: "saves", order: "desc" },
  });
  console.log(home);
  // Extract team rosters
  const getTeamPlayers = (teamId) => {
    const team = teamRosters.find((team) => team.team === teamId);
    return team ? team.roster : [];
  };

  const calculatePlayerStats = (team) => {
    const teamId = team === "home" ? home.abrev : away.abrev;

    // Extract players for the selected team
    const teamPlayers = getTeamPlayers(teamId);

    const playerStats = teamPlayers.map((player) => ({
      ...player,
      goals: 0,
      assists: 0,
      points: 0,
      saves: 0,
      goalsAgainst: 0,
      shotsAgainst: 0,
      savePercentage: 0,
      evenStrengthGA: 0,
      powerPlayGA: 0,
    }));

    const gameEventsForGame = goalEvents.filter(
      (event) => event.gameId === gameId
    );
    const gameStatsForGame = gameStats.find((game) => game.gameId === gameId);

    console.log(gameStatsForGame);

    gameEventsForGame.forEach((event) => {
      const { scorerId, assistIds, goalieId, isGoal, period, type } = event;

      // Update Skater Stats
      const scorer = playerStats.find((p) => p.id === scorerId);
      if (scorer) {
        scorer.goals += 1;
        scorer.points += 1;
      }

      assistIds.forEach((assistId) => {
        const assister = playerStats.find((p) => p.id === assistId);
        if (assister) {
          assister.assists += 1;
          assister.points += 1;
        }
      });

      // Update Goalie Stats
      if (selectedTeam === "home") {
        const goalie = playerStats.find((p) => p.id === home.startingGoalie);

        if (goalie) {
          goalie.goalsAgainst = away.score;
          goalie.shotsAgainst = away.shotsFor;
          goalie.saves = away.shotsFor - away.score;
          goalie.powerPlayGA = gameStatsForGame.away.powerPlayGoals;
          goalie.evenStrengthGA =
            away.score - gameStatsForGame.away.powerPlayGoals;

          // Calculate save percentage
          if (goalie.shotsAgainst > 0) {
            goalie.savePercentage = (
              (goalie.saves / goalie.shotsAgainst) *
              100
            ).toFixed(1);
          }
        }
      } else if (selectedTeam === "away") {
        const goalie = playerStats.find((p) => p.id === away.startingGoalie);
        if (goalie) {
          goalie.goalsAgainst = home.score;
          goalie.shotsAgainst = home.shotsFor;
          goalie.saves = home.shotsFor - home.score;
          goalie.powerPlayGA = gameStatsForGame.home.powerPlayGoals;
          goalie.evenStrengthGA =
            home.score - gameStatsForGame.home.powerPlayGoals;

          // Calculate save percentage
          if (goalie.shotsAgainst > 0) {
            goalie.savePercentage = (
              (goalie.saves / goalie.shotsAgainst) *
              100
            ).toFixed(1);
          }
        }
      }
    });

    setTeamStats(playerStats);
  };

  useEffect(() => {
    calculatePlayerStats(selectedTeam);
  }, [selectedTeam, gameId]);

  const handleSort = (section, field) => {
    if (!sortConfig[section]) return;

    const currentConfig = sortConfig[section];
    const order =
      currentConfig.field === field && currentConfig.order === "asc"
        ? "desc"
        : "asc";

    setSortConfig((prev) => ({
      ...prev,
      [section]: { field, order },
    }));
  };

  const sortData = (data, section) => {
    const { field, order } = sortConfig[section];

    return [...data].sort((a, b) => {
      const aValue = a[field] !== undefined ? a[field] : 0;
      const bValue = b[field] !== undefined ? b[field] : 0;

      if (order === "asc") return aValue - bValue;
      return bValue - aValue;
    });
  };

  const renderHeaders = (section, headers) => {
    return (
      <div className={`header-row ${section}-header__boxScore`}>
        {headers.map(({ label, field }) => (
          <span
            key={field}
            className={`sortable-header ${label.toLowerCase()}-header__boxScore`}
            onClick={() => handleSort(section, field)}
          >
            <div className="sort-arrow__up">
              {sortConfig[section].field === field ? (
                sortConfig[section].order === "desc" ? (
                  <FaSortUp />
                ) : null
              ) : (
                ""
              )}
            </div>
            {label === "Name"
              ? section.slice(0, 1).toUpperCase() +
                section.slice(1, section.length)
              : label}{" "}
            <div className="sort-arrow__down">
              {sortConfig[section].field === field ? (
                sortConfig[section].order === "asc" ? (
                  <FaSortDown />
                ) : null
              ) : (
                ""
              )}
            </div>
          </span>
        ))}
      </div>
    );
  };

  const renderPlayerStats = (players, section) => {
    console.log(section);
    const sortedPlayers = sortData(players, section);
    return sortedPlayers.map((player) => (
      <div key={player.id} className="player-row">
        <span>{player.number}</span>
        <span className="player-name__boxScore">{`${player.name.first} ${player.name.last}`}</span>
        <span>{player.goals}</span>
        <span>{player.assists}</span>
        <span>{player.points}</span>
      </div>
    ));
  };

  const renderGoalieStats = (goalies) => {
    const sortedGoalies = sortData(goalies, "goalies");
    return sortedGoalies.map((goalie) => (
      <div key={goalie.id} className="goalie-row">
        <span>{goalie.number}</span>
        <span className="goalie-name__boxScore">{`${goalie.name.first} ${goalie.name.last}`}</span>
        <span>{goalie.saves}</span>
        <span>{goalie.shotsAgainst}</span>
        <span>{goalie.goalsAgainst}</span>
        <span>{goalie.savePercentage}%</span>
        <span>{goalie.evenStrengthGA}</span>
        <span>{goalie.powerPlayGA}</span>
      </div>
    ));
  };

  const forwards = teamStats.filter((p) => p.positionType === "Forward");
  const defense = teamStats.filter((p) => p.positionType === "Defense");
  const goalies = teamStats.filter((p) => p.positionType === "Goalie");

  const skaterHeaders = [
    { label: "#", field: "number" },
    { label: "Name", field: "name.first" },
    { label: "G", field: "goals" },
    { label: "A", field: "assists" },
    { label: "P", field: "points" },
  ];

  const goalieHeaders = [
    { label: "#", field: "number" },
    { label: "Name", field: "name.first" },
    { label: "SV", field: "saves" },
    { label: "SA", field: "shotsAgainst" },
    { label: "GA", field: "goalsAgainst" },
    { label: "SV%", field: "savePercentage" },
    { label: "EV GA", field: "evenStrengthGA" },
    { label: "PP GA", field: "powerPlayGA" },
  ];

  return (
    <div className="boxscore-container">
      <div className="boxScore-header">
        <h1>Game Sheet</h1>
        <div className="boxscore-controls">
          <button
            className={`boxscore-btn ${
              selectedTeam === "home" ? "active" : ""
            }`}
            onClick={() => setSelectedTeam("home")}
          >
            {home.name}
          </button>
          <button
            className={`boxscore-btn ${
              selectedTeam === "away" ? "active" : ""
            }`}
            onClick={() => setSelectedTeam("away")}
          >
            {away.name}
          </button>
        </div>
      </div>
      <div className="boxscore-section">
        {renderHeaders("forwards", skaterHeaders)}
        {renderPlayerStats(sortData(forwards, "forwards"), "forwards")}
      </div>

      <div className="boxscore-section">
        {renderHeaders("defense", skaterHeaders)}
        {renderPlayerStats(sortData(defense, "defense"), "defense")}
      </div>

      <div className="boxscore-section">
        {renderHeaders("goalies", goalieHeaders)}
        {renderGoalieStats(sortData(goalies, "goalies"))}
      </div>
    </div>
  );
};

export default BoxScore;
