import React from "react";
import "./teamOverviewTile.css";
import { Link } from "react-router-dom";

function TeamOverviewTile({ team }) {
  return (
    <div className="team-overview-tile">
      <Link
        to={`/teams/${team.id}`}
        className="logo-container__teamOverviewTile"
      >
        <img src={team.logo} alt={team.name} />
      </Link>
      <div className="info-container__teamOverviewTile">
        <div className="info-content__test">
          <h2>{team.name}</h2>
          <span>{team.mascot}</span>
          <div className="controls__teamOverviewTile">
            <Link
              to={`/players/${team.id}`}
              className="team-link__teamOverviewTile"
            >
              Roster
            </Link>
            <span> | </span>
            <Link
              to={`/schedule/${team.id}`}
              className="team-link__teamOverviewTile"
            >
              Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamOverviewTile;
