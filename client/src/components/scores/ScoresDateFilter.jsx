import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import DropDown from "../nav/DropDown/DropDown";

function ScoresDateFilter() {
  return (
    <div className="scoresFilter_container">
      <div className="filter_dropdown">
            <div className="filter_date">
                Tues, Dec 03
            </div>
            <FaAngleDown />
        </div>
    </div>
  );
}

export default ScoresDateFilter;
