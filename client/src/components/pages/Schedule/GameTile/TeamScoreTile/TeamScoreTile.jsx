import React from "react";
import "./teamScoreTile.css";

function TeamScoreTile({ team }) {
  return (
    <div className="teamScoreTile">
      <div className="teamScore_logo">
        <img src={team.logo} alt="" />
      </div>
      <div className="teamScore_info">
        <div className="teamScore_name">
          {team.mascot}
          <div
            className="div-dot"
            style={{
              backgroundColor: `${
                team.div === "red"
                  ? "var(--color-red)"
                  : team.div === "white"
                  ? "var(--color-white)"
                  : team.div === "blue"
                  ? "var(--color-blue)"
                  : null
              }`,
            }}
          />
        </div>
        <div className="teamScore_shots">SOG: {team.shotsFor}</div>
      </div>
      <div className="teamScore_score">{team.score}</div>
    </div>
  );
}

export default TeamScoreTile;
