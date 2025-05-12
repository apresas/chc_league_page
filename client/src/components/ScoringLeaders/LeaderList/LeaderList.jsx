import React, { useState, useEffect } from "react";
import "./leaderList.css";

function LeaderList({ title, data, renderRow, onHover, defaultSelectedId }) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(defaultSelectedId || null);

  // Update the selected player when `defaultSelectedId` changes
  useEffect(() => {
    setSelectedPlayerId(defaultSelectedId);
  }, [defaultSelectedId]);

  const handleMouseEnter = (row) => {
    setSelectedPlayerId(row.player.id);
    onHover(row);
  };

  const handleMouseLeave = () => {
    // Keep the last selected as the active highlight
    const selectedPlayer = data.find((row) => row.player.id === selectedPlayerId);
    if (selectedPlayer) {
      onHover(selectedPlayer);
    }
  };

  return (
    <div className="leader-list">
      <div className="leader-list-body">
        {data.map((row, index) => {
          const isSelected = selectedPlayerId === row.player.id;

          return (
            <div
              key={row.player.id}
              className={`leader-list-row ${isSelected ? "selected" : ""}`}
              onMouseEnter={() => handleMouseEnter(row)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="leader-list-rank">{index + 1}</div>
              {renderRow(row)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LeaderList;
