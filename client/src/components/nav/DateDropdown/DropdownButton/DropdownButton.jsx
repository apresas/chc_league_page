import React, { forwardRef } from "react";
import "./dropdownButton.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const DropdownButton = forwardRef((props, ref) => {
    const { currentValue, text, toggle, isOpen } = props

    return (
        <div
          className={`dropdown-btn ${isOpen ? "button-open" : null}`}
          onClick={toggle}
          ref={ref}
        >
          {currentValue}
          <span className={`toggle-icon ${isOpen ? "arrow-toggle" : null}`}>
            <FaChevronDown />
          </span>
        </div>
      );
}) 

export default DropdownButton;
