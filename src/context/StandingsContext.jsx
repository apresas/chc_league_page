// src/context/StandingsContext.jsx
import React, { createContext, useContext, useMemo } from "react";
import gamesData from "../data/scheduledGames.json";

const StandingsContext = createContext();

const calculateStandings = (games) => {
  const standings = {};

  games.forEach((game) => {
    if (!["Final", "OT", "SO"].includes(game.status)) return;

    const home = game.home;
    const away = game.away;
    const homeScore = home.score;
    const awayScore = away.score;

    const update = (team, div, type) => {
      if (!standings[team]) {
        standings[team] = {
          team,
          division: div,
          games: 0,
          wins: 0,
          ot_so_wins: 0,
          losses: 0,
          points: 0,
        };
      }

      standings[team].games++;
      if (type === "win") {
        standings[team].wins++;
        standings[team].points += 2;
      } else if (type === "ot_so_win") {
        standings[team].ot_so_wins++;
        standings[team].points += 1;
      } else {
        standings[team].losses++;
      }
    };

    if (homeScore > awayScore) {
      const resultType = game.status === "Final" ? "win" : "ot_so_win";
      update(home.abrev, home.div, resultType);
      update(away.abrev, away.div, "loss");
    } else {
      const resultType = game.status === "Final" ? "win" : "ot_so_win";
      update(away.abrev, away.div, resultType);
      update(home.abrev, home.div, "loss");
    }
  });

  const standingsList = Object.values(standings).sort((a, b) => b.points - a.points);

  // Assign overall and division ranks
  const byDivision = {};
  standingsList.forEach((team, i) => {
    team.overallRank = i + 1;
    if (!byDivision[team.division]) byDivision[team.division] = [];
    byDivision[team.division].push(team);
  });

  Object.values(byDivision).forEach((teams) => {
    teams.sort((a, b) => b.points - a.points);
    teams.forEach((team, i) => {
      team.divisionRank = i + 1;
    });
  });

  return standingsList;
};

export const StandingsProvider = ({ children }) => {
  const standings = useMemo(() => calculateStandings(gamesData), []);

  return (
    <StandingsContext.Provider value={{ standings }}>
      {children}
    </StandingsContext.Provider>
  );
};

export const useStandings = () => useContext(StandingsContext);
