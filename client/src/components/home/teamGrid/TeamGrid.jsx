import React, { useRef, useState, useEffect } from "react";
import TeamTile from "../teamGrid/TeamTile";
import TeamOverlay from "./TeamOverlay/TeamOverlay";
import "./teamGrid.css";
import RedDiv from "../../../assets/Red_Div_Icon.svg";
import WhiteDiv from "../../../assets/White_Div_Icon.svg";
import BlueDiv from "../../../assets/blue_division_icon.svg";
import Teams from "../../../data/teamData.json";
import TeamInfo from "../../../data/teamInfoData.json";
import Spinner from "../../Spinner/Spinner";
import { useImageCounter } from "../../../utils/useImageCounter";

function TeamGrid({
  isOpen,
  setIsOpen,
  redTeam,
  setRedTeam,
  whiteTeam,
  setWhiteTeam,
  blueTeam,
  setBlueTeam,
  divisionTeams
}) {
  const teamRef = useRef();
  const [loading, setLoading] = useState(false);

  let redKeys = [];

  const [redOpen, setRedOpen] = useState(false);
  const [whiteOpen, setWhiteOpen] = useState(false);
  const [blueOpen, setBlueOpen] = useState(false);
  const [redStandings, setRedStandings] = useState([]);

  const [rank, setRank] = useState(0);

  const sortByName = (a, b) => a.name.localeCompare(b.name);

  // Filter and sort by division and name
  const redDivision = TeamInfo.teams
    .filter((team) => team.div === "red")
    .sort(sortByName);

  const whiteDivision = TeamInfo.teams
    .filter((team) => team.div === "white")
    .sort(sortByName);

  const blueDivision = TeamInfo.teams
    .filter((team) => team.div === "blue")
    .sort(sortByName);

  // const [divisionTeams, setDivisionTeams] = useState({
  //   red: [],
  //   white: [],
  //   blue: [],
  // });

  // Check Image Load
    const { imagesLoaded, handleImageLoad } = useImageCounter(3);

  // useEffect(() => {
  //   const fetchDivisionTeams = async () => {
  //     setLoading(true);
  //     const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //     try {
  //       const [red, white, blue] = await Promise.all([
  //         fetch("http://localhost:5000/api/teams/search?division=red").then(
  //           (res) => res.json()
  //         ),
  //         fetch("http://localhost:5000/api/teams/search?division=white").then(
  //           (res) => res.json()
  //         ),
  //         fetch("http://localhost:5000/api/teams/search?division=blue").then(
  //           (res) => res.json()
  //         ),
  //         delay(1250),
  //       ]);
  //       setDivisionTeams({ red: red, white: white, blue: blue });
  //     } catch (error) {
  //       console.error("Error fetching division teams:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchDivisionTeams();
  // }, []);

  return (
    <div className="teamContainer">
      <div className="division_title">
        <h1>Capital Hockey Conference</h1>
      </div>
        <div className="teamGrid_container">
          <div className="conference_container red">
            <div className="division_header">
              <img src={RedDiv} alt="" onLoad={handleImageLoad}/>
            </div>
            <div className={`division_grid`}>
              {divisionTeams.red.map((team, i) => (
                <TeamTile
                  currentTeam={redTeam}
                  keys={redKeys}
                  ref={teamRef}
                  team={team}
                  key={i}
                  id={team.id}
                  logo={team.id}
                  name={team.name}
                  mascot={team.mascot}
                  city={team.city}
                  division={team.division}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  redOpen={redOpen}
                  setRedOpen={setRedOpen}
                  setCurrentTeam={setRedTeam}
                  setRank={setRank}
                  setDivStandings={setRedStandings}
                  divStandings={redStandings}
                />
              ))}
            </div>
            <div className="conference_grid"></div>
          </div>
          <div className="conference_container white">
            <TeamOverlay
              isOpen={whiteOpen}
              setIsOpen={setWhiteOpen}
              currentTeam={whiteTeam}
              division="white"
            />
            <div className="division_header">
              <img src={WhiteDiv} alt="" onLoad={handleImageLoad} />
            </div>
            <div className={`division_grid ${!loading ? "fade-in" : null}`}>
              {divisionTeams.white.map((team, i) => (
                <TeamTile
                  currentTeam={whiteTeam}
                  keys={redKeys}
                  ref={teamRef}
                  team={team}
                  key={i}
                  id={team.id}
                  logo={team.id}
                  name={team.name}
                  mascot={team.mascot}
                  city={team.city}
                  division={team.division}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  whiteOpen={whiteOpen}
                  setWhiteOpen={setWhiteOpen}
                  setCurrentTeam={setWhiteTeam}
                  setRank={setRank}
                  setDivStandings={setRedStandings}
                  divStandings={redStandings}
                />
              ))}
            </div>
            <div className="conference_grid"></div>
          </div>
          <div className="conference_container blue">
            <TeamOverlay
              isOpen={blueOpen}
              setIsOpen={setBlueOpen}
              currentTeam={blueTeam}
              division="blue"
            />
            <div className="division_header">
              <img src={BlueDiv} alt="" onLoad={handleImageLoad}/>
            </div>
            <div className={`division_grid ${!loading ? "fade-in" : null}`}>
              {divisionTeams.blue.map((team, i) => (
                <TeamTile
                  currentTeam={blueTeam}
                  keys={redKeys}
                  ref={teamRef}
                  team={team}
                  key={i}
                  id={team.id}
                  logo={team.id}
                  name={team.name}
                  mascot={team.mascot}
                  city={team.city}
                  division={team.division}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  blueOpen={blueOpen}
                  setBlueOpen={setBlueOpen}
                  setCurrentTeam={setBlueTeam}
                  setRank={setRank}
                  setDivStandings={setRedStandings}
                  divStandings={redStandings}
                />
              ))}
            </div>
            <div className="conference_grid"></div>
          </div>
        </div>
    </div>
  );
}

export default TeamGrid;
