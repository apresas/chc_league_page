import React, { useState, useRef, useEffect } from "react";
import "./dateDropdown.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const DateDropdown = ({ dates, onSelect, setSelectedDate }) => {
  const today = new Date().toLocaleDateString("en-CA"); // e.g., "2025-05-03"
  const [isOpen, setIsOpen] = useState(false);
  //   const [selected, setSelected] = useState(
  //   new Date(today + "T12:00:00").toLocaleDateString("en-CA")
  // );
  const [selected, setSelected] = useState(""
  );
  const dropdownRef = useRef();

  const formatDateLabel = (isoDate) => {
    const options = { month: "short", day: "numeric" };
    return new Date(isoDate).toLocaleDateString("en-US", options);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    // setSelected(new Date(today + "T00:00:00").toLocaleDateString("en-CA"));
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   const el = document.getElementById(`date-${selected}`);
  //   if (el) {
  //     el.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //       inline: "start",
  //     });
  //   }
  // }, [selected]);

  useEffect(() => {
    const el = document.getElementById(`date-${selected}`);
    if (el && el.scrollIntoView) {
      // Optionally check if element is already in view
      const rect = el.getBoundingClientRect();
      const inView =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  
      if (!inView) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center", // better than "start"
        });
      }
    }
  }, [selected]);

  const handleSelect = (e, date) => {
    e.preventDefault();
    setSelected(date);          // local state
    setSelectedDate(date );      // external prop
    onSelect(date);             // optional handler (e.g. for scroll)
    setIsOpen(false);
  };

  return (
    <div className="date-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`dropdown-button ${isOpen ? "dropdown-btn-open" : null}`}
      >
        {selected
          ? 
          new Date(selected).toLocaleDateString("en-CA", {
              month: "short",
              day: "numeric",
              weekday: "short",
            })
          : "Jump to Date"}
        <span className={`arrow  ${isOpen ? "arrow_toggle" : null}`}>
          <FaChevronDown />
        </span>
      </button>

      <div className={`dropdown-menu ${isOpen ? "dropdown-menu-open" : null}`}>
        {dates.map((date) => (
          <div
            key={date}
            className={`dropdown-item ${selected === date ? "selected" : ""}`}
            onClick={(e) => handleSelect(e, date)}
          >
            {formatDateLabel(date)}
          </div>
          // <div
          //   key={date}
          //   className={`dropdown-item ${selected === date ? "selected" : ""}`}
          //   onClick={(e) => handleSelect(e, date)}
          // >
          //   {new Date(date + "T00:00:00").toLocaleDateString(undefined, {
          //     month: "short",
          //     day: "numeric",
          //     weekday: "short",
          //   })}
          // </div>
        ))}
      </div>
    </div>
  );
};

export default DateDropdown;
