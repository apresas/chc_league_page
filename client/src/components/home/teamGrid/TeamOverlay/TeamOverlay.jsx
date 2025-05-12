import React, {useState, useEffect} from "react";
import "./teamOverlay.css";
import { IoClose } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { FaTrophy } from "react-icons/fa6";
import OhioIcon from "../../../Icons/OhioIcon";
import standingsData from "../../../../data/standingsData.json";
import { use } from "react";

function TeamOverlay({ isOpen, setIsOpen, currentTeam, division, rank }) {
  const [standings, setStandings] = useState([]);
  const [currentID, setCurrentID] = useState()


//   console.log(currentTeam);
  const handelClose = () => {
    setIsOpen(false);
  };


  return (
    <div
      className={`team_bg ${isOpen ? "team_open" : null } overlay_${division}`}
    >
      <div className="overlay_container">
        <div className={`team_overlay ${isOpen ? "overlay_open" : null}`}>
          {currentTeam.div}
          <button className="teamClose_btn" onClick={handelClose}>
            <IoClose />
          </button>
          <div className={`overlay_header overlay_border_${division}`}></div>
          <section className="logo_section">
            <div className={`overlay_logo_container logo_outline_${division}`}>
              <img src={currentTeam.logo} alt="" className="overlay_logo" />
            </div>
          </section>
          <div className="overlay_info">
            <div className="overlay_name">
              <div className="overlay_teamName">{currentTeam.name}</div>
              <div className="overlay_mascot">{currentTeam.mascot}</div>
            </div>
            <div className="overlay_grid">
              <div className="overlay_est">
                <span className="ohio_icon">
                  {/* <img src={OhioIcon} alt="" /> */}
                  <OhioIcon />
                </span>
                {currentTeam.est}
              </div>
              <div className="overlay_city">
                <span className="location_icon">
                  <MdLocationPin />
                </span>
                {currentTeam.city}
              </div>
              <div className="overlay_rank">
                <span className="overlay_rank_icon">
                  <FaTrophy />
                </span>
                {rank + 1}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamOverlay;
