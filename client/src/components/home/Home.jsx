import React, { useState, useEffect } from "react";
import TeamGrid from "./teamGrid/TeamGrid";
import "./home.css";
import DivDesc from "./DivDesc/DivDesc";
import Spinner from "../Spinner/Spinner";

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

  const [loading, setLoading] = useState(true);

  const [divisionTeams, setDivisionTeams] = useState({
    red: [],
    white: [],
    blue: [],
  });

  // Check Image Load
  // const { imagesLoaded, handleImageLoad } = useImageCounter(3);

  useEffect(() => {
    const fetchDivisionTeams = async () => {
      setLoading(true);
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      try {
        const [red, white, blue] = await Promise.all([
          fetch("http://localhost:5000/api/teams/search?division=red").then(
            (res) => res.json()
          ),
          fetch("http://localhost:5000/api/teams/search?division=white").then(
            (res) => res.json()
          ),
          fetch("http://localhost:5000/api/teams/search?division=blue").then(
            (res) => res.json()
          ),
          delay(1250),
        ]);
        setDivisionTeams({ red: red, white: white, blue: blue });
      } catch (error) {
        console.error("Error fetching division teams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDivisionTeams();
  }, []);

  return (
    <>
      {loading ? (
        <div
          className={`spinner-bg`}
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Spinner />
        </div>
      ) : (
        <div className={`main_container ${!loading ? "fade-in" : null}`}>
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
              divisionTeams={divisionTeams}
            />
            <DivDesc />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
