// src/components/StatTable.jsx
import React from "react";
import "./statTable.css";

const StatTable = ({ title, columns, data, renderRow }) => {
  return (
    <div className="stat-table">
      <h3>{title}</h3>
      <div className="stat-table-header">
        {columns.map((col, index) => (
          <div key={index} className="stat-table-cell stat-table-header-cell">
            {col}
          </div>
        ))}
      </div>
      <div className="stat-table-body">
        {data.map((row, index) => (
          <div key={index} className="stat-table-row">
            {renderRow(row)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatTable;
