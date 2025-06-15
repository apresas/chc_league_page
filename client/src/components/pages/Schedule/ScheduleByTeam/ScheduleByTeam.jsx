// ScheduleByTeamCalendar.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import teamInfoData from "../../../../data/teamInfoData.json";
import gameSchedule from "../../../../data/gameSchedule.json";
import "./scheduleByTeam.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { RxCalendar } from "react-icons/rx";
import ScheduleByTeamList from "./ScheduleByTeamList/ScheduleByTeamList";
import { PiHockey } from "react-icons/pi";
import { Link } from "react-router-dom";
import Spinner from "../../../Spinner/Spinner";

const getMonthStart = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);
const getMonthEnd = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

const getCalendarGrid = (date) => {
  const start = getMonthStart(date);
  const end = getMonthEnd(date);
  const daysInMonth = end.getDate();
  const startDay = start.getDay();
  const grid = Array.from({ length: startDay + daysInMonth }, (_, i) =>
    i >= startDay
      ? new Date(date.getFullYear(), date.getMonth(), i - startDay + 1)
      : new Date(date.getFullYear(), date.getMonth(), 0 - (startDay - i - 1))
  );
  const totalSlots = Math.ceil(grid.length / 7) * 7;
  return [
    ...grid,
    ...Array.from(
      { length: totalSlots - grid.length },
      (_, i) => new Date(date.getFullYear(), date.getMonth() + 1, i + 1)
    ),
  ];
};

const formatShortMonthLabel = (date) =>
  date.toLocaleString("default", { month: "short", year: "numeric" });

const formatMonthLabel = (date) =>
  date.toLocaleString("default", { month: "long", year: "numeric" });

const ScheduleByTeamCalendar = () => {
  const { teamId } = useParams();

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState({});

  useEffect(() => {
    const fetchScheduleData = async () => {
      // setLoading(true);
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      try {
        const [games, team, events] = await Promise.all([
          fetch(`http://localhost:5000/api/games/search?teamId=${teamId}`).then(
            (res) => res.json()
          ),
          fetch(`http://localhost:5000/api/teams/search?id=${teamId}`).then(
            (res) => res.json()
          ),
          fetch(`http://localhost:5000/api/goalEvents`).then((res) =>
            res.json()
          ),
          delay(1250),
        ]);
        setGames(games);
        setTeam(team);
        setEvents(events)
      } catch (error) {
        console.error("Error fetching schedule Data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScheduleData();
  }, []);

  useEffect(() => {
    if (!games.length) return;

    const today = new Date();
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const monthsWithGames = games.reduce((acc, game) => {
      const date = new Date(game.date + "T00:00:00");
      const key = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      if (!acc[key]) {
        acc[key] = new Date(date.getFullYear(), date.getMonth(), 1);
      }
      return acc;
    }, {});

    const currentMonthKey = `${currentMonth.getFullYear()}-${(
      currentMonth.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;

    const firstMonthKey = Object.keys(monthsWithGames).sort()[0];

    const initialMonthDate =
      monthsWithGames[currentMonthKey] ||
      monthsWithGames[firstMonthKey] ||
      today;

    setMonthDate(initialMonthDate);
  }, [games]);

  useEffect(() => {
    console.log(team);
    console.log(games);
  }, [games, team]);

  const teamGames = games
    .filter((game) => game.homeTeamId === teamId || game.awayTeamId === teamId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const today = new Date();

  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Group games by month
  const monthsWithGames = teamGames.reduce((acc, game) => {
    const date = new Date(game.date + "T00:00:00");
    const key = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (!acc[key]) {
      acc[key] = date;
    }
    return acc;
  }, {});

  // Check if current month has games
  const currentMonthKey = `${currentMonth.getFullYear()}-${(
    currentMonth.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  const initialDate = monthsWithGames[currentMonthKey]
    ? currentMonth
    : // fallback to earliest available month
    teamGames.length > 0
    ? new Date(
        new Date(teamGames[0].date + "T00:00:00").getFullYear(),
        new Date(teamGames[0].date + "T00:00:00").getMonth(),
        1
      )
    : today;

  const [monthDate, setMonthDate] = useState(initialDate);

  const gamesByDate = games.reduce((acc, game) => {
    const gameDate = new Date(game.date + "T00:00:00");
    if (
      gameDate.getFullYear() === monthDate.getFullYear() &&
      gameDate.getMonth() === monthDate.getMonth()
    ) {
      const key = game.date; // or use formatDateKey(gameDate)
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(game);
    }
    return acc;
  }, {});

  const calendarDays = getCalendarGrid(monthDate);

  const [view, setView] = useState("calendar");

  console.log(view);

  const handleMonthChange = (offset) => {
    const newDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + offset,
      1
    );
    setMonthDate(newDate);
  };

  return (
    <>
      {loading ? (
        <div
          className={`spinner-bg`}
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Spinner />
        </div>
      ) : (
        <div className={`main_container ${!loading ? "fade-in" : null}`}>
          <div className="content">
            {team && (
              <div className="team-header__scheduleByTeam">
                <div className="team-header-details__scheduleByTeam">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="team-header-logo__scheduleByTeam"
                  />
                  <div className="team-name__scheduleByTeam">
                    <h1 className="team-name__scheduleByTeam">{team.name}</h1>
                    <h3 className="team-mascot__scheduleByTeam">
                      {team.mascot}
                    </h3>
                  </div>
                </div>
                <img
                  src={`/divIcons/${team.division}_icon.svg`}
                  alt=""
                  className="team-header-divLogo__scheduleByTeam"
                />
              </div>
            )}
            <h1 className="schedule-header__scheduleByTeam">Schedule</h1>
            <div className="controls__scheduleByTeam">
              <button
                className={`control-btn__gameSummary ${
                  view === "calendar" ? "btn-selected__gameSummary" : null
                }`}
                onClick={() => setView("calendar")}
              >
                Calendar
              </button>
              <button
                className={`control-btn__gameSummary ${
                  view === "list" ? "btn-selected__gameSummary" : null
                }`}
                onClick={() => setView("list")}
              >
                List
              </button>
            </div>
            {view === "calendar" ? (
              <>
                <div className="month-nav__scheduleByTeam">
                  <button onClick={() => handleMonthChange(-1)}>
                    <IoChevronBack />
                  </button>
                  <h2 className="month-title__scheduleByTeam">
                    {formatMonthLabel(monthDate)}
                  </h2>
                  <button onClick={() => handleMonthChange(1)}>
                    <IoChevronForward />
                  </button>
                </div>
                {Object.keys(gamesByDate).length === 0 ? (
                  <div className="splash__scheduleByTeam">
                    <div className="calander-icon__scheduleByTeam">
                      <RxCalendar />
                    </div>
                    <p>No games scheduled for {formatMonthLabel(monthDate)}.</p>
                  </div>
                ) : (
                  <div className={`calendar-grid__scheduleByTeam`}>
                    {[
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day) => (
                      <div key={day} className="day-label__scheduleByTeam">
                        {day}
                      </div>
                    ))}

                    {calendarDays.map((date, i) => {
                      const dateKey = date?.toISOString().split("T")[0];
                      const gamesForDay = gamesByDate[dateKey] || [];
                      const game = gamesForDay[0];
                      const isCurrentMonth =
                        date.getMonth() === monthDate.getMonth();

                      const isHome =
                        game?.homeTeam?.id?.toString() === teamId ||
                        game?.homeTeamId?.toString() === teamId;

                      const tileClass = game
                        ? isCurrentMonth
                          ? isHome
                            ? "calendar-tile__scheduleByTeam calendar-tile-home__scheduleByTeam"
                            : "calendar-tile__scheduleByTeam calendar-tile-away__scheduleByTeam"
                          : "calendar-tile__scheduleByTeam calendar-tile-inactive__scheduleByTeam"
                        : isCurrentMonth
                        ? "calendar-tile__scheduleByTeam calendar-tile-inactive__scheduleByTeam"
                        : "calendar-tile__scheduleByTeam calendar-tile-empty__scheduleByTeam";

                      return (
                        <div key={i} className={tileClass}>
                          {isCurrentMonth && (
                            <div
                              className={`tile-date__scheduleByTeam ${
                                isHome ? "tile-date-home__scheduleByTeam" : null
                              }`}
                            >
                              {date.getDate()}
                            </div>
                          )}
                          {game && (
                            <div className="tile-game__scheduleByTeam">
                              <div className="tile-overlay__scheduleByTeam">
                                <Link
                                  to={`/gamecenter/${game.id}`}
                                  className="overlay-btn__scheduleByTeam"
                                >
                                  <div className="overlay-icon__scheduleByTeam">
                                    <PiHockey />
                                  </div>
                                  Gamecenter
                                </Link>
                              </div>
                              <div className="team-title-container__scheduleByTeam">
                                <div className="game-teams__scheduleByTeam">
                                  <div className="team__scheduleByTeam">
                                    <img
                                      src={game.homeTeam.logo}
                                      alt={game.homeTeam.abrev}
                                      className="team-logo__scheduleByTeam"
                                    />
                                    <span className="team-abbr__scheduleByTeam">
                                      {game.homeTeam.abrev}
                                    </span>
                                  </div>
                                  <div className="score__scheduleByTeam">
                                    {game.homeScore ?? "-"}
                                  </div>
                                </div>
                                <div className="vs-headToHead__scheduleByTeam">
                                  <span>vs</span>
                                </div>
                                <div className="game-teams__scheduleByTeam">
                                  <div className="team__scheduleByTeam">
                                    <img
                                      src={game.awayTeam.logo}
                                      alt={game.awayTeam.abrev}
                                      className="team-logo__scheduleByTeam"
                                    />
                                    <span className="team-abbr__scheduleByTeam">
                                      {game.awayTeam.abrev}
                                    </span>
                                  </div>
                                  <div className="score__scheduleByTeam">
                                    {game.awayScore ?? "-"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="button-controls__scheduleByName">
                  <button onClick={() => handleMonthChange(-1)}>
                    <IoChevronBack />
                    {formatShortMonthLabel(
                      new Date(
                        monthDate.getFullYear(),
                        monthDate.getMonth() - 1,
                        1
                      )
                    )}
                  </button>
                  <button onClick={() => handleMonthChange(1)}>
                    {formatShortMonthLabel(
                      new Date(
                        monthDate.getFullYear(),
                        monthDate.getMonth() + 1,
                        1
                      )
                    )}
                    <IoChevronForward />
                  </button>
                </div>
              </>
            ) : (
              <ScheduleByTeamList games={games} events={events}/>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleByTeamCalendar;
