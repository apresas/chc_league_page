import React from "react";
import "./GameHeader.css";

const GameHeader = ({ game, homeTeam, awayTeam }) => {
  const { date, status, home, away } = game;

//   console.log(game)

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
      <div className="game-header__teams">
        <div className="game-team-logo">
          <img src={homeTeam.logo} alt="" />
        </div>
        {/* Home Team */}
        <div className="team home-team">
          <div className="team-info" style={{textAlign: "left"}}>
            <span className="team-mascot__gameHeader">{homeTeam.mascot}</span>
            <h3 className="team-name__gameHeader">{homeTeam.name}</h3>
            <span className="team-shots">SOG: {home.shotsFor}</span>
          </div>
        </div>

        <div className="team-score">{home.score}</div>

        {/* VS Indicator */}
        <div className="header-date">
          <span className={`game-status ${status.toLowerCase()}`}>
            {status}
          </span>
          <div className="game-header__date">{formatShortDate(date)}</div>
        </div>

        <div className="team-score">{away.score}</div>

        {/* Away Team */}
        <div className="team away-team">
          <div className="team-info" style={{textAlign: "right"}}>
            <span className="team-mascot__gameHeader">{awayTeam.mascot}</span>
            <h3 className="team-name__gameHeader">{awayTeam.name}</h3>
            <span className="team-shots">SOG: {away.shotsFor}</span>
          </div>
        </div>
        <div className="game-team-logo">
          <img src={awayTeam.logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
