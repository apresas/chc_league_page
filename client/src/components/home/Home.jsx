import React, { useState, useEffect } from "react";
import TeamGrid from "./teamGrid/TeamGrid";
import "./home.css";
import StandingsTable from "./standings/standingsTable";
import StandingsTableTest from "./standings/StandingsTableTest";
import standingsData from "../../data/standingsData.json";
import DivDesc from "./DivDesc/DivDesc";
import TournamentBracket from "../TournamentBracket/TournamentBracket";
import TournamentData from "../../data/tournamentData.json"
import TeamInfo from "../../data/teamInfoData.json"

function Home({
  isOpen,
  setIsOpen,
  setCurrentTeam,
  currentTeam,
  redTeam,
  setRedTeam,
  whiteTeam,
  setWhiteTeam,
  blueTeam,
  setBlueTeam,
}) {
  const divisions = ["Red", "White", "Blue"];

  // const [standings, setStandings] = useState([])

  // useEffect(() => {
  //   standingsData.map((standing) => {setStandings(standing.teams)})
  // }, [])

  // useEffect(() => {
  //   console.log(standings)
  // }, [standings])

  return (
    <div className="main_container">
      <div className="content">
        <TeamGrid
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentTeam={currentTeam}
          setCurrentTeam={setCurrentTeam}
          redTeam={redTeam}
          setRedTeam={setRedTeam}
          whiteTeam={whiteTeam}
          setWhiteTeam={setWhiteTeam}
          blueTeam={blueTeam}
          setBlueTeam={setBlueTeam}
        />
        {/* <StandingsTable /> */}

        {/* <div className="standing_title">
          <h1>Standings</h1>
        </div>
        <div className="homeStandings_container">
          {divisions.map((division, i) => (
            <StandingsTableTest division={division} key={i} />
          ))}
        </div> */}

        <DivDesc />

        {/* <TournamentBracket tournamentData={TournamentData} teamInfo={TeamInfo}/> */}
      </div>
    </div>
  );
}

export default Home;
