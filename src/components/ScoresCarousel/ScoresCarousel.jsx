import React, { useMemo, useRef, useState, useEffect } from "react";
import "./scoresCarousel.css";
import DateDropdown from "./DateDropdown/DateDropdown";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import gameData from "../../data/scheduledGames.json";

const ScoresCarousel = ({ games }) => {
  const scrollRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("");
  const dateRefs = useRef({});

  const [loadedLogos, setLoadedLogos] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const totalLogosToLoad = useRef(0);
  const loadedLogosCount = useRef(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  console.log("Games passed to ScoresCarousel:", games);

  useEffect(() => {
    // Reset state when date changes
    // setLogosLoaded({});
    setIsFullyLoaded(false);

    const newGameIds = games.map(
      (g) => `${g.date}_${g.home.abrev}_${g.away.abrev}`
    );

    const preloadImages = async () => {
      const promises = [];

      games.forEach((game) => {
        const id = `${game.date}_${game.home.abrev}_${game.away.abrev}`;

        // preload home
        promises.push(
          new Promise((resolve) => {
            const img = new Image();
            img.src = game.home.logo;
            img.onload = () => resolve({ id, team: "home" });
          })
        );

        // preload away
        promises.push(
          new Promise((resolve) => {
            const img = new Image();
            img.src = game.away.logo;
            img.onload = () => resolve({ id, team: "away" });
          })
        );
      });

      const results = await Promise.all(promises);
      const loaded = {};
      results.forEach(({ id, team }) => {
        if (!loaded[id]) loaded[id] = {};
        loaded[id][team] = true;
      });

      // setLogosLoaded(loaded);
      setIsFullyLoaded(true);
    };

    preloadImages();
  }, [selectedDate]);

  const handleLogoLoad = () => {
    loadedLogosCount.current += 1;
    if (loadedLogosCount.current === totalLogosToLoad.current) {
      setTimeout(() => setIsLoading(false), 500); // fade out effect
    }

    if (isLoading) {
      setTimeout(() => {
        setIsFullyLoaded(true);
      }, 300); // small delay before fade-out starts
    }
  };

  //   console.log(gameData)

  //   console.log(games)

  // Step 1: Group games by date
  const items = useMemo(() => {
    const grouped = games.reduce((acc, game) => {
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
  }, [games]);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");
    const availableDates = [...new Set(games.map((g) => g.date))];

    const defaultDate = availableDates.includes(today)
      ? today
      : availableDates[0];

    setSelectedDate(defaultDate);

    const logosToLoad = games.filter((g) => g.date === defaultDate).length * 2; // home + away logos
    totalLogosToLoad.current = logosToLoad;
    loadedLogosCount.current = 0;

    const el = dateRefs.current[defaultDate];
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: el.offsetLeft - 40,
        behavior: "smooth",
      });
    }
  }, [games]);

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
          dates={[...new Set(games.map((g) => g.date))].sort()}
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
                  <div className="teams">
                    <div className="team">
                      <img src={item.game.away.logo} alt="logo" />
                      <span>{item.game.away.abrev}</span>
                    </div>
                    <div className="score">{item.game.away.score}</div>
                    <span
                      className="division-dot"
                      style={{
                        backgroundColor: `var(--color-${item.game.away.div})`,
                      }}
                    />
                  </div>
                  <div className="teams">
                    <div className="team">
                      <img src={item.game.home.logo} alt="logo" />
                      <span>{item.game.home.abrev}</span>
                    </div>
                    <div className="score">{item.game.home.score}</div>
                    <span
                      className="division-dot"
                      style={{
                        backgroundColor: `var(--color-${item.game.home.div})`,
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
