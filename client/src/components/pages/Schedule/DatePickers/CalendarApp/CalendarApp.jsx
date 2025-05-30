// CalendarApp.jsx - updated to select closest game date as default with game dot indicators
import React, { useEffect } from "react";
import CalendarGrid from "../CalenderGrid/CalenderGrid";
import MonthGrid from "../CalenderGrid/MonthGrid";
import YearGrid from "../CalenderGrid/YearGrid";
import dateData from "../../../../../data/calenderData.json";
import gameSchedule from "../../../../../data/gameSchedule.json";
import { getWeekContainingDate } from "../../../../../utils/getWeekContainingDate";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useDate } from "../../../../../context/DateContext";
import "./calenderApp.css";

const CalendarApp = ({ setSelectedWeekLabel }) => {
  const {
    selectedDate,
    setSelectedDate,
    selectedWeek,
    currentYear,
    setCurrentYear,
    currentMonth,
    setCurrentMonth,
    handleWeekSelect,
    formatWeekLabel,
    viewMode,
    setViewMode,
  } = useDate();

  const getClosestGameDate = (gameDates) => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    if (gameDates.includes(todayStr)) {
      return today;
    }

    const parsedDates = gameDates
      .map(dateStr => new Date(dateStr))
      .filter(d => !isNaN(d));

    const closest = parsedDates.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev - today);
      const currDiff = Math.abs(curr - today);
      return currDiff < prevDiff ? curr : prev;
    }, parsedDates[0]);

    return closest;
  };

  useEffect(() => {
    const closestGameDate = getClosestGameDate(gameSchedule.map((g) => g.date));
    setSelectedDate(closestGameDate);
    setCurrentMonth(closestGameDate.getMonth());
    setCurrentYear(closestGameDate.getFullYear());
  }, []);

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const thisMonth = dateData[currentYear]?.months?.[currentMonth];
  const prevMonth = currentMonth === 0
    ? dateData[currentYear - 1]?.months?.[11]
    : dateData[currentYear]?.months?.[currentMonth - 1];
  const nextMonth = currentMonth === 11
    ? dateData[currentYear + 1]?.months?.[0]
    : dateData[currentYear]?.months?.[currentMonth + 1];

  const gameDatesSet = new Set(gameSchedule.map((g) => g.date));

  const renderView = () => {
    if (viewMode === "day") {
      return (
        <CalendarGrid
          monthData={thisMonth}
          year={currentYear}
          prevMonthData={prevMonth}
          nextMonthData={nextMonth}
          onSelectWeek={handleWeekSelect}
          selectedWeek={selectedWeek}
          gameDatesSet={gameDatesSet}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      );
    } else if (viewMode === "month") {
      return (
        <MonthGrid
          currentMonth={currentMonth}
          onSelect={(month) => {
            setCurrentMonth(month);
            setViewMode("day");
          }}
        />
      );
    } else {
      return (
        <YearGrid
          currentYear={currentYear}
          onSelect={(year) => {
            setCurrentYear(year);
            setViewMode("month");
          }}
        />
      );
    }
  };

  return (
    <>
      <div className="content-header">
        <button
          className="content-header-btn"
          onClick={() => {
            setViewMode((prev) =>
              prev === "day" ? "month" : prev === "month" ? "year" : "year"
            );
          }}
        >
          <div
            className="chevron_btn"
            onClick={(e) => {
              e.stopPropagation();
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
          {viewMode === "day" && `${thisMonth?.name} ${currentYear}`}
          {viewMode === "month" && `${currentYear}`}
          {viewMode === "year" && `${Math.floor(currentYear / 10) * 10}s`}
          <div
            className="chevron_btn"
            onClick={(e) => {
              e.stopPropagation();
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

      <div key={viewMode} className={`calendar-view-wrapper view-${viewMode}`}>
        {renderView()}
      </div>

      <button className="content-btn" onClick={handleTodayClick}>
        Today
      </button>
    </>
  );
};

export default CalendarApp;
