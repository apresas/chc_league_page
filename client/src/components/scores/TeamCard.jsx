import React from "react";
import "./scoreCard.css";
import TeamInfo from "../../data/teamInfoData.json";

function TeamCard({ teamID, score }) {
  return (
    <>
      {TeamInfo.teams.map((team, i) => {
        if (team.id === teamID) {
          if (team.div === "red") {
            const red = "#ea1836";
            return (
              <div className="teamCard_container" key={i}>
                <div className="teamLogo">
                  <img src={team.logo} alt="logo" />
                </div>
                <div className="teamName">{team.abrev}</div>
                <div className="teamScore">{score}</div>
                <span
                  className="teamDiv"
                  style={{ backgroundColor: `${red}` }}
                />
              </div>
            );
          } else if (team.div === "white") {
            const white = "#e4e6ed";
            return (
              <div className="teamCard_container" key={i}>
                <div className="teamLogo">
                  <img src={team.logo} alt="logo" />
                </div>
                <div className="teamName">{team.abrev}</div>
                <div className="teamScore">{score}</div>
                <span
                  className="teamDiv"
                  style={{ backgroundColor: `${white}` }}
                />
              </div>
            );
          } else if (team.div === "blue") {
            const blue = "#184ba9";
            return (
              <div className="teamCard_container" key={i}>
                <div className="teamLogo">
                  <img src={team.logo} alt="logo" />
                </div>
                <div className="teamName">{team.abrev}</div>
                <div className="teamScore">{score}</div>
                <span
                  className="teamDiv"
                  style={{ backgroundColor: `${blue}` }}
                />
              </div>
            );
          }
        }
      })}
    </>
  );
}

export default TeamCard;
