import React from "react";
import "./spinner.css";

function Spinner() {
  return (
    <div className="spinner_container">
      <div className="spinner" />
      <div className="spinner_icon">
        <img src="/CHC_Logo.svg" alt="" />
      </div>
    </div>
  );
}

export default Spinner;
