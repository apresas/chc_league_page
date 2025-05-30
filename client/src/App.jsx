import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Scores from "./components/scores/Scores";
import NavBar from "./components/nav/NavBar";
import Home from "./components/home/Home";
import TeamModel from "./components/TeamModel/TeamModel";
import LoginModal from "./components/Login/LoginModal";
import Footer from "./components/Footer/Footer";
import Games from "./components/pages/Games/Games";
import Schedule from "./components/pages/Schedule/Schedule";
import News from "./components/pages/News/News";
import Stats from "./components/pages/Stats/Stats";
import Teams from "./components/pages/Teams/Teams";
import Players from "./components/pages/Players/Players";
import Standings from "./components/pages/Standings/Standings";
import ScoresCarousel from "./components/ScoresCarousel/ScoresCarousel"; // Adjust path as needed
import GamesData from "./data/gamesData.json";
import GameSchedule from "./data/gameSchedule.json";
import GameCenter from "./components/pages/GameCenter/GameCenter";
import TeamsOverview from "./components/pages/Teams/TeamsOverview";
import ScheduleByTeam from "./components/pages/Schedule/ScheduleByTeam/ScheduleByTeam";
import PlayersByTeam from "./components/pages/Players/PlayerByTeam/PlayersByTeam";
import PlayerByID from "./components/pages/Players/PlayerByID/PlayerByID";
import ScrollToTop from "./utils/ScrollToTop.jsx"


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState({});
  const [redTeam, setRedTeam] = useState({});
  const [whiteTeam, setWhiteTeam] = useState({});
  const [blueTeam, setBlueTeam] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [teamID, setTeamID] = useState("");

  useEffect(() => {
    // fetch("./data/scheduledGames.json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    //     console.log(data)
    //     setGames(sorted);
    //     setFilteredGames(data);
    //   })
    //   .catch((err) => console.error("Failed to load scores:", err));
    const sortedGames = GameSchedule.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setGames(sortedGames);
  }, []);

  // const uniqueDates = [...new Set(games.map(g => g.date))].sort();
  // const uniqueDivisions = [...new Set(games.flatMap(g => [g.home.div, g.away.div]))].sort();

  useEffect(() => {
    let filtered = games;

    if (selectedDate) {
      filtered = filtered.filter((game) => game.date === selectedDate);
    }

    if (selectedDivision) {
      filtered = filtered.filter(
        (game) =>
          game.home.div === selectedDivision ||
          game.away.div === selectedDivision
      );
    }

    setFilteredGames(filtered);
  }, [selectedDate, selectedDivision, games]);

  // const groupedGames = filteredGames.reduce((groups, game) => {
  //   if (!groups[game.date]) {
  //     groups[game.date] = [];
  //   }
  //   groups[game.date].push(game);
  //   return groups;
  // }, {});

  // useEffect(() => {
  //   console.log(isOpen)
  // }, [isOpen])

  // useEffect(() => {
  //   console.log(modalOpen)
  // }, [modalOpen])

  useEffect(() => {
    // console.log(currentTeam)
  }, [currentTeam]);

  return (
    <>
      <div className="app_container">
        <LoginModal isOpen={modalOpen} setIsOpen={setModalOpen} />
        {/* <TeamModel isOpen={isOpen} setIsOpen={setIsOpen} currentTeam={currentTeam}/> */}
        <NavBar setIsOpen={setModalOpen} />
        {/* <Scores /> */}
        <ScoresCarousel games={games} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setCurrentTeam={setCurrentTeam}
                currentTeam={currentTeam}
                redTeam={redTeam}
                setRedTeam={setRedTeam}
                whiteTeam={whiteTeam}
                setWhiteTeam={setWhiteTeam}
                blueTeam={blueTeam}
                setBlueTeam={setBlueTeam}
              />
            }
          />
          <Route path="/games" element={<Games />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/schedule/:teamId" element={<ScheduleByTeam />} />
          <Route path="/news" element={<News />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/teams" element={<TeamsOverview />} />
          <Route
            path="/teams/:teamId"
            element={<Teams setTeamID={setTeamID} />}
          />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:teamId" element={<PlayersByTeam />} />
          <Route path="/players/:playerId" element={<PlayerByID />} />
          <Route path="/gamecenter/:gameId" element={<GameCenter />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
