// src/components/RosterTable.jsx
import React, { useState, useEffect } from "react";
import "./rosterTable.css";

const PositionGroup = ({ title, players, team }) => {
  const [sortKey, setSortKey] = useState("number");
  const [sortDirection, setSortDirection] = useState("asc");

  const classRank = {
    freshman: 1,
    sophomore: 2,
    junior: 3,
    senior: 4,
  };

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
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

  return (
    <div className="roster-group">
      <h3>{title}</h3>
      <div className="roster-table-header">
        <div
          className="roster-table-cell roster-table-header-cell"
          onClick={() => handleSort("name")}
        >
          Player
        </div>
        <div
          className="roster-table-cell roster-table-header-cell"
          onClick={() => handleSort("number")}
        >
          #
        </div>
        <div
          className="roster-table-cell roster-table-header-cell"
          onClick={() => handleSort("positionAbbr")}
        >
          Pos
        </div>
        <div
          className="roster-table-cell roster-table-header-cell"
          onClick={() => handleSort("class")}
        >
          Class
        </div>
        <div
          className="roster-table-cell roster-table-header-cell"
          onClick={() => handleSort("height")}
        >
          Height
        </div>
        <div
          className="roster-table-cell roster-table-header-cell"
          onClick={() => handleSort("weight")}
        >
          Weight
        </div>
        {/* <div className="roster-table-cell roster-table-header-cell" onClick={() => handleSort("dob")}>DOB</div> */}
        {/* <div className="roster-table-cell roster-table-header-cell">Captain</div> */}
      </div>
      <div className="roster-table-body">
        {sortedPlayers.map((p, index) => (
          <div key={index} className="roster-table-row">
            <div className="roster-table-cell roster-name-cell">
              <div className="roster-portrait">
                {title === "Goalies" ? <img src={`/teamIcons/${team}_goalie.svg`} alt="" /> : <img src={`/teamIcons/${team}.svg`} alt="" />}
                {/* <img src={`/teamIcons/${team}.svg`} alt="" /> */}
              </div>
              {p.name.first} {p.name.last}
            </div>
            <div className="roster-table-cell">{p.number}</div>
            <div className="roster-table-cell">{p.positionAbbr}</div>
            <div className="roster-table-cell">{p.class}</div>
            <div className="roster-table-cell">{p.height}</div>
            <div className="roster-table-cell">{p.weight} lbs</div>
            {/* <div className="roster-table-cell">{p.dob}</div> */}
            {/* <div className="roster-table-cell">{p.captain ? (p.captain === "C" ? "C" : "A") : ""}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

const RosterTable = ({ title = "Roster", players, team }) => {
  const forwards = players.filter((p) => p.positionType === "Forward");
  const defense = players.filter((p) => p.positionType === "Defense");
  const goalies = players.filter((p) => p.positionType === "Goalie");

  return (
    <div className="roster-table">
      <h1>{title}</h1>
      <PositionGroup title="Forwards" players={forwards} team={team} />
      <PositionGroup title="Defense" players={defense} team={team} />
      <PositionGroup title="Goalies" players={goalies} team={team} />
    </div>
  );
};

export default RosterTable;
