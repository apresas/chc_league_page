// src/components/StandingsTable.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import "./standingsTable.css";
import { FaSortUp, FaSortDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useImageCounter } from "../../../../utils/useImageCounter";

const StandingsTable = ({ title, divLogo, standings, gamesPlayed }) => {
  const [sortConfig, setSortConfig] = useState({
    field: "points",
    order: "desc",
  });

//   useEffect(() => {
//   if (logoImageCount === loadedCount) {
//     setAllImagesLoaded?.((prev) => prev + 1);
//   }
// }, [loadedCount]);

  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsSorting(false), 300);
  }, [sortConfig]);

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

  const sortedTeams = [...standings].sort((a, b) => {
    let valA, valB;

    if (sortConfig.field === "games") {
      valA = gamesPlayed[a.team?.id] || 0;
      valB = gamesPlayed[b.team?.id] || 0;
    } else if (sortConfig.field === "name") {
      const nameA = (a.team?.name || "").toLowerCase();
      const nameB = (b.team?.name || "").toLowerCase();
      if (nameA < nameB) return sortConfig.order === "asc" ? -1 : 1;
      if (nameA > nameB) return sortConfig.order === "asc" ? 1 : -1;
      return 0;
    } else {
      valA = a[sortConfig.field];
      valB = b[sortConfig.field];
    }

    if (typeof valA === "string") {
      return sortConfig.order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else {
      return sortConfig.order === "asc" ? valA - valB : valB - valA;
    }
  });

  // Check Image Load
  const logoImageCount = sortedTeams.length + 1; // +1 for the divLogo

  const { handleImageLoad } = useImageCounter(logoImageCount);

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

  const headers = useMemo(
    () => [
      { label: "", field: "rank" },
      { label: "", field: "name" },
      { label: "GP", field: "games" },
      { label: "W", field: "wins" },
      { label: "L", field: "losses" },
      { label: "OTL", field: "otLosses" },
      { label: "Pts", field: "points" },
      { label: "GF", field: "goalsFor" },
      { label: "GA", field: "goalsAgainst" },
    ],
    []
  );

  return (
    <div className="standings-table">
      <div className="standings-title">
        <h3>{title}</h3>
        <img src={divLogo} alt="" onLoad={handleImageLoad} />
      </div>
      {renderHeaders(headers)}
      <div className="standings-table-body">
        {sortedTeams.map((team, idx) => {
          const teamInfo = team.team || {};
          const teamId = teamInfo.id;
          const teamDisplay = `${teamInfo.name || teamInfo.abrev}`;
          const teamLogo = `${teamInfo.logo}`;
          return (
            <div
              key={team.id || idx}
              className={`standings-row animated-row  ${
                isSorting ? "sorting" : ""
              }`}
            >
              <div className="cell team-rank">{idx + 1}</div>
              <div className="cell team-name">
                <Link
                  to={`/teams/${teamId}`}
                  className="team-column__standingsTable link"
                >
                  <img
                    src={teamLogo || "/default-logo.svg"}
                    alt=""
                    onLoad={handleImageLoad}
                  />
                  <span>{teamDisplay}</span>
                </Link>
              </div>
              <div className="cell team-points">{gamesPlayed[teamId] || 0}</div>
              <div className="cell team-wins">{team.wins}</div>
              <div className="cell team-losses">{team.losses}</div>
              <div className="cell team-ot">{team.otLosses}</div>
              <div className="cell team-points">{team.points}</div>
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
