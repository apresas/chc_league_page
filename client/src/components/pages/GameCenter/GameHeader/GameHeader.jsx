import React from "react";
import "./GameHeader.css";
import { Link } from "react-router-dom";

const GameHeader = ({ game, homeTeam, awayTeam, stats }) => {
  const { date, status, home, away } = game;

  console.log(game.status);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatShortDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="game-header">
      {game.status !== "Scheduled" ? (
        <div className="game-header__teams">
          <Link to={`/teams/${homeTeam.id}`} className="game-team-logo link">
            <img src={homeTeam.logo} alt="" />
          </Link>
          {/* Home Team */}
          <div className="team home-team">
            <div className="team-info" style={{ textAlign: "left" }}>
              <span className="team-mascot__gameHeader">{homeTeam.mascot}</span>
              <h3 className="team-name__gameHeader">{homeTeam.name}</h3>
              <span className="team-shots">SOG: {stats.homeShotsFor}</span>
            </div>
          </div>

          <div className="team-score">{game.homeScore}</div>

          {/* VS Indicator */}
          <div className="header-date">
            <span
              className={`game-status ${
                game.status ? game.status.toLowerCase() : ""
              }`}
            >
              {game.status}
            </span>
            <div className="game-header__date">
              {formatShortDate(game.date)}
            </div>
          </div>

          <div className="team-score">{game.awayScore}</div>

          {/* Away Team */}
          <div className="team away-team">
            <div className="team-info" style={{ textAlign: "right" }}>
              <span className="team-mascot__gameHeader">{awayTeam.mascot}</span>
              <h3 className="team-name__gameHeader">{awayTeam.name}</h3>
              <span className="team-shots">{stats.awayShotsFor} :SOG</span>
            </div>
          </div>
          <Link to={`/teams/${awayTeam.id}`} className="game-team-logo link">
            <img src={awayTeam.logo} alt="" />
          </Link>
        </div>
      ) : (
        <div className="game-header__teams">
          <Link to={`/teams/${homeTeam.id}`} className="game-team-logo link">
            <img src={homeTeam.logo} alt="" />
          </Link>
          {/* Home Team */}
          <div className="team home-team">
            <div className="team-info" style={{ textAlign: "left" }}>
              <span className="team-mascot__gameHeader">{homeTeam.mascot}</span>
              <h3 className="team-name__gameHeader">{homeTeam.name}</h3>
              <span className="team-shots"></span>
            </div>
          </div>

          <div className="team-score">-</div>

          {/* VS Indicator */}
          <div className="header-date">
            <span
              className={`game-status ${
                game.status ? game.status.toLowerCase() : ""
              }`}
            >
              {game.status}
            </span>
            <div className="game-header__date">
              {formatShortDate(game.date)}
            </div>
          </div>

          <div className="team-score">-</div>

          {/* Away Team */}
          <div className="team away-team">
            <div className="team-info" style={{ textAlign: "right" }}>
              <span className="team-mascot__gameHeader">{awayTeam.mascot}</span>
              <h3 className="team-name__gameHeader">{awayTeam.name}</h3>
              <span className="team-shots"></span>
            </div>
          </div>
          <Link to={`/teams/${awayTeam.id}`} className="game-team-logo link">
            <img src={awayTeam.logo} alt="" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default GameHeader;
