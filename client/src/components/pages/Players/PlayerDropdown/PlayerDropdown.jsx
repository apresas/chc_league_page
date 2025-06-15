import React, { useRef, useState, useEffect } from "react";
import "./playerDropdown.css";
import { FaChevronDown } from "react-icons/fa6";

function PlayerDropdown({ currentTeam, teams, teamId, setSelectedTeam }) {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (e, team) => {
    e.preventDefault();
    setSelected(team); // local state
    setIsOpen(false);
    setSelectedTeam(team)
  };

  useEffect(() => {
  if (currentTeam) {
    setSelected(currentTeam);
    setSelectedTeam(currentTeam)
  }
  }, [currentTeam])


  return (
    <div className="player-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`dropdown-button ${isOpen ? "dropdown-btn-open" : null}`}
      >
        {selected
          ? <div>{selected.name}</div>
          : "Select Team"}
        <span className={`arrow  ${isOpen ? "arrow_toggle" : null}`}>
          <FaChevronDown />
        </span>
      </button>

      <div className={`dropdown-menu ${isOpen ? "dropdown-menu-open" : null}`}>
        {teams.map((team, i) => (
          <div
            key={i}
            className={`dropdown-item ${selected?.id === team.id ? "selected" : ""}`}
            onClick={(e) => handleSelect(e, team)}
          >
            {team.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerDropdown;
