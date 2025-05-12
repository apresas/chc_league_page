import React, { useState, useEffect } from "react";
import "./teamModel.css";
import { IoClose } from "react-icons/io5";
import Standings from "../../data/standingsData.json";
import TeamData from "../../data/teamData.json";
import DivLogo from "../../assets/Red_Div_Icon.svg";
import OhioIcon from "/ohio_icon.svg";
import RankIcon from "../../assets/trophy_icon.svg"
import { FaRankingStar } from "react-icons/fa6";
import InfoTile from "./InfoTile";

function TeamModel({ isOpen, setIsOpen, currentTeam }) {
  const position = 0;
  const [currentStandings, setCurrentStandings] = useState([]);
  const [currentModelTeam, setCurrentModelTeam] = useState({});
  const [teamStats, setTeamStats] = useState({
    position: 0,
    goalsFor: 0,
    goalsAgainst: 0,
  });

  useEffect(() => {
    Standings.map((standing) => setCurrentStandings(standing.teams));
  }, []);

  useEffect(() => {
    let current = currentStandings.filter((team) => team.id === currentTeam.id);
    // let modelTeam = TeamData.filter((team) => team.name === currentTeam.name)
    let red = currentStandings
      .filter((team) => team.division === "RED")
      .sort(
        (a, b) =>
          b.record.wins * 2 +
          b.record.ties +
          b.record.overtime -
          (a.record.wins * 2 + a.record.ties + a.record.overtime)
      );

    let currentPosition = red.indexOf(red.at(current.id));

    console.log(currentPosition);
    // console.log(modelTeam);
    // const currentModel = TeamData.teams.map((team) => team.divisions.map((team) => (team)).filter((team) => team === currentTeam.division))
    // console.log(TeamData.teams)
    // console.log(currentModel)

    console.log(currentTeam.division);
  }, [currentTeam]);

  return (
    <>
      {isOpen ? (
        <div className="teamModel_bg">
          <div className="teamModel_container">
            <button className="close_btn" onClick={() => setIsOpen(false)}>
              <IoClose />
            </button>
            <section className="model_teamInfo">
              <div className="model_banner">
                <div className="model_logo_container">
                  <img src={currentTeam.logo} alt="" />
                </div>
              </div>
              <div className="model_info">
                <h1>{currentTeam.name}</h1>
                <h2>{currentTeam.mascot}</h2>
                <h3>{currentTeam.city}</h3>
              </div>
              <div className="info_stat">
                <InfoTile icon={DivLogo} title="Division" value="Red"/>
                <InfoTile icon={RankIcon} title="Rank" value="2" />
                <InfoTile
                  icon={OhioIcon}
                  title="Est." 
                  value="2007"
                />
                {/* <div className="info_column">
                  <div className="info_title">
                    Division
                  </div>
                  <div className="info_icon">
                    <img src={DivLogo} alt="" />
                  </div>
                  <div className="info_value">Red</div>
                </div> */}
                {/* <div className="info_column">
                <div className="info_title">
                    Division
                  </div>
                  <div className="info_icon">
                    <FaRankingStar />
                  </div>
                  <div className="info_value">2</div>
                </div>
                <div className="info_column">
                <div className="info_title">
                    Division
                  </div>
                  <div className="info_icon">
                    <svg
                      id="Layer_2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 277.93 304.96"
                    >
                      <g id="Layer_1-2" data-name="Layer_1">
                        <path
                          d="M.02,26.34c2.11-.09,3.74-.22,5.37-.23,25.17-.08,50.38-1.13,75.48.12,16.6.82,32.8,5.31,44.93,18.56,8.02,8.75,19.49,10.46,30,5.04.15-.08.31-.14.43-.25,9.39-8.01,20.46-7.54,31.6-5.97,3.56.5,5.85-.54,8.39-2.83,14.01-12.63,28.53-24.72,45.61-32.97,7.36-3.56,15.6-5.41,23.57-7.53,3.41-.91,5.65.38,5.91,4.95,2.04,35.6,4.38,71.18,6.62,106.76.03.47-.15.95-.29,1.74-1.38.25-2.8.5-4.59.82.73,2.75,1.39,5.28,2.21,8.38-2.64,1.58-5.43,3.25-8.48,5.08,2.93,3.28,6.05,6.23,8.43,9.69,1.09,1.59.96,4.18.94,6.31-.01,1.24-.82,2.51-1.4,3.7-6.38,13.04-9.01,26.76-7.34,41.21.38,3.3-.57,5.54-3.2,7.68-7.45,6.05-14.4,12.75-22.11,18.45-2.57,1.9-6.83,2.12-10.29,2.07-3.67-.06-6.41.6-8.49,3.75-1.09,1.65-2.47,3.17-3.94,4.51-8.8,8.02-14.71,17.19-13.37,29.86.29,2.74-.17,6.32-4.16,6.97-3.68.6-6.53-.24-7.56-4.55-.18-.76-2.75-1.68-3.86-1.35-5.26,1.56-9.23,4.85-10.15,10.51-.5,3.06-.66,6.47.15,9.4,1.75,6.33-.55,10.9-4.69,15.33-2.13,2.27-3.69,5.1-5.32,7.79-3.92,6.48-10.29,7.46-15.82,2.36-1.22-1.12-2.51-2.18-3.88-3.11-5.45-3.71-11.23-7-16.36-11.1-8.91-7.11-12.54-7.23-20.22,1.16-3.12,3.4-6.19,4.15-10.07,1.75-2.83-1.74-5.69-3.43-8.47-5.25-3.1-2.02-5.37-1.69-7.43,1.65-4.33,7.02-6.8,7.66-12.4,1.74-3.93-4.15-7.32-5.92-13.11-4.41-6.32,1.65-10.83-1.5-14.46-7.12-4.83-7.49-10.51-14.45-16.08-21.44-1.87-2.35-4.04-3.41-7.71-1.52-3.12,1.61-7.55,1.62-11.18,1.01-3.26-.55-5.21-3.15-5.33-7.27-.73-25.32-1.8-50.64-2.74-75.95C3.43,125.22,1.73,78.58.03,31.94c-.06-1.65,0-3.31,0-5.6Z"
                          fill="#ffffff"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="info_value">2009</div>
                </div> */}
                {/* <div className="team_div">
                  <div className="div_icon">
                    <img src={DivLogo} alt="" />
                  </div>
                  <div className="div_value">Red</div>
                </div>
                <div className="team_rank">
                  <div className="rank_icon">
                    <FaRankingStar />
                  </div>
                  <div className="rank_value">2</div>
                </div>
                <div className="team_est">
                  <div className="est_icon">
                    <img src="/ohio_icon.svg" alt="" />
                  </div>
                  <div className="est_value">2009</div>
                </div> */}
              </div>
            </section>
            <section className="model_teamStats"></section>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default TeamModel;
