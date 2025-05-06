import React from "react";
import "./datePickerButton.css";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { useDate } from "../../../../../context/DateContext";

function DatePickerButton({ open, toggle, selectedWeekLabel }) {
  const { shiftWeek } = useDate();

  return (
    <div className={`datePicker-btn ${open ? "button-open" : null}`}>
      <button
        className={`datePicker-arrow prev-date ${
          open ? "datePicker-arrow-toggle" : null
        }`}
        onClick={() => shiftWeek("prev")}
      >
        <FaChevronLeft />
      </button>
      <button
        className={`datePicker-open-btn ${open ? "button-open" : null}`}
        onClick={toggle}
      >
        {selectedWeekLabel}
      </button>

      <button
        className={`datePicker-arrow next-date ${
          open ? "datePicker-arrow-toggle" : null
        }`}
        onClick={() => shiftWeek("next")}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default DatePickerButton;
