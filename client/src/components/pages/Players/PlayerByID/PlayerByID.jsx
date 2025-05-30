import React from "react";
import "./playerByID.css";
import { useParams } from "react-router-dom";

function PlayerByID() {
  const { playerId } = useParams();
  return (
    <div className="main_container">
      <div className="content">
        <h1>PlayerByID: {playerId}</h1>
      </div>
    </div>
  );
}

export default PlayerByID;
