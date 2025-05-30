import React from "react";
import "./playersByTeam.css";
import { useParams } from "react-router-dom";

function PlayersByTeam() {
  const { teamId } = useParams();
  return (
    <div className="main_container">
      <div className="content">
        <h1>PlayersByTeam: {teamId}</h1>
      </div>
    </div>
  );
}

export default PlayersByTeam;
