// src/components/StandingsTable.jsx
import React, { useState } from "react";
import "./standingsTable.css";
import teamInfoData from "../../../../data/teamInfoData.json";

const StandingsTable = ({ title, teams, divLogo }) => {
  const [sortKey, setSortKey] = useState("points");
  const [sortDirection, setSortDirection] = useState("desc");

  const teamMap = teamInfoData.teams.reduce((acc, team) => {
    acc[team.abrev] = team;
    return acc;
  }, {});

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const sortedTeams = [...teams].sort((a, b) => {
    if (sortKey === "name") {
      const nameA = (teamMap[a.abrev]?.name || a.abrev).toLowerCase();
      const nameB = (teamMap[b.abrev]?.name || b.abrev).toLowerCase();
      if (nameA < nameB) return sortDirection === "asc" ? -1 : 1;
      if (nameA > nameB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }
    let valA = a[sortKey];
    let valB = b[sortKey];

    if (typeof valA === "string") {
      return sortDirection === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }
  });

  return (
    <div className="standings-table">
        <div className="standings-title">
        <h3>{title}</h3>
        <img src={divLogo} alt="" />
        </div>
      <div className="standings-table-header">
      <div onClick={() => handleSort("name")} className="cell">
          {/* Rank */}
        </div>
        <div onClick={() => handleSort("name")} className="cell team-name">
          {/* Team */}
        </div>
        <div onClick={() => handleSort("points")} className="cell team-points">
          Pts
        </div>
        <div onClick={() => handleSort("wins")} className="cell team-wins">
          W
        </div>
        <div onClick={() => handleSort("losses")} className="cell team-losses">
          L
        </div>
        <div onClick={() => handleSort("otLosses")} className="cell team-ot">
          OTL
        </div>
        <div onClick={() => handleSort("goalsFor")} className="cell team-gf">
          GF
        </div>
        <div onClick={() => handleSort("goalsAgainst")} className="cell team-ga">
          GA
        </div>
      </div>
      <div className="standings-table-body">
        {sortedTeams.map((team, idx) => {
          const teamInfo = teamMap[team.abrev] || {};
          //   const teamDisplay = `${teamInfo.name || team.abrev} ${
          //     teamInfo.mascot || ""
          //   }`;
          const teamDisplay = `${teamInfo.name || team.abrev}`;
          const teamLogo = `${teamInfo.logo}`
          return (
            <div key={team.teamId || idx} className="standings-row">
              <div className="cell team-rank">{idx + 1}</div>
              <div className="cell team-name"><div className="team-column__standingsTable"><img src={teamLogo} alt="" /><span>{teamDisplay}</span></div></div>
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
