// ScheduleByTeamList.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import teamInfoData from "../../../../../data/teamInfoData.json";
import gameSchedule from "../../../../../data/gameSchedule.json";
import gameStats from "../../../../../data/gameStats.json";
import goalEvents from "../../../../../data/goalEvents.json";
import teamRosters from "../../../../../data/teamRosters.json";
import "./scheduleByTeamList.css";


const getWinningGoalScorer = (gameId) => {
  const goals = goalEvents
    .filter((event) => event.gameId === gameId)
    .sort((a, b) => new Date(a.time) - new Date(b.time));
  return goals.length > 0 ? goals[goals.length - 1].scorerId : null;
};

const formatDateLabel = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ScheduleByTeamList = () => {
  const { teamId } = useParams();
  const teamInfo = teamInfoData.teams.find((team) => team.abrev === teamId);
  const teamPlayers = teamRosters[teamId]?.players || [];
  const teamGoalies = teamPlayers.filter((p) => p.position === "G");

  const teamGames = gameSchedule
    .filter((game) => game.home.abrev === teamId || game.away.abrev === teamId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const didHomeWin = (game) =>
    game.home.score > game.away.score && game.home.score !== null;

  return (
    <div className="list-container__scheduleByTeam">
      {teamGames.map((game) => {
        const gameStat = gameStats.find((g) => g.gameId === game.gameId);
        const isHome = game.home.abrev === teamId;
        const goalieId = isHome
          ? game.home.startingGoalie
          : game.away.startingGoalie;
        const homeTeamRoster =
          teamRosters.find((t) => t.team === game.home.abrev)?.roster || [];
        const awayTeamRoster =
          teamRosters.find((t) => t.team === game.away.abrev)?.roster || [];
        const allPlayers = [...homeTeamRoster, ...awayTeamRoster];

        const goalie = allPlayers.find(
          (p) =>
            p &&
            typeof p.id === "string" &&
            p.id === goalieId &&
            typeof p.name.first === "string" &&
            typeof p.name.last === "string"
        );

        const winner =
          game.home.score > game.away.score ? game.home.abrev : game.away.abrev;
        const goalScorerId = getWinningGoalScorer(game.gameId);
        const goalScorer = allPlayers.find(
          (p) =>
            p &&
            typeof p.id === "string" &&
            p.id === goalScorerId &&
            typeof p.name.first === "string" &&
            typeof p.name.last === "string"
        );

        return (
          <div key={game.gameId} className="game-section__scheduleByTeam">
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
                  {game.home.mascot}
                </span>
                <img
                  src={game.home.logo}
                  alt={game.home.abrev}
                  className="team-logo__scheduleByTeam"
                />
              </div>
              <div className="vs-label__scheduleByTeam">@</div>
              <div className="team-block__scheduleByTeam away__scheduleByTeam">
                <img
                  src={game.away.logo}
                  alt={game.away.abrev}
                  className="team-logo__scheduleByTeam"
                />
                <span className="team-name__scheduleByTeam">
                  {game.away.mascot}
                </span>
                {/* <span className="score__scheduleByTeam">{game.away.score}</span> */}
              </div>
              <span className="score-field__scheduleByTeam">
                {game.home.score === null ? (
                  <>
                    {game.home.abrev} {game.home.score} - {game.away.score}{" "}
                    {game.away.abrev}
                  </>
                ) : didHomeWin(game) ? (
                  <>
                    <span>
                      {game.home.abrev} {game.home.score}
                    </span>{" "}
                    -{" "}{game.away.score} {game.away.abrev}
                  </>
                ) : (
                  <>
                    {game.home.abrev} {game.home.score}{" "}-{" "}
                    <span>
                      {game.away.score} {game.away.abrev}
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
                        ? `${goalie.name.first[0]}. ${goalie.name.last}, `
                        : "N/A"}
                    </div>
                    <div>
                      {goalScorer
                        ? `${goalScorer.name.first[0]}. ${goalScorer.name.last}`
                        : "N/A"}
                    </div>
                  </>
                ) : "Scheduled"}
              </div>
              <div className="gamecenter-link__scheduleByTeam">
                <Link
                  to={`/gamecenter/${game.gameId}`}
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
