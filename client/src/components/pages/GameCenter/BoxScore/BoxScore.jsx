import React, { useState, useEffect } from "react";
import "./BoxScore.css";
import { FaSortUp, FaSortDown } from "react-icons/fa6";

const BoxScore = ({
  teams,
  boxScore,
  game,
  stats,
}) => {
  const [selectedTeam, setSelectedTeam] = useState("home");
  const [sortConfig, setSortConfig] = useState({
    forwards: { field: "points", order: "desc" },
    defense: { field: "points", order: "desc" },
    goalies: { field: "saves", order: "desc" },
  });
  const [isSorting, setIsSorting] = useState(false);
  const [teamBoxScore, setTeamBoxScore] = useState({
    home: {
      forwards: [],
      defense: [],
      goalies: [],
    },
    away: {
      forwards: [],
      defense: [],
      goalies: [],
    },
  });



  useEffect(() => {
    console.log(stats)
    const getPlayersByTeam = () => {
      const homeId = teams.homeTeam.id;
      const awayId = teams.awayTeam.id;
      const homeBoxScore = boxScore.filter((b) => b.teamId === homeId);
      const awayBoxScore = boxScore.filter((b) => b.teamId === awayId);
      const homeForwards = homeBoxScore.filter(
        (b) => b.Player.positionType === "Forward"
      );
      const homeDefense = homeBoxScore.filter(
        (b) => b.Player.positionType === "Defense"
      );
      const awayForwards = awayBoxScore.filter(
        (b) => b.Player.positionType === "Forward"
      );
      const awayDefense = awayBoxScore.filter(
        (b) => b.Player.positionType === "Defense"
      );

      const homeGoalies = stats.Game.homeTeam.Players.filter(
        (b) => b.positionType === "Goalie"
      );
      const awayGoalies = stats.Game.awayTeam.Players.filter(
        (b) => b.positionType === "Goalie"
      );
      
      const homeStarter = homeGoalies.find(
        (g) => g.id === game.homeStartingGoalieId
      );
      const awayStarter = awayGoalies.find(
        (g) => g.id === game.awayStartingGoalieId
      );

      const homeBackup = homeGoalies.find(
        (g) => g.id !== game.homeStartingGoalieId
      );
      const awayBackup = awayGoalies.find(
        (g) => g.id !== game.awayStartingGoalieId
      );

      const homeSV = (
        (stats.awayShotsFor - game.awayScore) /
        stats.awayShotsFor
      ).toFixed(3);

      const awaySV = (
        (stats.homeShotsFor - game.homeScore) /
        stats.homeShotsFor
      ).toFixed(3);

      const homeStarterObject = {
        Player: homeStarter,
        saves: stats.awayShotsFor - game.awayScore,
        shotsAgainst: stats.awayShotsFor,
        goalsAgainst: game.awayScore,
        savePercentage: homeSV,
        EVGA: game.awayScore - stats.awayPowerplayGoals,
        PPGA: stats.awayPowerplayGoals,
      };

      const awayStarterObject = {
        Player: awayStarter,
        saves: stats.homeShotsFor - game.homeScore,
        shotsAgainst: stats.homeShotsFor,
        goalsAgainst: game.homeScore,
        savePercentage: awaySV,
        EVGA: game.homeScore - stats.homePowerplayGoals,
        PPGA: stats.homePowerplayGoals,
      };

      const homeGoaliesArray = [homeStarterObject];
      const awayGoaliesArray = [awayStarterObject];

      if (homeBackup.length > 0) {
        const homeBackupObject = {
          Player: homeBackup,
          saves: 0,
          shotsAgainst: 0,
          goalsAgainst: 0,
          savePercentage: 0.0,
          EVGA: 0,
          PPGA: 0,
        };
        homeGoaliesArray.push(homeBackupObject);
      }

      if (awayBackup.length > 0) {
        const awayBackupObject = {
          Player: awayBackup,
          saves: 0,
          shotsAgainst: 0,
          goalsAgainst: 0,
          savePercentage: 0.0,
          EVGA: 0,
          PPGA: 0,
        };
        awayGoaliesArray.push(awayBackupObject);
      }

      setTeamBoxScore({
        home: {
          forwards: homeForwards,
          defense: homeDefense,
          goalies: homeGoaliesArray,
        },
        away: {
          forwards: awayForwards,
          defense: awayDefense,
          goalies: awayGoaliesArray,
        },
      });
    };

    getPlayersByTeam();
  }, []);

  useEffect(() => {
    console.log(teamBoxScore)
  }, [teamBoxScore])

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
    setIsSorting(true);
  };

  useEffect(() => {
    setTimeout(() => setIsSorting(false), 300);
  }, [sortConfig, teamBoxScore]);

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
    const sortedPlayers = sortData(players, section);
    return sortedPlayers.map((player) => (
      <div
        key={player.Player.id}
        className={`player-row animated-row__boxScore  ${
          isSorting ? "sorting" : ""
        }`}
      >
        <span>{player.Player.number}</span>
        <span className="player-name__boxScore">{`${player.Player.firstName} ${player.Player.lastName}`}</span>
        <span>{player.goals}</span>
        <span>{player.assists}</span>
        <span>{player.points}</span>
        <span>{player.shots}</span>
        <span>{player.hits}</span>
        <span>{player.penaltyMinutes}</span>
      </div>
    ));
  };

  const renderGoalieStats = (goalies) => {
    const sortedGoalies = sortData(goalies, "goalies");
    return sortedGoalies.map((goalie) => (
      <div
        key={goalie.id}
        className={`goalie-row animated-row__boxScore  ${
          isSorting ? "sorting" : ""
        }`}
      >
        <span>{goalie.Player.number}</span>
        <span className="goalie-name__boxScore">{`${goalie.Player.firstName} ${goalie.Player.lastName}`}</span>
        <span>{goalie.saves}</span>
        <span>{goalie.shotsAgainst}</span>
        <span>{goalie.goalsAgainst}</span>
        <span>{goalie.savePercentage}%</span>
        <span>{goalie.EVGA}</span>
        <span>{goalie.PPGA}</span>
      </div>
    ));
  };

  // const forwards = teamStats.filter((p) => p.positionType === "Forward");
  // const defense = teamStats.filter((p) => p.positionType === "Defense");
  // const goalies = teamStats.filter((p) => p.positionType === "Goalie");

  const forwards =
    selectedTeam === "home"
      ? teamBoxScore.home.forwards
      : teamBoxScore.away.forwards;
  const defense =
    selectedTeam === "home"
      ? teamBoxScore.home.defense
      : teamBoxScore.away.defense;
  const goalies =
    selectedTeam === "home"
      ? teamBoxScore.home.goalies
      : teamBoxScore.away.goalies;

  const skaterHeaders = [
    { label: "#", field: "number" },
    { label: "Name", field: "name.first" },
    { label: "G", field: "goals" },
    { label: "A", field: "assists" },
    { label: "P", field: "points" },
    { label: "S", field: "shots" },
    { label: "HITS", field: "hits" },
    { label: "PIM", field: "penaltyMinutes" },
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
            {teams.homeTeam.name}
          </button>
          <button
            className={`boxscore-btn ${
              selectedTeam === "away" ? "active" : ""
            }`}
            onClick={() => setSelectedTeam("away")}
          >
            {teams.awayTeam.name}
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
