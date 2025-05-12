import React, { useState, useEffect } from "react";
import "./schedule.css";
import DateTile from "./DateTiles/DateTile";
import GameTile from "./GameTile/gameTile";
import DatePicker from "./DatePickers/DatePicker";
// import gameData from "../../../data/gamesData.json";
// import gameData from "../../../data/scheduledGames.json";
import gameData from "../../../data/gameSchedule.json";
import { useDate } from "../../../context/DateContext";

function Schedule() {
  const { selectedWeek } = useDate();

  const [gamesByDate, setGamesByDate] = useState({});
  const [expandedDate, setExpandedDate] = useState(null);

  const today = new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    const weekDates = selectedWeek.map(({ year, month, day }) =>
      new Date(year, month, day).toLocaleDateString("en-CA")
    );

    if (!expandedDate) {
      if (weekDates.includes(today)) {
        setExpandedDate(today);
      } else {
        setExpandedDate(weekDates[0]);
      }
    }
  }, [selectedWeek]);

  useEffect(() => {
    const grouped = {};
    gameData.forEach((game) => {
      const date = new Date(`${game.date}T00:00:00`).toLocaleDateString(
        "en-CA"
      );

      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(game);
    });
    setGamesByDate(grouped);
  }, []);

  return (
    <div className="main_container">
      <div className="content">
        <div className="schedule_header">
          <h1>Schedule</h1>
        </div>
        <div className="schedule_controls">
          <DatePicker />
        </div>
        <div className="dateTile_container">
          {selectedWeek.map(({ i, year, month, day }) => {
            const date = new Date(year, month, day).toLocaleDateString("en-CA");
            const count = gamesByDate[date]?.length || 0;
            return (
              <DateTile
                key={date}
                date={date}
                gameCount={count}
                onClick={() => {
                  if (count > 0) {
                    setExpandedDate(date === expandedDate ? null : date); // toggle
                  }
                }}
                isSelected={date === expandedDate}
              />
            );
          })}
        </div>
        {expandedDate && !isNaN(new Date(expandedDate + "T00:00:00")) && (
          <h1>
            {new Date(expandedDate + "T00:00:00").toLocaleDateString(
              undefined,
              {
                weekday: "long",
                month: "long",
                day: "numeric",
              }
            )}
          </h1>
        )}
        <div className="games_grid">
          {expandedDate && gamesByDate[expandedDate] && (
            <>
              {gamesByDate[expandedDate].map((game, idx) => (
                <GameTile
                  key={`${game.home.abrev}-${game.away.abrev}-${idx}`}
                  game={game}
                  index={idx}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
