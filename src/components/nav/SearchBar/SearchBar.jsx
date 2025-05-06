import React from "react";
import "./searchBar.css"
import { IoSearch } from "react-icons/io5";


function SearchBar({isOpen, setIsOpen}) {
  return (
    <div className="box">
      <input type="text" className="text" placeholder="Search" />
      <a href="#">
        <IoSearch />
      </a>
    </div>
  );
}

export default SearchBar;
