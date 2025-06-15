import React from "react";
import "./rosterList.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

function RosterList({ team, players, loading }) {
  return (
    <div className={`roster-list ${!loading ? "fade-in" : null}`}>
      {/* <h1>List</h1> */}
      {players.map((player, i) => (
        <div key={i} className="list-tile__rosterList">
          <div className="main-content__rosterList">
            <section className="playerSection__rosterList">
              <div className="playerImage__rosterList">
                <div className="portrait__rosterList">
                  {player.positionAbrev !== "G" ? (
                    <img
                      src={`/teamIcons/${team.abrev}.svg`}
                      alt=""
                      className="playerPortrait__rosterList"
                    />
                  ) : (
                    <img
                      src={`/teamIcons/${team.abrev}_goalie.svg`}
                      alt=""
                      className="playerPortrait__rosterList"
                    />
                  )}
                </div>
                {/* <img src={team.logo} alt="" className="teamLogo__rosterList" /> */}
              </div>
              <div className="info__rosterList">
                <div className="playerName__rosterList">
                  {player.firstName} {player.lastName}
                </div>
                <div className="playerInfo__rosterList">
                  <span>{player.position}</span>
                  <span>|</span>
                  <span>{player.class}</span>
                  <span>|</span>
                  {player.height}
                  <span>|</span>
                  <span>{player.weight}</span>
                </div>
              </div>
            </section>
            <section className="controlsSection__rosterList">
              <div className="playerNumber__rosterList">{player.number}</div>
              <img src={team.logo} alt="" className="teamLogo__rosterList" />
            </section>
          </div>
          <div className="social-content__rosterList">
            <div className="icons-container__rosterGrid">
              <div className="social-btn__rosterGrid">
                <FaXTwitter />
              </div>
              <div className="social-btn__rosterGrid">
                <FaInstagram />
              </div>
              <div className="social-btn__rosterGrid">
                <FaTiktok />
              </div>
            </div>
            <a href="" className="bio-link__rosterList">
              <span>Full Bio</span>
              <FaArrowRightLong />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RosterList;
