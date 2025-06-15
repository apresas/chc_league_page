import React, { useEffect, useState } from "react";
import "./players.css";
import ScoringLeaders from "../../ScoringLeaders/ScoringLeaders";
import rosterData from "../../../data/teamRosters.json";
import { useParams } from "react-router-dom";

function Players() {
  const { teamId } = useParams();
 

  return (
    <div className="main_container">
      <div className="content">
        <h1>Players</h1>
        {/* <ScoringLeaders team="null" roster={rosterData} header="" view="skaters"/> */}
      </div>
    </div>
  );
}

export default Players;
