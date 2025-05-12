import React, { useRef, useState, useEffect } from "react";
import TeamTile from "../teamGrid/TeamTile";
import TeamOverlay from "./TeamOverlay/TeamOverlay";
import "./teamGrid.css";
import RedDiv from "../../../assets/Red_Div_Icon.svg";
import WhiteDiv from "../../../assets/White_Div_Icon.svg";
import BlueDiv from "../../../assets/blue_division_icon.svg";
import Teams from "../../../data/teamData.json";
import TeamInfo from "../../../data/teamInfoData.json";

function TeamGrid({
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
  const teamRef = useRef();

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

  // let teamRefs = useRef([React.createRef()]);

  useEffect(() => {
    // console.log(redStandings)
  }, [redStandings]);

  // useEffect(() => {
  //   const handler = (event) => {
  //     // if (teamRef.current && !teamRef.current.contains(event.target)) {
  //     //   setIsOpen(!isOpen);
  //     // }
  //     console.log(teamRefs.current);
  //   };

  //   document.addEventListener("click", handler);

  //   return () => {
  //     document.removeEventListener("click", handler);
  //   };
  // }, [teamRefs]);

  return (
    <div className="teamContainer">
      <div className="division_title">
        <h1>Capital Hockey Conference</h1>
      </div>
      <div className="teamGrid_container">
        <div className="conference_container red">
          <TeamOverlay
            isOpen={redOpen}
            setIsOpen={setRedOpen}
            currentTeam={redTeam}
            division="red"
            rank={rank}
          />
          {/* <div className={`red_overlay ${isOpen ? "open" : null}`}></div> */}

          <div className="division_header">
            <img src={RedDiv} alt="" />
          </div>
          <div className="division_grid">
            {redDivision.map((team, i) => (
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
                division={team.div}
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
            <img src={WhiteDiv} alt="" />
          </div>
          <div className="division_grid">
            {whiteDivision.map((team, i) => (
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
                division={team.div}
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
            <img src={BlueDiv} alt="" />
          </div>
          <div className="division_grid">
            {blueDivision.map((team, i) => (
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
                division={team.div}
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
