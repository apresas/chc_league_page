// src/components/RosterTable.jsx
import React, { useState, useEffect } from "react";
import "./rosterTable.css";
import { FaSortUp, FaSortDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const PositionGroup = ({ title, players, team, loading }) => {
  const [sortKey, setSortKey] = useState("number");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortConfig, setSortConfig] = useState({
    field: "number",
    order: "desc",
  });

  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsSorting(false), 300);
  }, [sortConfig, team]);

  const classRank = {
    freshman: 1,
    sophomore: 2,
    junior: 3,
    senior: 4,
  };

  const handleSort = (field) => {
    if (field === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(field);
      setSortDirection("asc");
    }
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

  const sortedPlayers = [...players].sort((a, b) => {
    const parseHeight = (h) => {
      const match = h.match(/(\d+)'(\d+)"/);
      if (!match) return 0;
      return parseInt(match[1]) * 12 + parseInt(match[2]);
    };

    let valA =
      sortKey === "name"
        ? `${a.name.last} ${a.name.first}`
        : sortKey?.includes(".")
        ? sortKey.split(".").reduce((o, i) => o[i], a)
        : a[sortKey];

    let valB =
      sortKey === "name"
        ? `${b.name.last} ${b.name.first}`
        : sortKey?.includes(".")
        ? sortKey.split(".").reduce((o, i) => o[i], b)
        : b[sortKey];

    if (sortKey === "height") {
      valA = parseHeight(valA);
      valB = parseHeight(valB);
    }

    if (sortKey === "class") {
      valA = classRank[valA?.toLowerCase()] ?? 0;
      valB = classRank[valB?.toLowerCase()] ?? 0;
    }

    if (valA === undefined || valB === undefined) return 0;

    return typeof valA === "number"
      ? sortDirection === "asc"
        ? valA - valB
        : valB - valA
      : sortDirection === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  const renderHeaders = (headers) => {
    return (
      <div className={`roster-table-header`}>
        {headers.map(({ label, field }) => (
          <span
            key={field}
            className={`roster-header-cell team-${field}`}
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

            {field === "name" ? title : label}

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
    { label: "", field: "name" },
    { label: "#", field: "number" },
    { label: "Pos", field: "position" },
    { label: "Class", field: "class" },
    { label: "Ht", field: "height" },
    { label: "Wt", field: "weight" },
  ];

  return (
    <div className="roster-group">
      {/* <h3>{title}</h3> */}
      {renderHeaders(headers)}
      {loading ? (
        <Spinner/>
      ) : (
        <div className={`roster-table-body ${!loading ? "fade-in" : null}`}>
          {sortedPlayers.map((p, index) => (
            <Link
              key={index}
              to={`/players/${p.id}`}
              className={`roster-table-row animated-row link ${
                isSorting ? "sorting" : ""
              }`}
            >
              <div className="roster-table-cell roster-name-cell">
                <div className="roster-portrait">
                  {title === "Goalies" ? (
                    <img src={`/teamIcons/${team}_goalie.svg`} alt="" />
                  ) : (
                    <img src={`/teamIcons/${team}.svg`} alt="" />
                  )}
                </div>
                {p.firstName} {p.lastName}
              </div>
              <div className="roster-table-cell">{p.number}</div>
              <div className="roster-table-cell">{p.positionAbrev}</div>
              <div className="roster-table-cell">{p.class}</div>
              <div className="roster-table-cell">{p.height}</div>
              <div className="roster-table-cell">{p.weight} lbs</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const RosterTable = ({ title = "Roster", players, team, loading }) => {
  const forwards = players.filter((p) => p.positionType === "Forward");
  const defense = players.filter((p) => p.positionType === "Defense");
  const goalies = players.filter((p) => p.positionType === "Goalie");

  return (
    <div className="roster-table">
      <h1>{title}</h1>
      <PositionGroup
        title="Forwards"
        players={forwards}
        team={team}
        loading={loading}
      />
      <PositionGroup
        title="Defense"
        players={defense}
        team={team}
        loading={loading}
      />
      <PositionGroup
        title="Goalies"
        players={goalies}
        team={team}
        loading={loading}
      />
    </div>
  );
};

export default RosterTable;
