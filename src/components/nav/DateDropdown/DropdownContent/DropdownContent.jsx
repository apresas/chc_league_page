import React, { forwardRef } from "react";
import "./dropdownContent.css";
import DropdownItem from "../DropdownItem/DropdownItem";

const DropdownContent = forwardRef((props, ref) => {
  const { content, isOpen, top } = props;

  return (
    <div
      className={`dropdown-content ${isOpen ? "content-open" : null}`}
    //   style={{ top: top ? `${top}px` : "100%" }}
      ref={ref}
    >
      {content}
    </div>
  );
});

export default DropdownContent;
