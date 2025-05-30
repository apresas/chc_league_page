import React, { useRef, useEffect } from "react";
import "./gameTile.css";
import TeamScoreTile from "./TeamScoreTile/TeamScoreTile";
import GoalSlider from "./GoalSlider/GoalSlider";
import { Link } from "react-router-dom";


function gameTile({ game, index }) {
  const { home, away, status } = game;

  const tileRef = useRef();

  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;

    el.classList.remove("fade-slide-in"); // reset class
    void el.offsetWidth; // trigger reflow
    el.classList.add("fade-slide-in"); // re-apply animation
  }, [game]);

  return (
    <div
    ref={tileRef}
      className="gameTile fade-slide-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="gameStatus_header">{status}</div>
      <div className="gameTile_score">
        <TeamScoreTile teamID={8} team={home} />
        <TeamScoreTile teamID={0} team={away} />
      </div>
      <span className="goals_header">Goals:</span>
      <div className="gameTile_events">
        <GoalSlider
          key={`${game.date}_${game.home.abrev}_${game.away.abrev}`}
          gameId={`${game.date}_${game.home.abrev}_${game.away.abrev}`}
          game={game}
        />
      </div>
      <Link to={`/gamecenter/${game.gameId}`} className="link"> 
      <button className="gameTile_btn">Gamecenter</button> 
      </Link>
    </div>
  );
}

export default gameTile;
