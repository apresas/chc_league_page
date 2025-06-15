import React, { useState, useEffect } from "react";
import "./leaderCard.css";
import { useImageCounter } from "../../../utils/useImageCounter";

function LeaderCard({
  team,
  player,
  type,
  view,
  // handleImageLoad,
  // loadedCount,
  // setImagesLoaded,
}) {
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

  // Check Image Load
   const { imagesLoaded, handleImageLoad } = useImageCounter(3);
  // const totalImages = 3;

  // useEffect(() => {
  //   if (loadedCount === totalImages) {
  //     setImagesLoaded(true);
  //   }
  // }, [loadedCount]);

  return (
    <div className="leader-card">
      <div className="leader-portrait">
        {view === "goalies" ? (
          <img
            src={`/teamIcons/${teamInfo.abrev}_goalie.svg`}
            alt="portrait"
            onLoad={handleImageLoad}
          />
        ) : (
          <img
            src={`/teamIcons/${teamInfo.abrev}.svg`}
            alt="portrait"
            onLoad={handleImageLoad}
          />
        )}
      </div>
      <div className="leader-player">
        <div className="leader-name">
          <h2>{playerInfo.firstName}</h2>
          <h2>{playerInfo.lastName}</h2>
        </div>

        <div className="leader-team">
          <div className="leader-teamName">
            <img src={teamInfo.logo} alt="logo" onLoad={handleImageLoad} />{" "}
            {teamInfo.abrev}
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
