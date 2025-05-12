import React, { useState, useEffect } from "react";
import "./datePicker.css";
import DatePickerButton from "./DatePickerButton/DatePickerButton";
import DatePickerContent from "./DatePickerContent/DatePickerContent";
import { useDate } from "../../../../context/DateContext";

function DatePicker() {
  const [open, setOpen] = useState(false);
    const {
      setSelectedWeekLabel,
      selectedWeekLabel
    } = useDate();


  const toggleDropdown = () => {
    setOpen((open) => !open);
  };

  return (
    <div className="datePicker">
        <DatePickerButton
          toggle={toggleDropdown}
          open={open}
          selectedWeekLabel={selectedWeekLabel}
        />
        <DatePickerContent
          open={open}
          setSelectedWeekLabel={setSelectedWeekLabel}
          setOpen={setOpen}
        />
    </div>
  );
}

export default DatePicker;
