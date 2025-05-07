import React, { createContext, useContext, useMemo } from "react";
import games from "../data/scheduledGames.json";
import teams from "../data/teamInfoData.json";

const StandingsContext = createContext();

export const StandingsProvider = ({ children }) => {
  const value = useMemo(() => {
    const standings = {};

    teams.teams.forEach(({ abrev, div }) => {
      standings[abrev] = {
        abrev,
        div,
        wins: 0,
        losses: 0,
        otLosses: 0,
        points: 0,
        gamesPlayed: 0,
        goalsFor: 0,
        goalsAgainst: 0,
      };
    });

    // games.forEach((game) => {
    //   const { status, home, away } = game;

    //   if (!["Final", "OT", "SO"].includes(status)) return;

    //   const isTie = home.score === away.score;
    //   standings[home.abrev].gamesPlayed += 1;
    //   standings[away.abrev].gamesPlayed += 1;

    //   if (isTie) {
    //     // Tie scenario
    //     standings[home.abrev].otLosses += 1;
    //     standings[away.abrev].otLosses += 1;
    //     standings[home.abrev].points += 1;
    //     standings[away.abrev].points += 1;
    //   } else {
    //     const winner = home.score > away.score ? home.abrev : away.abrev;
    //     const loser = home.score > away.score ? away.abrev : home.abrev;

    //     standings[winner].wins += 1;
    //     standings[winner].points += 2;

    //     if (["OT", "SO"].includes(status)) {
    //       standings[loser].otLosses += 1;
    //       standings[loser].points += 1;
    //     } else {
    //       standings[loser].losses += 1;
    //     }
    //   }
    // });

    games.forEach((game) => {
      const { home, away, status } = game;

      const homeId = home.abrev;
      const awayId = away.abrev;

      const homeScore =
        typeof home.score === "number" ? home.score : Number(home.score) || 0;
      const awayScore =
        typeof away.score === "number" ? away.score : Number(away.score) || 0;

      // Initialize both teams if needed
      [homeId, awayId].forEach((id) => {
        if (!standings[id]) {
          standings[id] = {
            teamId: id,
            div: homeId === id ? home.div : away.div,
            name: homeId === id ? home.name : away.name,
            wins: 0,
            losses: 0,
            otLosses: 0,
            points: 0,
            gamesPlayed: 0,
            goalsFor: 0,
            goalsAgainst: 0,
          };
        }
      });

      // Skip incomplete games
      if (!["Final", "OT", "SO"].includes(status)) return;

      // Update GP and goals
      standings[homeId].gamesPlayed += 1;
      standings[awayId].gamesPlayed += 1;

      standings[homeId].goalsFor += homeScore;
      standings[homeId].goalsAgainst += awayScore;

      standings[awayId].goalsFor += awayScore;
      standings[awayId].goalsAgainst += homeScore;

      // Determine outcome
      if (home.score > away.score) {
        standings[homeId].wins += 1;
        standings[homeId].points += 2;

        if (status === "OT" || status === "SO") {
          standings[awayId].otLosses += 1;
          standings[awayId].points += 1;
        } else {
          standings[awayId].losses += 1;
        }
      } else if (away.score > home.score) {
        standings[awayId].wins += 1;
        standings[awayId].points += 2;

        if (status === "OT" || status === "SO") {
          standings[homeId].otLosses += 1;
          standings[homeId].points += 1;
        } else {
          standings[homeId].losses += 1;
        }

        if (isNaN(homeScore) || isNaN(awayScore)) {
          console.warn(`Invalid scores for game:`, game);
        }
      }
    });

    const overall = Object.values(standings).sort(
      (a, b) => b.points - a.points
    );

    const byDivisions = {};

    Object.values(standings).forEach((team) => {
      const { div } = team;
      if (!byDivisions[div]) byDivisions[div] = [];
      byDivisions[div].push(team);
    });

    const sortedDivisions = {};
    for (const div in byDivisions) {
      sortedDivisions[div] = byDivisions[div].sort(
        (a, b) => b.points - a.points
      );
    }
    return { standings, sortedDivisions, overall };
  }, []);

  return (
    <StandingsContext.Provider value={value}>
      {children}
    </StandingsContext.Provider>
  );
};

export const useStandings = () => useContext(StandingsContext);
