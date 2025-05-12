import React from "react";
import "./dateTile.css";
import { FaRegCalendar } from "react-icons/fa";

function DateTile({ date, gameCount, onClick, isSelected }) {
    const isClickable = gameCount > 0;


  return (
    <div
      className={`dateTile ${isClickable ? "clickable" : ""} ${isSelected ? 'selected' : ''}`}
      onClick={isClickable ? onClick : null}
    >
      <div className="dateTile_header">
        <div className="dateTile_date">
          {new Date(date + "T00:00:00").toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="dateTile_day">
          {new Date(date + "T00:00:00").toLocaleDateString(undefined, {
            weekday: "short",
          })}
        </div>
      </div>
      <div className="dateTile_games">
        <div className="tile-count">
          {gameCount} game{gameCount !== 1 ? "s" : ""}
        </div>
        <div className={`dateTile_selected_icon ${isSelected ? "selected-icon" : null}`}>
          <FaRegCalendar />
        </div>
      </div>
    </div>
  );
}

export default DateTile;
