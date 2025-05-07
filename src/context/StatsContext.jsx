import React, { createContext, useContext, useMemo } from "react";
import goalEvents from "../data/gameEvents.json";
import rosters from "../data/teamRosters.json";
import games from "../data/scheduledGames.json";

const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
  const value = useMemo(() => {
    const playerStats = {};
    const goalieStats = {};

    goalEvents.forEach((event) => {
      const { scorerId, assistIds = [], gameId, team, period } = event;

      if (!playerStats[scorerId]) playerStats[scorerId] = { goals: 0, assists: 0, points: 0 };
      playerStats[scorerId].goals += 1;
      playerStats[scorerId].points += 1;

      assistIds.forEach((id) => {
        if (!playerStats[id]) playerStats[id] = { goals: 0, assists: 0, points: 0 };
        playerStats[id].assists += 1;
        playerStats[id].points += 1;
      });
    });

    games.forEach((game) => {
      [game.home, game.away].forEach((teamSide) => {
        const goalieId = teamSide.startingGoalie;
        if (!goalieId) return;

        if (!goalieStats[goalieId]) {
          goalieStats[goalieId] = {
            goalsAgainst: 0,
            shotsAgainst: 0,
            gamesPlayed: 0,
            wins: 0,
            saves: 0,
          };
        }

        const isHome = teamSide === game.home;
        const opponent = isHome ? game.away : game.home;

        goalieStats[goalieId].gamesPlayed += 1;
        goalieStats[goalieId].goalsAgainst += opponent.score;
        goalieStats[goalieId].shotsAgainst += opponent.shotsFor;
        goalieStats[goalieId].saves += opponent.shotsFor - opponent.score;

        if (teamSide.score > opponent.score) {
          goalieStats[goalieId].wins += 1;
        }
      });
    });

    return {
      playerStats,
      goalieStats,
    };
  }, []);

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};

export const useStats = () => useContext(StatsContext);
