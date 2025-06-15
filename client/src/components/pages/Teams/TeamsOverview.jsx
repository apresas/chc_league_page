import React, { useEffect, useState } from "react";
import "./teamsOverview.css";
import teamData from "../../../data/teamInfoData.json";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import TeamOverviewTile from "./TeamOverviewTile/TeamOverviewTile";

function TeamsOverview({}) {
  const [loading, setLoading] = useState(true);

  const [divisionTeams, setDivisionTeams] = useState({
    red: [],
    white: [],
    blue: [],
  });

  useEffect(() => {
    const fetchDivisionTeams = async () => {
      // setLoading(true);
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      try {
        const [red, white, blue] = await Promise.all([
          fetch("http://localhost:5000/api/teams/search?division=red").then(
            (res) => res.json()
          ),
          fetch("http://localhost:5000/api/teams/search?division=white").then(
            (res) => res.json()
          ),
          fetch("http://localhost:5000/api/teams/search?division=blue").then(
            (res) => res.json()
          ),
          delay(1250),
        ]);
        setDivisionTeams({ red: red, white: white, blue: blue });
      } catch (error) {
        console.error("Error fetching division teams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDivisionTeams();
  }, []);

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
        <div className="main_container">
          <div className="content">
            <h1>Teams</h1>
            <div className="div-test__teamsOverview">
              <div className="div-container__test">
                <img src="/divIcons/red_icon.svg" alt="" />
                {/* <h1>Red</h1> */}
                <div className="div-test-grid">
                  {divisionTeams.red.map((team, i) => (
                    <TeamOverviewTile team={team} key={i} />
                  ))}
                </div>
              </div>
              <div className="div-container__test white">
                <img src="/divIcons/white_icon.svg" alt="" />
                {/* <h1>White</h1> */}
                <div className="div-test-grid">
                  {divisionTeams.white.map((team, i) => (
                    <TeamOverviewTile team={team} key={i} />
                  ))}
                </div>
              </div>
              <div className="div-container__test">
                <img src="/divIcons/blue_icon.svg" alt="" />
                {/* <h1>Blue</h1> */}
                <div className="div-test-grid">
                  {divisionTeams.blue.map((team, i) => (
                    <TeamOverviewTile team={team} key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeamsOverview;
