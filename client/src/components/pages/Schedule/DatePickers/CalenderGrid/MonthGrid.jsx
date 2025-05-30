// MonthGrid.jsx
import React from "react";
import "./MonthYearGrid.css";

// const months = [
//   "January", "February", "March", "April",
//   "May", "June", "July", "August",
//   "September", "October", "November", "December"
// ];

const months = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"
];

function MonthGrid({ currentMonth, onSelect }) {
  return (
    <div className="grid-container">
      {months.map((month, i) => (
        <button
          key={i}
          className={`grid-item ${i === currentMonth ? "selected" : ""}`}
          onClick={() => onSelect(i)}
        >
          {month}
        </button>
      ))}
    </div>
  );
}

export default MonthGrid;