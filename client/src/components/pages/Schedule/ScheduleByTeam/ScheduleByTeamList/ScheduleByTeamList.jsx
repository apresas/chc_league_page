// ScheduleByTeamList.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import "./scheduleByTeamList.css";

const formatDateLabel = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ScheduleByTeamList = ({ games, events }) => {
  const { teamId } = useParams();

  const eventsByGameId = events.reduce((acc, event) => {
  if (!acc[event.gameId]) acc[event.gameId] = [];
  acc[event.gameId].push(event);
  return acc;
}, {});

const getWinningGoalScorer = (gameId) => {
  const goals = (eventsByGameId[gameId] || [])
    .sort((a, b) => {
      const [aMin = 0, aSec = 0] = (a.time || "0:00").split(":").map(Number);
      const [bMin = 0, bSec = 0] = (b.time || "0:00").split(":").map(Number);
      return aMin * 60 + aSec - (bMin * 60 + bSec);
    });
  return goals.length > 0 ? goals[goals.length - 1].scorerId : null;
};

  const teamGames = games
    .filter(
      (game) =>
        game.homeTeam?.id?.toString() === teamId ||
        game.awayTeam?.id?.toString() === teamId
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const didHomeWin = (game) =>
    game.homeScore > game.awayScore && game.homeScore !== null;

  return (
    <div className="list-container__scheduleByTeam">
      {teamGames.map((game) => {
        const isHome = game.homeTeamId === teamId;
        const goalieId = isHome
          ? game.homeStartingGoalieId
          : game.awayStartingGoalieId;
        const homeTeamRoster =
         game.homeTeam.Players || [];
        const awayTeamRoster =
          game.awayTeam.Players || [];
        const allPlayers = [...homeTeamRoster, ...awayTeamRoster];

        const goalie = allPlayers.find(
          (p) =>
            p &&
            typeof p.id === "string" &&
            p.id === goalieId &&
            typeof p.firstName === "string" &&
            typeof p.lastName === "string"
        );
        const goalScorerId = getWinningGoalScorer(game.id);
        const goalScorer = allPlayers.find(
          (p) =>
            p &&
            typeof p.id === "string" &&
            p.id === goalScorerId &&
            typeof p.firstName === "string" &&
            typeof p.lastName === "string"
        );

        return (
          <div key={game.id} className="game-section__scheduleByTeam">
            <h1 className="game-date-header__scheduleByTeam">
              {formatDateLabel(game.date)}
            </h1>
            <div className="tile-field-labels__scheduleByTeam">
              <span>Matchup</span>
              <span>Results</span>
              <span>Goalie | GWG</span>
              <span></span>
            </div>
            <div className="game-tile__scheduleByTeam">
              <div className="team-block__scheduleByTeam home__scheduleByTeam">
                <span className="team-name__scheduleByTeam">
                  {game.homeTeam.mascot}
                </span>
                <img
                  src={game.homeTeam.logo}
                  alt={game.homeTeam.abrev}
                  className="team-logo__scheduleByTeam"
                />
              </div>
              <div className="vs-label__scheduleByTeam">@</div>
              <div className="team-block__scheduleByTeam away__scheduleByTeam">
                <img
                  src={game.awayTeam.logo}
                  alt={game.awayTeam.abrev}
                  className="team-logo__scheduleByTeam"
                />
                <span className="team-name__scheduleByTeam">
                  {game.awayTeam.mascot}
                </span>
              </div>
              <span className="score-field__scheduleByTeam">
                {game.homeScore === null ? (
                  <>
                    {game.homeTeam.abrev} {game.homeTeam.score} -{" "}
                    {game.awayTeam.score} {game.awayTeam.abrev}
                  </>
                ) : didHomeWin(game) ? (
                  <>
                    <span>
                      {game.homeTeam.abrev} {game.homeScore}
                    </span>{" "}
                    - {game.awayScore} {game.awayTeam.abrev}
                  </>
                ) : (
                  <>
                    {game.homeTeam.abrev} {game.homeScore} -{" "}
                    <span>
                      {game.awayScore} {game.awayTeam.abrev}
                    </span>
                  </>
                )}
              </span>
              <div className="info-block__scheduleByTeam">
                {game.status !== "Scheduled" ? (
                  <>
                    {" "}
                    <div>
                      {goalie
                        ? `${goalie.firstName[0]}. ${goalie.lastName}, `
                        : "N/A"}
                    </div>
                    <div>
                      {goalScorer
                        ? `${goalScorer.firstName[0]}. ${goalScorer.lastName}`
                        : "N/A"}
                    </div>
                  </>
                ) : (
                  "Scheduled"
                )}
              </div>
              <div className="gamecenter-link__scheduleByTeam">
                <Link
                  to={`/gamecenter/${game.id}`}
                  className="gamecenter-button__scheduleByTeam"
                >
                  Gamecenter
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleByTeamList;
