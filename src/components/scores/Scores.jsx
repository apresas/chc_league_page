import React, { useState, useRef, useEffect } from "react";
import "./scoreCard.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import ScoresDateFilter from "./ScoresDateFilter.jsx";
import ScoreCard from "./ScoreCard.jsx";
import DateCard from "./DateCard.jsx";
import DropDown from "../nav/DropDown/DropDown.jsx";
import DateDropdown from "../nav/DateDropdown/DateDropdown.jsx";
import DropdownItem from "../nav/DateDropdown/DropdownItem/DropdownItem.jsx";

function Scores() {
  const options = [
    "Tues, Dec 03",
    "Wed, Dec 04",
    "Thur, Dec 05",
    "Fri, Dec 06",
    "Sat, Dec 07",
    "Sun, Dec 08",
  ];

  const itemRef = useRef();
  const cardRef = useRef();
  const slideRef = useRef();

  const [currentValue, setCurrentValue] = useState("Select Date");

  const [count, setCount] = useState(0);

  const [cardWidth, setCardWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slide, setSlide] = useState("");

  const nextSlide = () => {
    setCount(count - cardWidth);
    setSlide("NEXT");
    // console.log(currentSlide)
  };

  const prevSlide = () => {
    setCount(count + cardWidth);
    setSlide("PREV");
    // console.log(currentSlide)
  };

  useEffect(() => {
    // console.log(count);
  }, [count]);

  useEffect(() => {
    setCardWidth(cardRef.current.getBoundingClientRect().width);
    // console.log(count)
  }, [cardRef.current]);

  useEffect(() => {
    setSlideWidth(slideRef.current.getBoundingClientRect().width * -1);
    // console.log(slideWidth)
  }, [slideRef.current]);

  return (
    <div className="scores_container">
      <div className="filter_container">
        <DateDropdown
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
          text="Select Date"
          content={
            <>
              {options.map((option) => (
                <DropdownItem
                  key={option}
                  item={option}
                  setCurrentValue={setCurrentValue}
                  ref={itemRef}
                />
              ))}
            </>
          }
        />
      </div>
      {count < 0 ? (
        <button className="prev_btn prev_vis" onClick={prevSlide}>
          <GrPrevious />
        </button>
      ) : (
        <button className="prev_btn" onClick={prevSlide}>
          <GrPrevious />
        </button>
      )}
      <div className="carosel_container">
        <div
          className="slide_container"
          style={{ transform: `translateX(${count}px)` }}
          ref={slideRef}
        >
          <ScoreCard
            ref={cardRef}
            homeTeamID={0}
            awayTeamID={9}
            homeScore={3}
            awayScore={1}
          />
          <ScoreCard
            ref={cardRef}
            homeTeamID={1}
            awayTeamID={6}
            homeScore={5}
            awayScore={2}
          />
          <ScoreCard
            ref={cardRef}
            homeTeamID={2}
            awayTeamID={4}
            homeScore={4}
            awayScore={3}
          />
          <ScoreCard
            ref={cardRef}
            homeTeamID={3}
            awayTeamID={0}
            homeScore={1}
            awayScore={2}
          />
          <ScoreCard
            ref={cardRef}
            homeTeamID={5}
            awayTeamID={3}
            homeScore={6}
            awayScore={5}
          />
          <DateCard date={{ day: "03", month: "Dec", dow: "Tue" }} />
          <ScoreCard
            ref={cardRef}
            homeTeamID={11}
            awayTeamID={12}
            homeScore={4}
            awayScore={1}
          />
          <ScoreCard
            ref={cardRef}
            homeTeamID={5}
            awayTeamID={7}
            homeScore={4}
            awayScore={2}
          />
          <ScoreCard
            ref={cardRef}
            homeTeamID={8}
            awayTeamID={10}
            homeScore={4}
            awayScore={5}
          />
          <DateCard date={{ day: "04", month: "Dec", dow: "Wed" }} />
          <ScoreCard
            ref={cardRef}
            homeTeamID={11}
            awayTeamID={12}
            homeScore={4}
            awayScore={1}
          />
          <ScoreCard
            ref={cardRef}
            homeTeamID={5}
            awayTeamID={7}
            homeScore={4}
            awayScore={2}
          />
          <ScoreCard
            ref={cardRef}
            homeTeamID={8}
            awayTeamID={10}
            homeScore={4}
            awayScore={5}
          />
          <DateCard date={{ day: "05", month: "Dec", dow: "Thur" }} />
          <ScoreCard
            ref={cardRef}
            homeTeamID={11}
            awayTeamID={12}
            homeScore={4}
            awayScore={1}
          />
          <ScoreCard
            ref={cardRef}
            homeTeamID={5}
            awayTeamID={7}
            homeScore={4}
            awayScore={2}
          />
          <ScoreCard
            ref={cardRef}
            homeTeamID={8}
            awayTeamID={10}
            homeScore={4}
            awayScore={5}
          />
        </div>
        {count > slideWidth ? (
          <button className="next_btn" onClick={nextSlide}>
            <GrNext />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Scores;
