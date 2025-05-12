import React, { useRef, useEffect } from "react";
import "./datePickerContent.css";
import CalendarApp from "../CalendarApp/CalendarApp";

function DatePickerContent({
  open,
  setSelectedWeekLabel,
  setOpen,
  onWeekSelect,
  selectedDate,
}) {
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`datePicker-content ${
        open ? "datePicker-content-open" : null
      }`}
      ref={wrapperRef}
    >
      <CalendarApp
        setSelectedWeekLabel={setSelectedWeekLabel}
        onWeekSelect={onWeekSelect}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default DatePickerContent;
