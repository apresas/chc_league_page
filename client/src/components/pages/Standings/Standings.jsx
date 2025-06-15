import React, { useState, useEffect } from "react";
import "./standings.css";
import StandingsTable from "./StandingsTable/StandingsTable";
import { useStandings } from "../../../context/StandingsContext";
import Spinner from "../../Spinner/Spinner";
import { useImageCounter } from "../../../utils/useImageCounter";

function Standings() {
  const { overall, sortedDivisions } = useStandings();
  const [allImagesLoaded, setAllimagesLoaded] = useState(false)
  const [gamesPlayed, setGamesPlayed] = useState({})
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState({
    overall: [],
    red: [],
    white: [],
    blue: [],
  });

  useEffect(() => {
    const fetchStandings = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      try {
        const [overall, red, white, blue, games] = await Promise.all([
          fetch("http://localhost:5000/api/teamStandings").then((res) =>
            res.json()
          ),
          fetch(
            "http://localhost:5000/api/teamStandings/search?division=red"
          ).then((res) => res.json()),
          fetch(
            "http://localhost:5000/api/teamStandings/search?division=white"
          ).then((res) => res.json()),
          fetch(
            "http://localhost:5000/api/teamStandings/search?division=blue"
          ).then((res) => res.json()),
          fetch("http://localhost:5000/api/games/games-played").then((res) => res.json()), // fetch this new data
          delay(1250),
        ]);
        setStandings({ overall: overall, red: red, white: white, blue: blue });
        setGamesPlayed(games)
      } catch (error) {
        console.error("Error fetching Standings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

      // Check Image Load
  const { imagesLoaded } = useImageCounter();

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
            <h1>Standings</h1>
            <StandingsTable
              standings={standings.red}
              title="Red Standings"
              teams={sortedDivisions["red"]}
              divLogo="/Red_Div_Icon.svg"
              gamesPlayed={gamesPlayed}
              setAllimagesLoaded={setAllimagesLoaded}
            />
            <StandingsTable
              standings={standings.white}
              title="White Standings"
              teams={sortedDivisions["white"]}
              divLogo="/White_Div_Icon.svg"
              gamesPlayed={gamesPlayed}
              setAllimagesLoaded={setAllimagesLoaded}
            />
            <StandingsTable
              standings={standings.blue}
              title="Blue Standings"
              teams={sortedDivisions["blue"]}
              divLogo="/blue_division_icon2.svg"
              gamesPlayed={gamesPlayed}
              setAllimagesLoaded={setAllimagesLoaded}
            />

            <StandingsTable
              standings={standings.overall}
              title="League Standings"
              teams={overall}
              divLogo="/CHC_Logo.svg"
              gamesPlayed={gamesPlayed}
              setAllimagesLoaded={setAllimagesLoaded}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Standings;
