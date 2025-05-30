import React, { createContext, useContext, useState, useEffect } from "react";
import { getWeekDates } from "../utils/getWeekDates";
import { getInitialWeekFromGames } from "../utils/getWeekContainingGame";
import gameSchedule from "../data/gameSchedule.json"
const monthAbbr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(getWeekDates(new Date()));
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(2);
  const [selectedWeekLabel, setSelectedWeekLabel] = useState("Week");

  const [viewMode, setViewMode] = useState("day"); // "day", "month", "year"

  // useEffect(() => {
  //   const newWeek = getWeekDates(selectedDate);
  //   // setSelectedWeek(newWeek);
  //   setSelectedWeek(getWeekDates(selectedDate));
  // }, [selectedDate]);

  useEffect(() => {
  if (selectedDate) {
    const newWeek = getWeekDates(selectedDate);
    setSelectedWeek(newWeek);
    setSelectedWeekLabel(formatWeekLabel(newWeek));
  }
}, [selectedDate]);

  const handleWeekSelect = (week) => {
    setSelectedWeek(week);
    setSelectedWeekLabel(formatWeekLabel(week));
    // onWeekSelect(week);
  };

  const shiftWeek = (direction) => {
    if (!selectedWeek || selectedWeek.length === 0) return;

    // Create a new Date instance (copy) from selectedWeek[0]
    const baseDate = new Date(
      selectedWeek[0].year,
      selectedWeek[0].month,
      selectedWeek[0].day
    );

    // Shift by exactly 7 days forward or backward
    const newStartDate = new Date(baseDate); // make sure not to mutate baseDate
    newStartDate.setDate(
      newStartDate.getDate() + (direction === "next" ? 7 : -7)
    );

    const newWeek = getWeekDates(newStartDate);

    setCurrentMonth(newStartDate.getMonth());
    setCurrentYear(newStartDate.getFullYear());
    handleWeekSelect(newWeek);
  };

  const formatWeekLabel = (week) => {
    if (!week || week.length === 0) return "";
    const start = week[0];
    const end = week[6];

    const startMonth = monthAbbr[start.month];
    const endMonth = monthAbbr[end.month];

    const sameMonth = start.month === end.month && start.year === end.year;
    return sameMonth
      ? `${startMonth} ${start.day} – ${end.day}`
      : `${startMonth} ${start.day} – ${endMonth} ${end.day}`;
  };

  return (
    <DateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        shiftWeek,
        setSelectedWeek,
        selectedWeek,
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        handleWeekSelect,
        selectedWeekLabel,
        setSelectedWeekLabel,
        formatWeekLabel,
        monthAbbr,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => useContext(DateContext);
