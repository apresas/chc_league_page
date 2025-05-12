import React from "react";
import './scoreCard.css'

function DateCard({date}) {
  return (
    <div className="dateCard_container">
      <div className="dayofweek">{date.dow}</div>
      <div className="date">
        <div className="month">{date.month}</div>
        <div className="day">{date.day}</div>
      </div>
    </div>
  );
}

export default DateCard;
