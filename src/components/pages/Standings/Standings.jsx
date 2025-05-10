import React from "react";
import "./standings.css";
import StandingsTable from "./StandingsTable/StandingsTable";
import { useStandings } from "../../../context/StandingsContext";

function Standings() {
  const { overall, sortedDivisions } = useStandings();
  return (
    <div className="main_container">
      <div className="content">
        <h1>Standings</h1>
        <StandingsTable title="Red Standings" teams={sortedDivisions["red"]} divLogo="/Red_Div_Icon.svg" />
        <StandingsTable title="White Standings" teams={sortedDivisions["white"]} divLogo="/White_Div_Icon.svg" />
        <StandingsTable title="Blue Standings" teams={sortedDivisions["blue"]} divLogo="/blue_division_icon2.svg" />

        <StandingsTable title="League Standings" teams={overall} divLogo="/CHC_Logo.svg"/>
      </div>
    </div>
  );
}

export default Standings;
