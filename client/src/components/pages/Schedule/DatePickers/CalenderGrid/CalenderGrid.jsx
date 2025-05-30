// CalendarGrid.jsx - restored game dot support and visual indicator logic
import React, { useState, useEffect } from "react";
import "./calenderGrid.css";
import { getWeekContainingDate } from "../../../../../utils/getWeekContainingDate";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = ({
  monthData,
  year,
  prevMonthData,
  nextMonthData,
  onSelectWeek,
  onSelectDate,
  selectedWeek,
  gameDatesSet,
  selectedDate,
}) => {
  const { name, days, startDay } = monthData;
  const [animateKey, setAnimateKey] = useState("");

  useEffect(() => {
    if (selectedWeek && selectedWeek.length > 0) {
      const key = `${selectedWeek[0].year}-${selectedWeek[0].month}-${selectedWeek[0].day}`;
      setAnimateKey(key);
    }
  }, [selectedWeek]);

  const getMonthIndex = (monthName) => {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    return months.indexOf(monthName);
  };

  const handleDayClick = (day, mOffset = 0) => {
    const actualMonth = getMonthIndex(name) + mOffset;
    const actualYear = year + (actualMonth > 11 ? 1 : actualMonth < 0 ? -1 : 0);
    const correctedMonth = (actualMonth + 12) % 12;
    const week = getWeekContainingDate(actualYear, correctedMonth, day);
    const selected = new Date(actualYear, correctedMonth, day);
    onSelectWeek(week);
    onSelectDate(selected);
  };

  const isHighlighted = (y, m, d) => {
    return selectedWeek?.some(date => date.year === y && date.month === m && date.day === d);
  };

  const isSelectedDate = (y, m, d) => {
    if (!selectedDate) return false;
    const sel = new Date(selectedDate);
    return sel.getFullYear() === y && sel.getMonth() === m && sel.getDate() === d;
  };

  const hasGame = (y, m, d) => {
    const key = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return gameDatesSet?.has(key);
  };

  const currentMonthIndex = getMonthIndex(name);

  const prevDays = prevMonthData ? prevMonthData.days : 30;
  const prevMonthDays = Array.from({ length: startDay }, (_, i) => ({
    day: prevDays - startDay + i + 1,
    isCurrent: false,
    year: currentMonthIndex === 0 ? year - 1 : year,
    month: (currentMonthIndex + 11) % 12,
    offset: -1,
  }));

  const currentMonthDays = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    isCurrent: true,
    year,
    month: currentMonthIndex,
    offset: 0,
  }));

  const totalDisplayed = prevMonthDays.length + currentMonthDays.length;
  const remaining = 42 - totalDisplayed;
  const nextMonthDays = Array.from({ length: remaining }, (_, i) => ({
    day: i + 1,
    isCurrent: false,
    year: currentMonthIndex === 11 ? year + 1 : year,
    month: (currentMonthIndex + 1) % 12,
    offset: 1,
  }));

  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  return (
    <div className="calendar-grid">
      {weekdays.map((day, i) => (
        <div key={`header-${i}`} className="calendar-header">
          {day}
        </div>
      ))}

      {allDays.map((cell, i) => (
        <button
          key={`cell-${i}`}
          className={`calendar-cell ${cell.isCurrent ? '' : 'faded'} ${isHighlighted(cell.year, cell.month, cell.day) ? 'highlighted' : ''} ${isSelectedDate(cell.year, cell.month, cell.day) ? 'selected' : ''}`}
          onClick={() => handleDayClick(cell.day, cell.offset)}
        >
          {cell.day}
          {hasGame(cell.year, cell.month, cell.day) && <div className="game-dot" />}
        </button>
      ))}
    </div>
  );
};

export default CalendarGrid;