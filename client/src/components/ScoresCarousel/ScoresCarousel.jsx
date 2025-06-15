import React, { useMemo, useRef, useState, useEffect } from "react";
import "./scoresCarousel.css";
import DateDropdown from "./DateDropdown/DateDropdown";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { PiHockeyBold } from "react-icons/pi";

const ScoresCarousel = () => {
  const scrollRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("");
  const dateRefs = useRef({});

  const totalLogosToLoad = useRef(0);
  const loadedLogosCount = useRef(0);
  const [carouselGames, setCarouselGames] = useState([])

  const [loading, setLoading] = useState(false)

   useEffect(() => {
      const fetchGames = async () => {
        setLoading(true);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
        try {
          const [games] = await Promise.all([
            fetch(
              `http://localhost:5000/api/games`
            ).then((res) => res.json()),
            // delay(1250),
          ]);

          setCarouselGames(games)
        } catch (error) {
          console.error("Failed to fetch games:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchGames();
    }, []);

  // Step 1: Group games by date
  const items = useMemo(() => {
    const grouped = carouselGames.reduce((acc, game) => {
      if (!acc[game.date]) acc[game.date] = [];
      acc[game.date].push(game);
      return acc;
    }, {});

    // Step 2: Flatten into a scrollable list with date markers
    const flatList = [];
    Object.entries(grouped).forEach(([date, gamesOnDate]) => {
      flatList.push({ type: "date", date });
      gamesOnDate.forEach((game) => flatList.push({ type: "game", game }));
    });

    return flatList;
  }, [carouselGames]);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");
    const availableDates = [...new Set(carouselGames.map((g) => g.date))];

    const defaultDate = availableDates.includes(today)
      ? today
      : availableDates[0];

    setSelectedDate(defaultDate);

    // const logosToLoad = carouselGames.filter((g) => g.date === defaultDate).length * 2; // home + away logos
    // totalLogosToLoad.current = logosToLoad;
    // loadedLogosCount.current = 0;

    const el = dateRefs.current[defaultDate];
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: el.offsetLeft - 40,
        behavior: "smooth",
      });
    }
  }, [carouselGames]);

  const scroll = (e, direction) => {
    e?.preventDefault(); // 👈 Prevent anchor/button scrolling
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="scores-bar">
        <DateDropdown
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          dates={[...new Set(carouselGames.map((g) => g.date))].sort()}
          onSelect={(date) => {
            setSelectedDate(date); // update local state
            const el = dateRefs.current[date];
            if (el && scrollRef.current) {
              scrollRef.current.scrollTo({
                left: el.offsetLeft - 40,
                behavior: "smooth",
              });
            }
          }}
        />
        <div className="scores-carousel-wrapper">
          <button
            className="scroll-button left"
            onClick={(e) => scroll(e, "left")}
          >
            <FaChevronLeft />
          </button>

          <div className="scores-carousel" ref={scrollRef}>
            {items.map((item, idx) => {
              if (item.type === "date") {
                return (
                  <div
                    key={`date-${item.date}`}
                    id={`date-${item.date}`}
                    className="date-separator"
                    ref={(el) => {
                      if (el) dateRefs.current[item.date] = el;
                    }}
                  >
                    <span className="day-of-week">
                      {new Date(item.date).toLocaleDateString(undefined, {
                        weekday: "short",
                      })}
                    </span>
                    {new Date(item.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                );
              }
              const gameId = idx;

              return (
                <div key={`game-${gameId}`} className="score-card">
                  <Link className="link" to={`/gamecenter/${item.game.id}`}>
                    <div className="scoreCard__overlay">
                      <div className="scoreCard-btn__overlay">
                        <PiHockeyBold />
                        Gamecenter
                      </div>
                    </div>
                  </Link>
                  <div className="teams">
                    <div className="team">
                      <img src={item.game.awayTeam.logo} alt="logo" />
                      <span>{item.game.awayTeam.abrev}</span>
                    </div>
                    {item.game.status !== "Scheduled" ? (
                      <div className="score">{item.game.awayScore}</div>
                    ) : (
                      <div className="score">-</div>
                    )}

                    <span
                      className="division-dot"
                      style={{
                        backgroundColor: `var(--color-${item.game.awayTeam.division})`,
                      }}
                    />
                  </div>
                  <div className="teams">
                    <div className="team">
                      <img src={item.game.homeTeam.logo} alt="logo" />
                      <span>{item.game.homeTeam.abrev}</span>
                    </div>
                    {item.game.status !== "Scheduled" ? (
                      <div className="score">{item.game.homeScore}</div>
                    ) : (
                      <div className="score">-</div>
                    )}
                    <span
                      className="division-dot"
                      style={{
                        backgroundColor: `var(--color-${item.game.homeTeam.division})`,
                      }}
                    />
                  </div>
                  <div className="status">{item.game.status}</div>
                </div>
              );
            })}
          </div>

          <button
            className="scroll-button right"
            onClick={(e) => scroll(e, "right")}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default ScoresCarousel;
