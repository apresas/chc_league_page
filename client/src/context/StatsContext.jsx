import React, { createContext, useContext, useMemo } from "react";
import goalEvents from "../data/gameEvents.json";
import teamRosters from "../data/teamRosters.json";

const StatsContext = createContext();

export const useStats = () => useContext(StatsContext);

export const StatsProvider = ({ children }) => {
  const stats = useMemo(() => {
    const goalMap = {};
    const assistMap = {};

    goalEvents.forEach((goal) => {
      const scorer = goal.scorerId;
      const assists = goal.assistIds || [];

      goalMap[scorer] = (goalMap[scorer] || 0) + 1;
      assists.forEach((aid) => {
        assistMap[aid] = (assistMap[aid] || 0) + 1;
      });
    });

    const statMap = {};
    teamRosters.forEach((player) => {
      const id = player.id;
      const goals = goalMap[id] || 0;
      const assists = assistMap[id] || 0;

      statMap[id] = {
        player,
        goals,
        assists,
        points: goals + assists,
      };
    });

    const allStats = Object.values(statMap);

    const getStatsByPosition = (position) => {
      return allStats.filter((entry) => entry.player.positionType === position);
    };

    return {
      allStats,
      topPoints: allStats.sort((a, b) => b.points - a.points).slice(0, 5),
      topGoals: allStats.sort((a, b) => b.goals - a.goals).slice(0, 5),
      topAssists: allStats.sort((a, b) => b.assists - a.assists).slice(0, 5),
      getStatsByPosition,
    };
  }, []);

//   console.log(stats)

  return <StatsContext.Provider value={stats}>{children}</StatsContext.Provider>;
};
