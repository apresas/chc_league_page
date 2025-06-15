// src/pages/Team.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./teamDetails.css";
import RosterTable from "../../RosterTable/RosterTable";
import ScoringLeaders from "../../ScoringLeaders/ScoringLeaders";
import Spinner from "../../Spinner/Spinner";
import { useImageCounter } from "../../../utils/useImageCounter";

const Team = ({ setTeamID }) => {
  const { teamId } = useParams();
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState({});
  const [standings, setStandings] = useState({});
  const [divisionStandings, setDivisionStandings] = useState([]);
  const [overallStandings, setOverallStandings] = useState([]);

  useEffect(() => {
    setTeamID(teamId);
    // setLoading(true);
  }, []);

  useEffect(() => {
    const fetchRoster = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      try {
        const [players, standings] = await Promise.all([
          fetch(`http://localhost:5000/api/players/search?teamId=${teamId}`),
          fetch(
            `http://localhost:5000/api/teamStandings/search?teamId=${teamId}`
          ),
          delay(1250), // minimum 2 second delay to show spinner
        ]);

        const roster = await players.json();
        const standingData = await standings.json();
        setRoster(roster);
        setStandings(standingData[0]); // only one expected per teamId
        setTeam(standingData[0]?.team || {}); // pull team data from association
      } catch (error) {
        console.error("Failed to fetch team and standings:", error);
      }
    };

    fetchRoster();
  }, [teamId]);

  useEffect(() => {
    if (!team?.division) return;
    const fetchDivisionStandings = async () => {
      // setLoading(true);
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      try {
        const [division, overall] = await Promise.all([
          fetch(
            `http://localhost:5000/api/teamStandings/search?division=${team.division}`
          ),
          fetch(`http://localhost:5000/api/teamStandings/`),
          delay(1250), // minimum 2 second delay to show spinner
        ]);

        const divisionStandings = await division.json();
        const overallStandings = await overall.json();

        setDivisionStandings(divisionStandings);
        setOverallStandings(overallStandings);
      } catch (error) {
        console.error("Failed to fetch div and overall standings:", error);
      } finally {
        setLoading(false);
      }
    };
    if (team?.division) {
      fetchDivisionStandings();
    }
  }, [team]);

  // Check Image Load
  const { imagesLoaded, handleImageLoad } = useImageCounter(2);

  const overallRank =
    overallStandings.findIndex((standing) => standing.team.id === team.id) + 1;

  const divisionRank =
    divisionStandings.findIndex((standing) => standing.team.id === team.id) + 1;

  if (!team) return <div>Team not found.</div>;

  return (
    <>
      {loading && !imagesLoaded ? (
        <div
          className={`spinner-bg`}
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Spinner />
        </div>
      ) : (
        <div className={`main_container ${!loading ? "fade-in" : null}`}>
          <div className="content">
            <div className={`team-detail-page`}>
              <div className="team-header">
                <div className="team-meta">
                  <h1>{team.name}</h1>
                  <p className="team-sub">
                    {team.mascot} | {team.city} | Est. {team.est}
                  </p>
                  <div className="team-stats">
                    <div
                      className="team-div"
                      style={{
                        backgroundColor: `var(--color-${team.division})`,
                      }}
                    >
                      <div
                        className="logo-line"
                        style={{
                          borderRadius: "0 10px 0 10px",
                        }}
                      />
                      <img
                        src={`/${team.division}_icon.svg`}
                        alt=""
                        onLoad={handleImageLoad}
                      />
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
                          {standings.wins} - {standings.losses} -{" "}
                          {standings.otLosses}
                        </p>
                        <p>
                          <span className="field-label">Points:</span>{" "}
                          {standings.points}
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
                  </div>
                </div>
                <img
                  src={team.logo}
                  alt="logo"
                  className="team-banner-logo"
                  onLoad={handleImageLoad}
                />
              </div>

              <section className="roster-section">
                <RosterTable
                  loading={loading}
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
      )}
    </>
  );
};

export default Team;
