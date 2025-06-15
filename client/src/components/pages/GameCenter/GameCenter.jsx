import React, { useEffect, useState } from "react";
import "./gameCenter.css";
import { useParams } from "react-router-dom";
import gamesData from "../../../data/gameSchedule.json";
import goalEvents from "../../../data/goalEvents.json";
import teamInfo from "../../../data/teamInfoData.json";
import GameHeader from "./GameHeader/GameHeader";
import GameSummary from "./GameSummary/GameSummary";
import Spinner from "../../Spinner/Spinner";
import { FaHourglass } from "react-icons/fa6";

const GameCenter = () => {
  const { gameId } = useParams();

  const [loading, setLoading] = useState(true);
  const [currentGame, setCurrentGame] = useState({});
  const [gameStats, setGameStats] = useState({});
  const [teams, setTeams] = useState({ homeTeam: {}, awayTeam: {} });
  const [gameEvents, setGameEvents] = useState([]);
  const [goals, setGoals] = useState([]);
  const [boxScore, setBoxScore] = useState([]);
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    const fetchGameData = async () => {
      setLoading(true);
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      try {
        const [data, goals, events, playerStats] = await Promise.all([
          fetch(`http://localhost:5000/api/gameStats/search?gameId=${gameId}`),
          fetch(`http://localhost:5000/api/goalEvents/search?gameId=${gameId}`),
          fetch(`http://localhost:5000/api/events/search?gameId=${gameId}`),
          fetch(
            `http://localhost:5000/api/playerStats/search?gameId=${gameId}`
          ),
          // delay(1250),
        ]);
        const result = await data.json();
        const goalRes = await goals.json();
        const eventsRes = await events.json();
        const statsRes = await playerStats.json();
        const gameData = result[0].Game;
        const homeTeam = gameData.homeTeam;
        const awayTeam = gameData.awayTeam;
        setCurrentGame(gameData);
        setGameStats(...result);
        setTeams({ homeTeam: homeTeam, awayTeam: awayTeam });
        setGoals(goalRes);
        setGameEvents(eventsRes);
        setBoxScore(statsRes);
      } catch (error) {
        console.error("Error fetching Game Data:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchGameData();
  }, [gameId]);

  useEffect(() => {
    const fetchMatchup = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      try {
        const [matchups] = await Promise.all([
          fetch(
            `http://localhost:5000/api/games/matchups?teamA=${teams.homeTeam.id}&teamB=${teams.awayTeam.id}`
          ),
          delay(1250),
        ]);
        const result = await matchups.json();
        setMatchups(result);
      } catch (error) {
        console.error("Error fetching Game Data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (teams.homeTeam !== undefined || teams.awayTeam !== undefined) {
      fetchMatchup();
    }
  }, [teams]);

  useEffect(() => {
    console.log(matchups);
  }, [matchups]);

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
    <>
      {loading ? (
        <div
          className={`spinner-bg`}
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <div className={`main_container ${!loading ? "fade-in" : null}`}>
            <div className="content">
              {/* Header / Overview */}
              {/* <GameHeader game={game} homeTeam={homeTeam} awayTeam={awayTeam} /> */}
              <GameHeader
                game={currentGame}
                homeTeam={teams.homeTeam}
                awayTeam={teams.awayTeam}
                stats={gameStats}
              />

              {/* Game Summary / Recap */}
              {currentGame.status !== "Scheduled" ? (
                <GameSummary
                  teams={teams}
                  stats={gameStats}
                  currentGame={currentGame}
                  game={game}
                  goalEvents={goals}
                  gameEvents={gameEvents}
                  boxScore={boxScore}
                  homeId={homeTeam.id}
                  awayId={awayTeam.id}
                  matchups={matchups}
                />
              ) : (
                <div className="scheduled-section">
                  <FaHourglass />
                  <span> Game is Scheduled</span>
                </div>
              )}

              {/* Game Stats */}
              {/* <GameStats game={game} /> */}

              {/* Play-by-Play */}
              {/* <PlayByPlay game={game} goalEvents={goalEvents} /> */}

              {/* Game Leaders */}
              {/* <GameLeaders game={game} goalEvents={goalEvents} /> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GameCenter;
