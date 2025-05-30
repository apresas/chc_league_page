// YearGrid.jsx
import React from "react";
import "./MonthYearGrid.css";

function YearGrid({ currentYear, onSelect }) {
  const start = Math.floor(currentYear / 10) * 10 - 1;
  const years = Array.from({ length: 12 }, (_, i) => start + i);

  return (
    <div className="grid-container">
      {years.map((year) => (
        <button
          key={year}
          className={`grid-item ${year === currentYear ? "selected" : ""}`}
          onClick={() => onSelect(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
}

export default YearGrid;