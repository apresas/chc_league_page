import React from "react";
import "./leaderCard.css";

function LeaderCard({ team, player, type, view }) {
//   console.log("Player in LeaderCard:", player);

  // Fallback values if player data is missing
  const playerInfo = player?.player || {
    name: { first: "First", last: "Last" },
    number: "--",
    positionAbbr: "--",
  };

  const teamInfo = team || {
    abrev: "N/A",
    name: "No Team",
    logo: "/teamIcons/default.svg",
  };

  // Determine stat value based on type
  const statValue = player
    ? type === "points"
      ? player.points
      : type === "goals"
      ? player.goals
      : type === "assists"
      ? player.assists
      : type === "gaa"
      ? player.gaa
      : type === "savePct"
      ? player.savePct
      : type === "wins"
      ? player.wins
      : "--"
    : "--";

  return (
    <div className="leader-card">
      <div className="leader-portrait">
        {view === "goalies" ? (
          <img src={`/teamIcons/${teamInfo.abrev}_goalie.svg`} alt="portrait" />
        ) : (
          <img src={`/teamIcons/${teamInfo.abrev}.svg`} alt="portrait" />
        )}
        {/* <img src={`/teamIcons/${teamInfo.abrev}.svg`} alt="portrait" /> */}
      </div>
      <div className="leader-player">
        <div className="leader-name">
          <h2>{playerInfo.firstName}</h2>
          <h2>{playerInfo.lastName}</h2>
        </div>

        <div className="leader-team">
          <div className="leader-teamName">
            <img src={teamInfo.logo} alt="logo" /> {teamInfo.abrev}
          </div>{" "}
          |<div className="leader-number">{playerInfo.number}</div> |
          <div className="leader-position">{playerInfo.positionAbrev}</div>
        </div>
      </div>

      <div className="leader-stat">
        <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <h1>{statValue}</h1>
      </div>
    </div>
  );
}

export default LeaderCard;
