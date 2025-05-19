// TournamentBracket.js

import React from "react";
import "./TournamentBracket.css";

const TournamentBracket = ({ tournamentData, teamInfo }) => {
  const getTeamInfo = (abrev) => {
    return teamInfo.teams.find((team) => team.abrev === abrev) || {};
  };

  const renderMatchup = (matchup, roundIndex, matchupIndex) => {
    const team1Info = getTeamInfo(matchup.team1);
    const team2Info = getTeamInfo(matchup.team2);

    return (
      <div key={`${roundIndex}-${matchupIndex}`} className="matchup-card">
        <div className="card-container">
          <div
            className={`team ${
              matchup.winner === matchup.team1 ? "winner__bracket" : ""
            }`}
          >
            <img
              src={team1Info.logo}
              alt={team1Info.name}
              className="team-logo"
            />
            <span className="team-name__bracket">{team1Info.abrev}</span>
            <span className="score">{matchup.team1Score}</span>
          </div>
          <div
            className={`team ${
              matchup.winner === matchup.team2 ? "winner__bracket" : ""
            }`}
          >
            <img
              src={team2Info.logo}
              alt={team2Info.name}
              className="team-logo__bracket"
            />
            <span className="team-name__bracket">{team2Info.abrev}</span>
            <span className="score">{matchup.team2Score}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderRound = (round, roundIndex) => (
    <div key={round.roundNumber} className={`round-column round-${round.roundNumber}`}>
      {round.matchups.map((matchup, matchupIndex) =>
        renderMatchup(matchup, roundIndex, matchupIndex)
      )}
    </div>
  );

  return (
    <div className="tournament-bracket">
      <h2 className="tournament-title">{tournamentData.name}</h2>
      <div className="bracket-tree">
        {tournamentData.rounds.map(renderRound)}
      </div>
    </div>
  );
};

export default TournamentBracket;
