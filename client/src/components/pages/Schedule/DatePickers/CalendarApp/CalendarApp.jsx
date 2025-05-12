import React, { useEffect } from "react";
import CalendarGrid from "../CalenderGrid/CalenderGrid";
import dateData from "../../../../../data/calenderData.json";
import { getWeekContainingDate } from "../../../../../utils/getWeekContainingDate";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { useDate } from "../../../../../context/DateContext";

const CalendarApp = ({ setSelectedWeekLabel, onWeekSelect }) => {
  const {
    selectedDate,
    setSelectedWeek,
    selectedWeek,
    currentYear,
    setCurrentYear,
    currentMonth,
    setCurrentMonth,
    handleWeekSelect,
    formatWeekLabel,
  } = useDate();

  const getWeekDates = (date) => {
    const start = new Date(date);
    const day = start.getDay(); // 0 = Sunday, 6 = Saturday

    // Move date to the Sunday of the current week
    start.setDate(start.getDate() - day);

    const week = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      week.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        day: d.getDate(),
        date: d,
      });
    }

    return week;
  };

  useEffect(() => {
    const week = getWeekDates(selectedDate);
    setSelectedWeekLabel(formatWeekLabel(week));
    setSelectedWeek(week);

    const newWeek = getWeekDates(selectedDate);
    setSelectedWeek(newWeek);
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());

    if (!selectedDate) return;
  }, [selectedDate]);

  const handleTodayClick = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed
    const day = today.getDate();

    // If the current view is not the current month/year, update it
    if (currentYear !== year) setCurrentYear(year);
    if (currentMonth !== month) setCurrentMonth(month);

    const week = getWeekContainingDate(year, month, day);
    setSelectedWeek(week);
    setSelectedWeekLabel(formatWeekLabel(week));
    handleWeekSelect(week);
  };

  const thisMonth = dateData[currentYear]?.months?.[currentMonth];
  const prevMonth =
    currentMonth === 0
      ? dateData[currentYear - 1]?.months?.[11]
      : dateData[currentYear]?.months?.[currentMonth - 1];
  const nextMonth =
    currentMonth === 11
      ? dateData[currentYear + 1]?.months?.[0]
      : dateData[currentYear]?.months?.[currentMonth + 1];

  return (
    <>
      <div className="content-header">
        <button className="content-header-btn">
          <div
            className={`chevron_btn`}
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentYear((y) => y - 1);
                setCurrentMonth(11);
              } else {
                setCurrentMonth((m) => m - 1);
              }
            }}
          >
            <FaChevronLeft />
          </div>
          {thisMonth?.name} {currentYear}
          <div
            className={`chevron_btn`}
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentYear((y) => y + 1);
                setCurrentMonth(0);
              } else {
                setCurrentMonth((m) => m + 1);
              }
            }}
          >
            <FaChevronRight />
          </div>
        </button>
      </div>

      <CalendarGrid
        monthData={thisMonth}
        year={currentYear}
        prevMonthData={prevMonth}
        nextMonthData={nextMonth}
        onSelectWeek={handleWeekSelect}
        selectedWeek={selectedWeek}
      />
      <button className="content-btn" onClick={handleTodayClick}>
        Today
      </button>
    </>
  );
};

export default CalendarApp;
