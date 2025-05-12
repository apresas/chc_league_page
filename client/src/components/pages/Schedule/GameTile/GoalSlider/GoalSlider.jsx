import React, { useEffect, useState, useRef } from "react";
import "./goalSlider.css";
// import goalData from "../../../../../data/goalEvents.json";
import goalData from "../../../../../data/goalEvents.json";
import teamRosters from "../../../../../data/teamRosters.json";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const GoalSlider = ({ gameId, game }) => {
  const [goals, setGoals] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const filtered = goalData.filter((goal) => goal.gameId === gameId);
    setGoals(filtered);
  }, [gameId]);

  const getPlayerById = (teamAbbr, playerId) => {
    const team = teamRosters.find((t) => t.team === teamAbbr);
    if (!team) return null;
    return team.roster.find((p) => p.id === playerId);
  };

  const scrollSlider = (direction) => {
    const scrollAmount = getTileWidthWithGap();
    sliderRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index) => {
    const slider = sliderRef.current;
    const card = slider?.children[index];
    if (!slider || !card) return;

    const scrollLeft =
      card.offsetLeft - slider.offsetWidth / 2 + card.offsetWidth / 2;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const clampedScroll = Math.max(0, Math.min(scrollLeft, maxScroll));

    slider.scrollTo({ left: clampedScroll, behavior: "smooth" });
  };

  const getTileWidthWithGap = () => {
    const slider = sliderRef.current;
    const card = slider?.children[0];
    if (!card) return 160; // fallback
    const style = getComputedStyle(slider);
    const gap = parseInt(style.columnGap || style.gap || 12, 10);
    return card.offsetWidth + gap;
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      return () => slider.removeEventListener("scroll", handleScroll);
    }

    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: "auto" }); // or 'smooth' if you want a quick transition
    }
    setActiveIndex(0); // Reset dot tracker too
    scrollToIndex(0);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const animation = requestAnimationFrame(() => {
      slider.scrollTo({ left: 0, behavior: "auto" });
      setActiveIndex(0);
    });

    return () => cancelAnimationFrame(animation);
  }, [gameId]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollLeft = slider.scrollLeft;
    const scrollAmount = getTileWidthWithGap();
    const totalCards = slider.children.length;

    let index = Math.round(scrollLeft / scrollAmount);

    // Clamp index to valid range (important at right edge)
    index = Math.min(index, totalCards - 1);
    setActiveIndex(index);
  };

  const homeAbbr = game.home.abrev;
  const awayAbbr = game.away.abrev;

  let homeScore = 0;
  let awayScore = 0;

  const timeToSeconds = (timeStr) => {
    const [min, sec] = timeStr.split(":").map(Number);
    return min * 60 + sec;
  };

  const goalHistory = goals
    .slice()
    .sort((a, b) => {
      // Custom sort by period and time
      const periodOrder = { "1st": 1, "2nd": 2, "3rd": 3, OT: 4 };
      if (periodOrder[a.period] !== periodOrder[b.period]) {
        return periodOrder[a.period] - periodOrder[b.period];
      }
      return timeToSeconds(a.time) - timeToSeconds(b.time);
    })
    .map((goal) => {
      if (goal.team === homeAbbr) homeScore++;
      else if (goal.team === awayAbbr) awayScore++;

      return {
        ...goal,
        currentScore: {
          [homeAbbr]: homeScore,
          [awayAbbr]: awayScore,
        },
      };
    });

  return (
    <div className="goal-slider-wrapper">
      <div className="goal-slider" ref={sliderRef}>
        {goals.length > 0 ? (
          goalHistory.map((goal, idx) => {
            const scorer = getPlayerById(goal.team, goal.scorerId);
            const assistPlayers = (goal.assistIds || []).map((id) =>
              getPlayerById(goal.team, id)
            );
            const teamLogo =
              game.home.abrev === goal.team ? game.home.logo : game.away.logo;

            return (
              <div className="goal-card" key={idx}>
                <div className="player-portrait">
                  <img src={`/teamIcons/${goal.team}.svg`} alt="" />
                </div>
                <div className="card-info">
                  <div className="goal-time">
                    ({goal.period} - {goal.time})
                  </div>
                  <div className="goal-player">
                    <strong>
                      {scorer
                        ? `${scorer.name.first} ${scorer.name.last}`
                        : "Unknown"}
                    </strong>
                  </div>

                  <div className="goal-assists">
                    {/* Assists:{" "} */}
                    {assistPlayers.length > 0
                      ? assistPlayers
                          .filter(Boolean)
                          .map((p) => `${p.name.first} ${p.name.last}`)
                          .join(", ")
                      : "Unassisted"}
                  </div>

                  <div className="goal-team">
                    <span style={{fontWeight: `${goal.team === homeAbbr ? 600 : null }`}}>
                      {game.home.abrev} {goal.currentScore[homeAbbr]}
                    </span>{" "}
                    -{" "}
                    <span style={{fontWeight: `${goal.team === awayAbbr ? 600 : null }`}}>
                      {goal.currentScore[awayAbbr]} {game.away.abrev}
                    </span>
                  </div>
                </div>
                <div className="team-logo__goalSlider">
                  <img src={teamLogo} alt="" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="goal-placeholder">No goals recorded</div>
        )}
      </div>

      <div className="slider-controls">
        <button onClick={() => scrollSlider("left")} aria-label="Scroll Left">
          <FaChevronLeft />
        </button>

        <div className="dot-tracker">
          {goals.map((goal, index) => (
            <span
              key={index}
              title={goal.time} // Tooltip
              className={`dot ${activeIndex === index ? "active" : ""}`}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>

        <button onClick={() => scrollSlider("right")} aria-label="Scroll Right">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default GoalSlider;
