// src/components/StandingsTable.jsx
import React, { useState, useEffect } from "react";
import "./standingsTable.css";
import teamInfoData from "../../../../data/teamInfoData.json";
import { FaSortUp, FaSortDown } from "react-icons/fa6";
import {Link} from "react-router-dom"

const StandingsTable = ({ title, teams, divLogo }) => {
  const [sortConfig, setSortConfig] = useState({
    field: "points",
    order: "desc",
  });

  console.log(teams)
  const [isSorting, setIsSorting] = useState(false);

  const teamMap = teamInfoData.teams.reduce((acc, team) => {
    acc[team.abrev] = team;
    return acc;
  }, {});


  useEffect(() => {
    setTimeout(() => setIsSorting(false), 300);
  }, [sortConfig, teams]);

  const handleSort = (field) => {
    if (!sortConfig) return;

    const currentConfig = sortConfig;
    const order =
      currentConfig.field === field && currentConfig.order === "asc"
        ? "desc"
        : "asc";

    setSortConfig((prev) => ({
      ...prev,
      field,
      order,
    }));
    setIsSorting(true);
  };

  const sortedTeams = [...teams].sort((a, b) => {
    if (sortConfig.field === "name") {
      const nameA = (teamMap[a.abrev]?.name || a.abrev).toLowerCase();
      const nameB = (teamMap[b.abrev]?.name || b.abrev).toLowerCase();
      if (nameA < nameB) return sortConfig.order === "asc" ? -1 : 1;
      if (nameA > nameB) return sortConfig.order === "asc" ? 1 : -1;
      return 0;
    }
    let valA = a[sortConfig.field];
    let valB = b[sortConfig.field];

    if (typeof valA === "string") {
      return sortConfig.order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else {
      return sortConfig.order === "asc" ? valA - valB : valB - valA;
    }
  });

  const renderHeaders = (headers) => {
    return (
      <div className={`standings-table-header`}>
        {headers.map(({ label, field }) => (
          <span
            key={field}
            className={`header-cell team-${field}`}
            onClick={() => handleSort(field)}
          >
            <div className="sort-arrow__up">
              {sortConfig.field === field ? (
                sortConfig.order === "desc" ? (
                  <FaSortUp />
                ) : null
              ) : (
                ""
              )}
            </div>

            {label === "name" || label === "rank" ? null : label}

            <div className="sort-arrow__down">
              {sortConfig.field === field ? (
                sortConfig.order === "asc" ? (
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

  const headers = [
    { label: "", field: "rank" },
    { label: "", field: "name" },
    { label: "Pts", field: "points" },
    { label: "W", field: "wins" },
    { label: "L", field: "losses" },
    { label: "OTL", field: "otLosses" },
    { label: "GF", field: "goalsFor" },
    { label: "GA", field: "goalsAgainst" },
  ];

  return (
    <div className="standings-table">
      <div className="standings-title">
        <h3>{title}</h3>
        <img src={divLogo} alt="" />
      </div>
      {renderHeaders(headers)}
      <div className="standings-table-body">
        {sortedTeams.map((team, idx) => {
          const teamInfo = teamMap[team.abrev] || {};
          const teamId = teamMap[team.abrev].id
          //   const teamDisplay = `${teamInfo.name || team.abrev} ${
          //     teamInfo.mascot || ""
          //   }`;
          const teamDisplay = `${teamInfo.name || team.abrev}`;
          const teamLogo = `${teamInfo.logo}`;
          return (
            <div
              key={team.teamId || idx}
              className={`standings-row animated-row  ${
                isSorting ? "sorting" : ""
              }`}
            >
              <div className="cell team-rank">{idx + 1}</div>
              <div className="cell team-name">
                <Link to={`/teams/${teamId}`}className="team-column__standingsTable link">
                  <img src={teamLogo} alt="" />
                  <span>{teamDisplay}</span>
                </Link>
              </div>
              <div className="cell team-points">{team.points}</div>
              <div className="cell team-wins">{team.wins}</div>
              <div className="cell team-losses">{team.losses}</div>
              <div className="cell team-ot">{team.otLosses}</div>
              <div className="cell team-gf">{team.goalsFor}</div>
              <div className="cell team-ga">{team.goalsAgainst}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StandingsTable;
