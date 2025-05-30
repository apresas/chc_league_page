import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
import CHCLogo from "../../assets/CHC_Logo.svg";
import SearchBar from "./SearchBar/SearchBar";
import { FaRegCircleUser } from "react-icons/fa6";

function NavBar({ setIsOpen }) {
  return (
    <div className="navBar">
      <div className="navBar_container">
        <div className="leagueLogo">
          <Link to="/">
            <img src={CHCLogo} alt="logo" />
          </Link>
        </div>

        <ul>
          {/* <li>
            <Link to="/games">Games</Link>
          </li> */}
          <li>
            <Link to="/schedule">Schedule</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/stats">Stats</Link>
          </li>
          <li>
            <Link to="/standings">Standings</Link>
          </li>
          <li>
            <Link to="/teams">Teams</Link>
          </li>
          <li>
            <Link to="/players">Players</Link>
          </li>
        </ul>
        <div className="search_container">
          <SearchBar />
          <button className="login_container" onClick={() => setIsOpen(true)}>
            <FaRegCircleUser />
          </button>
        </div>
        {/* <div className="search">search</div> */}
      </div>
    </div>
  );
}

export default NavBar;
