import React, { useState, useEffect } from "react";
import "./playersByTeam.css";
import { useParams } from "react-router-dom";
import RosterTable from "../../../RosterTable/RosterTable";
import Spinner from "../../../Spinner/Spinner";
import { IoList } from "react-icons/io5";
import { MdOutlineTableChart } from "react-icons/md";
import { IoGridOutline } from "react-icons/io5";
import { LuLayoutGrid } from "react-icons/lu";
import RosterList from "./RosterList/RosterList";
import RosterGrid from "./RosterGrid/RosterGrid";
import PlayerDropdown from "../PlayerDropdown/PlayerDropdown";

function PlayersByTeam() {
  const { teamId } = useParams();
  const [team, setTeam] = useState({});
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [view, setView] = useState("Table");
  const [selectedTeam, setSelectedTeam] = useState({});
  const [allTeams, setAllTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      try {
        const [players, team, teams] = await Promise.all([
          fetch(`http://localhost:5000/api/players/search?teamId=${teamId}`),
          fetch(`http://localhost:5000/api/teams/search?id=${teamId}`),
          fetch(`http://localhost:5000/api/teams/`),
          delay(1250), // minimum 2 second delay to show spinner
        ]);

        const roster = await players.json();
        const currentTeam = await team.json();
        const allTeams = await teams.json();
        setRoster(roster);
        setTeam(currentTeam); // pull team data from association
        setAllTeams(allTeams);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, [teamId]);

  useEffect(() => {
    // console.log(selectedTeam);

    const fetchSelected = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      setContentLoading(true);
      try {
        const [players] = await Promise.all([
          fetch(
            `http://localhost:5000/api/players/search?teamId=${selectedTeam.id}`
          ),
          delay(1250), // minimum 2 second delay to show spinner
        ]);

        const roster = await players.json();
        setRoster(roster);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setContentLoading(false);
      }
    };

    if (selectedTeam && Object.keys(selectedTeam).length === 0) {
      // fetchSelected()
    } else fetchSelected();
    setTeam(selectedTeam);
  }, [selectedTeam]);


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
            <div className="header__playersByTeam">
              <div className="teamName__playersByTeam">
                <h1>{team.name}</h1>
                <div>{team.mascot}</div>
              </div>
              <div className="header-controls__playersByTeam">
                <PlayerDropdown
                  currentTeam={team}
                  teams={allTeams}
                  teamId={teamId}
                  setSelectedTeam={setSelectedTeam}
                />
              </div>
            </div>
            <div className="controls__playersByTeam">
              <div className="search__playersByTeam"></div>
              <div className="list-views__playersByTeam">
                <button
                  className={`player-btn__playersByTeam ${
                    view === "Table" ? "selected-view" : null
                  }`}
                  onClick={() => setView("Table")}
                >
                  <MdOutlineTableChart />
                </button>
                <button
                  className={`player-btn__playersByTeam ${
                    view === "List" ? "selected-view" : null
                  }`}
                  onClick={() => setView("List")}
                >
                  <IoList />
                </button>
                <button
                  className={`player-btn__playersByTeam ${
                    view === "Grid" ? "selected-view" : null
                  }`}
                  onClick={() => setView("Grid")}
                >
                  <LuLayoutGrid />
                </button>
              </div>
            </div>

            {contentLoading ? (
              <Spinner />
            ) : (
              <>
                {view === "Table" ? (
                  <RosterTable
                    title={null}
                    players={roster}
                    team={team.abrev}
                    type="All"
                  />
                ) : view === "List" ? (
                  <RosterList players={roster} team={team} loading={contentLoading}/>
                ) : view === "Grid" ? (
                  <RosterGrid players={roster} team={team} loading={contentLoading}/>
                ) : null}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PlayersByTeam;
