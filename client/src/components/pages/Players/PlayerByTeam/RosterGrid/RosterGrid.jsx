import React from "react";
import "./rosterGrid.css";

import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

function RosterGrid({ players, team, loading }) {
  return (
    <div className={`roster-grid ${!loading ? "fade-in" : null}`}>
      {/* <h1>Grid</h1> */}
      {players.map((player, i) => (
        <div key={i} className="tile__rosterGrid">
          <div className="portrait__rosterGrid">
            <div className="number__rosterGrid">{player.number}</div>
            {player.positionAbrev !== "G" ? (
              <img src={`/teamIcons/${team.abrev}.svg`} alt="" />
            ) : (
              <img src={`/teamIcons/${team.abrev}_goalie.svg`} alt="" />
            )}
          </div>
          <div className="info__rosterGrid">
            <div className="name__rosterGrid">
              {player.firstName} {player.lastName}
            </div>
            <div className="playerInfo__rosterGrid">
              <span>{player.position}</span>
              <span> | </span>
              <span>{player.height}</span>
              <span> | </span>
              <span>{player.weight}</span>
            </div>
          </div>
          <div className="socials__rosterGrid">
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
        </div>
      ))}
    </div>
  );
}

export default RosterGrid;
