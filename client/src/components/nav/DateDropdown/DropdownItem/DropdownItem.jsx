import React, { forwardRef, useState } from "react";
import "./dropdownItem.css";

const DropdownItem = forwardRef((props, ref) => {
  const { item, setCurrentValue } = props;
  return (
    <div className="dropdown-item" ref={ref} onClick={() => setCurrentValue(item)}>
      {item}
    </div>
  );
});

export default DropdownItem;
