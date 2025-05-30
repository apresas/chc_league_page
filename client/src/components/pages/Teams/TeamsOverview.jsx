import React from "react";
import "./teamsOverview.css";
import teamData from "../../../data/teamInfoData.json";
import { Link } from "react-router-dom";

function TeamsOverview({}) {
  const sortByName = (a, b) => a.name.localeCompare(b.name);
  const redDivision = teamData.teams
    .filter((team) => team.div === "red")
    .sort(sortByName);

  const whiteDivision = teamData.teams
    .filter((team) => team.div === "white")
    .sort(sortByName);

  const blueDivision = teamData.teams
    .filter((team) => team.div === "blue")
    .sort(sortByName);

  return (
    <div className="main_container">
      <div className="content">
        <h1>Teams</h1>
        <div className="div-grid__teamsOverview">
          <div className="div-cards__teamsOverview">
            <h2>Red</h2>
            {redDivision.map((team, index) => (
              <Link
                to={`/teams/${team.id}`}
                className="team-card__teamsOverview link"
                key={index}
              >
                <img src={team.logo} alt="" />
                <div className="team-label__teamsOverview">
                  <h2>{team.name}</h2>
                  <span>{team.mascot}</span>
                  <div className="team-links__teamsOverview">
                    <Link
                      to={`/players/${team.abrev}`}
                      className="team-link__teamsOverview link"
                    >
                      Roster
                    </Link>
                    <span> | </span>
                    <Link
                      to={`/schedule/${team.abrev}`}
                      className="team-link__teamsOverview link"
                    >
                      Schedule
                    </Link>{" "}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="div-cards__teamsOverview">
            <h2>White</h2>
            {whiteDivision.map((team, index) => (
              <Link
                to={`/teams/${team.id}`}
                className="team-card__teamsOverview link"
                key={index}
              >
                <img src={team.logo} alt="" />
                <div className="team-label__teamsOverview">
                  <h2>{team.name}</h2>
                  <span>{team.mascot}</span>
                  <div className="team-links__teamsOverview">
                    <Link
                      to={`/players/${team.abrev}`}
                      className="team-link__teamsOverview link"
                    >
                      Roster
                    </Link>
                    <span> | </span>
                    <Link
                      to={`/schedule/${team.abrev}`}
                      className="team-link__teamsOverview link"
                    >
                      Schedule
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="div-cards__teamsOverview">
            <h2>Blue</h2>
            {blueDivision.map((team, index) => (
              <Link
                to={`/teams/${team.id}`}
                className="team-card__teamsOverview link"
                key={index}
              >
                <img src={team.logo} alt="" />
                <div className="team-label__teamsOverview">
                  <h2>{team.name}</h2>
                  <span>{team.mascot}</span>
                  <div className="team-links__teamsOverview">
                    <Link
                      to={`/players/${team.abrev}`}
                      className="team-link__teamsOverview link"
                    >
                      Roster
                    </Link>
                    <span> | </span>
                    <Link
                      to={`/schedule/${team.abrev}`}
                      className="team-link__teamsOverview link"
                    >
                      Schedule
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamsOverview;
