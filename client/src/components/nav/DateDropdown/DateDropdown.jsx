import React, { useState, useEffect, useRef } from "react";
import "./dateDropdown.css";
import DropdownButton from "./DropdownButton/DropdownButton";
import DropdownContent from "./DropdownContent/DropdownContent";

function DateDropdown({ text, content, currentValue, setCurrentValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0)


  const dropdownRef = useRef();
  const buttonRef = useRef();
  const contentRef = useRef();

  const toggleDropdown = () => {
    if (!isOpen) {
      const spaceRemaining =
        window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
      const contentHeight = contentRef.current.clientHeight;
      const topPosition =
        spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;
        setDropdownTop(topPosition)
    }

    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [dropdownRef]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <DropdownButton
        ref={buttonRef}
        toggle={toggleDropdown}
        isOpen={isOpen}
        text={text}
        currentValue={currentValue}
      />
      <DropdownContent ref={contentRef} content={content} isOpen={isOpen} setCurrentValue={setCurrentValue}/>
    </div>
  );
}

export default DateDropdown;
