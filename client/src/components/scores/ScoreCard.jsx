import React, { forwardRef } from "react";
import "./scoreCard.css";
import TeamCard from "./TeamCard";
import OHSLogo from "../../assets/OHS_Logo.svg";
import OLHSLogo from "../../assets/OLHS_Logo.svg";
import { PiHockeyBold } from "react-icons/pi";
import TeamData from "../../data/teamData.json";

const ScoreCard = forwardRef((props, ref) => {
  const { homeTeamID, awayTeamID, homeScore, awayScore } = props;

  const handleClick = () => {
    console.log("Gamecenter");
    console.log(ref.current)
  };

  return (
    <div className="scoreCard_container" ref={ref}>
      <div className="score_overlay">
        <button className="score_overlay_btn" onClick={handleClick}>
          <PiHockeyBold />
          Gamecenter
        </button>
      </div>
      <div className="scoreDate">Final</div>
      {/* <div className="scoreHome">Home</div>
        <div className="scoreAway">Away</div> */}
      <TeamCard name="OHS" teamID={homeTeamID} score={homeScore} />
      <TeamCard name="OLHS" teamID={awayTeamID} score={awayScore} />
    </div>
  );
});

export default ScoreCard;
