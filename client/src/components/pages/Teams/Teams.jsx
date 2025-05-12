// src/pages/Team.jsx
import React, { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import teamData from "../../../data/teamInfoData.json";
import rosterData from "../../../data/teamRosters.json";
// import goalEvents from "../../../data/gameEvents.json";
// import scheduledGames from "../../../data/scheduledGames.json";
import goalEvents from "../../../data/goalEvents.json";
import scheduledGames from "../../../data/gameSchedule.json";
import { useStandings } from "../../../context/StandingsContext";
import { useStats } from "../../../context/StatsContext";
import "./teamDetails.css";
import StatTable from "../../StatTable/StatTable";
import RosterTable from "../../RosterTable/RosterTable";
import ScoringLeaders from "../../ScoringLeaders/ScoringLeaders";

const Team = ({ setTeamID }) => {
  const { teamId } = useParams();
  const team = teamData.teams.find((t) => t.id.toString() === teamId);
  const roster = rosterData.find((t) => t.team === team.abrev)?.roster || [];
  console.log(roster);

  const { standings, overall, sortedDivisions } = useStandings();
  const teamStandings = standings[team.abrev];

  const overallRank =
    overall.findIndex((standing) => standing.abrev === team.abrev) + 1;

  const divisionRank =
    sortedDivisions[team.div]?.findIndex(
      (standing) => standing.abrev === team.abrev
    ) + 1;

  const {
    topGoals,
    topAssists,
    topPoints,
    gaaLeaders,
    svPctLeaders,
    winLeaders,
  } = useMemo(() => {
    const goalMap = {};
    const assistMap = {};
    const goalieStats = {};

    const teamGames = scheduledGames.filter(
      (game) => game.home.abrev === team.abrev || game.away.abrev === team.abrev
    );

    teamGames.forEach((game) => {
      const isHome = game.home.abrev === team.abrev;
      const goalieId = isHome
        ? game.home.startingGoalie
        : game.away.startingGoalie;
      const shotsAgainst = isHome ? game.away.shotsFor : game.home.shotsFor;
      const goalsAgainst = isHome ? game.away.score : game.home.score;

      if (!goalieId) return;

      if (!goalieStats[goalieId]) {
        goalieStats[goalieId] = {
          player: roster.find((p) => p.id === goalieId),
          gamesPlayed: 0,
          totalShots: 0,
          goalsAgainst: 0,
          wins: 0,
        };
      }

      const goalie = goalieStats[goalieId];
      goalie.gamesPlayed += 1;
      goalie.totalShots += shotsAgainst;
      goalie.goalsAgainst += goalsAgainst;

      // Determine if this goalie won
      const homeWin = game.home.score > game.away.score;
      if ((isHome && homeWin) || (!isHome && !homeWin)) {
        goalie.wins += 1;
      }
    });

    // Finalize stats
    const goalies = Object.values(goalieStats).filter((g) => g.player); // filter out nulls

    const processedGoalies = goalies.map((g) => ({
      player: g.player,
      gaa: (g.goalsAgainst / g.gamesPlayed).toFixed(2),
      svPct:
        g.totalShots > 0
          ? ((g.totalShots - g.goalsAgainst) / g.totalShots).toFixed(3)
          : "0.000",
      wins: g.wins,
    }));

    // Scorer & Assists
    goalEvents.forEach((goal) => {
      if (goal.team !== team.abrev) return;
      const scorer = goal.scorerId;
      const assists = goal.assistIds || [];

      goalMap[scorer] = (goalMap[scorer] || 0) + 1;
      assists.forEach((aid) => {
        assistMap[aid] = (assistMap[aid] || 0) + 1;
      });
    });

    const statMap = {};
    roster.forEach((player) => {
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

    return {
      topGoals: allStats.sort((a, b) => b.goals - a.goals).slice(0, 5),
      topAssists: allStats.sort((a, b) => b.assists - a.assists).slice(0, 5),
      topPoints: allStats.sort((a, b) => b.points - a.points).slice(0, 5),
      gaaLeaders: processedGoalies
        .sort((a, b) => parseFloat(a.gaa) - parseFloat(b.gaa))
        .slice(0, 5),
      svPctLeaders: processedGoalies
        .sort((a, b) => parseFloat(b.svPct) - parseFloat(a.svPct))
        .slice(0, 5),
      winLeaders: processedGoalies.sort((a, b) => b.wins - a.wins).slice(0, 5),
    };
  }, [team, roster]);

  if (!team) return <div>Team not found.</div>;

  useEffect(() => {
    setTeamID(teamId);
  }, []);

  return (
    <div className="main_container">
      <div className="content">
        <div className="team-detail-page">
          <div className="team-header">
            <div className="team-meta">
              <h1>{team.name}</h1>
              <p className="team-sub">
                {team.mascot} | {team.city} | Est. {team.est}
              </p>
              <div className="team-stats">
                <div
                  className="team-div"
                  style={{ backgroundColor: `var(--color-${team.div})` }}
                >
                  <div
                    className="logo-line"
                    style={{
                      borderRadius: "0 10px 0 10px",
                    }}
                  />
                  <img src={`/${team.div}_icon.svg`} alt="" />
                  <div
                    className="logo-line"
                    style={{
                      borderRadius: "10px 0 10px 0",
                    }}
                  />
                </div>
                <div className="team-stats-content">
                  <div className="team-record">
                    <p>
                      <span className="field-label"> Record:</span>{" "}
                      {teamStandings.wins} - {teamStandings.losses} -{" "}
                      {teamStandings.otLosses}
                    </p>
                    <p>
                      <span className="field-label">Points:</span>{" "}
                      {teamStandings.points}
                    </p>
                  </div>
                  <div className="team-ranking">
                    <p>
                      <span className="field-label">Division Rank:</span>{" "}
                      {divisionRank ?? "N/A"}
                    </p>
                    <p>
                      <span className="field-label">Overall Rank: </span>
                      {overallRank ?? "N/A"}
                    </p>
                  </div>
                </div>

                {/* <div className="team-scoring">
                  <p>
                    <span className="field-label">Goals For:</span>{" "}
                    {teamStandings.goalsFor}
                  </p>
                  <p>
                    <span className="field-label">Goals Against:</span>{" "}
                    {teamStandings.goalsAgainst}
                  </p>
                </div> */}
              </div>
            </div>
            <img src={team.logo} alt="logo" className="team-banner-logo" />
          </div>

          <section className="roster-section">
            <RosterTable
              title="Team Roster"
              players={roster}
              team={team.abrev}
            />
          </section>
          <section className="leaders-section">
            <h1>Team Leaders</h1>
            <div className="team-leaders-grid">
              <ScoringLeaders
                team={team}
                roster={roster}
                header="Skaters"
                view="skaters"
              />
              <ScoringLeaders
                team={team}
                roster={roster}
                header="Forwards"
                view="forwards"
              />
              <ScoringLeaders
                team={team}
                roster={roster}
                header="Defensemen"
                view="defense"
              />
              <ScoringLeaders
                team={team}
                roster={roster}
                header="Goalies"
                view="goalies"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Team;
