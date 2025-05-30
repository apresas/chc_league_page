import React from "react";
import "./gameCenter.css";
import { useParams } from "react-router-dom";
// import gamesData from "../../../data/scheduledGames.json";
// import goalEvents from "../../../data/gameEvents.json";
import gamesData from "../../../data/gameSchedule.json";
import goalEvents from "../../../data/goalEvents.json";
import teamInfo from "../../../data/teamInfoData.json";
import GameHeader from "./GameHeader/GameHeader";
import GameSummary from "./GameSummary/GameSummary";
// import GameStats from "./GameStats";
// import PlayByPlay from "./PlayByPlay";
// import GameLeaders from "./GameLeaders";

const GameCenter = () => {
  const { gameId } = useParams();

  // Find the current game by gameId
  const game = gamesData.find(
    (g) => `${g.date}_${g.home.abrev}_${g.away.abrev}` === gameId
  );

  if (!game) {
    return <div className="game-center__not-found">Game not found</div>;
  }

  // Extract team info
  const homeTeam = teamInfo.teams.find((t) => t.abrev === game.home.abrev);
  const awayTeam = teamInfo.teams.find((t) => t.abrev === game.away.abrev);

  return (
    <div className="main_container">
        <div className="content">
      {/* Header / Overview */}
      <GameHeader game={game} homeTeam={homeTeam} awayTeam={awayTeam} />

      {/* Game Summary / Recap */}
      <GameSummary game={game} goalEvents={goalEvents} homeId={homeTeam.id} awayId={awayTeam.id}/>

      {/* Game Stats */}
      {/* <GameStats game={game} /> */}

      {/* Play-by-Play */}
      {/* <PlayByPlay game={game} goalEvents={goalEvents} /> */}

      {/* Game Leaders */}
      {/* <GameLeaders game={game} goalEvents={goalEvents} /> */}
      </div>
    </div>
  );
};

export default GameCenter;
