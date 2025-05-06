import React, { useState, useEffect } from "react";
import TestTableRow from "./TestTableRow";
import "./testTable.css";
import standingsData from "../../../data/standingsData.json";

function StandingsTableTest({ division, rows }) {
  const [standings, setStandings] = useState([]);
  const [toggle, setToggle] = useState(false);

  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    standingsData.map((data) => setStandings(data.teams));
    standingsData.map((data) =>
      data.teams.sort(
        (a, b) =>
          b.record.wins * 2 +
          b.record.ties +
          b.record.overtime -
          (a.record.wins * 2 + a.record.ties + a.record.overtime)
      )
    );
  }, []);

  // Sorting Functions
  const handelSort = (type) => {
      if (type === "games") {
        sortByGames();
      } else if (type === "wins") {
        sortByWins();
      } else if (type === "loses") {
        sortByLoses();
      } else if (type === "ties") {
        sortByTies();
      } else if (type === "overtime") {
        sortByOvertime();
      } else if (type === "points") {
        sortByPoints();
      } else if (type === "gf") {
        sortByGoalsFor();
      } else if (type === "ga") {
        sortByGoalsAgainst();
      }
  };

  const sortByGames = () => {
    setToggle(!toggle);
    if (toggle) {
      setStandings(standings.sort((a, b) => b.record.games - a.record.games));
    } else {
      setStandings(standings.sort((a, b) => a.record.games - b.record.games));
    }
  };

  const sortByWins = () => {
    setToggle(!toggle);
    if (toggle) {
      setStandings(standings.sort((a, b) => b.record.wins - a.record.wins));
    } else {
      setStandings(standings.sort((a, b) => a.record.wins - b.record.wins));
    }
  };

  const sortByLoses = () => {
    setToggle(!toggle);
    if (toggle) {
      setStandings(standings.sort((a, b) => b.record.loses - a.record.loses));
    } else {
      setStandings(standings.sort((a, b) => a.record.loses - b.record.loses));
    }
  };

  const sortByTies = () => {
    setToggle(!toggle);
    if (toggle) {
      setStandings(standings.sort((a, b) => b.record.ties - a.record.ties));
    } else {
      setStandings(standings.sort((a, b) => a.record.ties - b.record.ties));
    }
  };

  const sortByOvertime = () => {
    setToggle(!toggle);
    if (toggle) {
      setStandings(
        standings.sort((a, b) => b.record.overtime - a.record.overtime)
      );
    } else {
      setStandings(
        standings.sort((a, b) => a.record.overtime - b.record.overtime)
      );
    }
  };

  const sortByPoints = () => {
    setToggle(!toggle);
    if (toggle) {
      setStandings(
        standings.sort(
          (a, b) =>
            b.record.wins * 2 +
            b.record.ties +
            b.record.overtime -
            (a.record.wins * 2 + a.record.ties + a.record.overtime)
        )
      );
    } else {
      setStandings(
        standings.sort(
          (a, b) =>
            a.record.wins * 2 +
            a.record.ties +
            a.record.overtime -
            (b.record.wins * 2 + b.record.ties + b.record.overtime)
        )
      );
    }
  };

  const sortByGoalsFor = () => {
    setToggle(!toggle);
    if (toggle) {
      setStandings(
        standings.sort((a, b) => b.record.goalsFor - a.record.goalsFor)
      );
    } else {
      setStandings(
        standings.sort((a, b) => a.record.goalsFor - b.record.goalsFor)
      );
    }
  };

  const sortByGoalsAgainst = () => {
    setToggle(!toggle);
    if (toggle) {
      setStandings(
        standings.sort((a, b) => b.record.goalsAgainst - a.record.goalsAgainst)
      );
    } else {
      setStandings(
        standings.sort((a, b) => a.record.goalsAgainst - b.record.goalsAgainst)
      );
    }
  };

  return (
    <div className="test_table_container">
      {/* <div className="test_table_title">
        <h2>Red Division</h2>
      </div> */}
      <div className="test_table_header">
        <div>{division} Division</div>
        <div className="column_container">
          {/* <button onClick={sortByGames}>G</button>
          <button onClick={sortByWins}>W</button>
          <button onClick={sortByLoses}>L</button>
          <button onClick={sortByTies}>T</button>
          <button onClick={sortByOvertime}>OTL</button>
          <button onClick={sortByPoints}>P</button>
          <button>Win%</button>
          <button onClick={sortByGoalsFor}>GF</button>
          <button onClick={sortByGoalsAgainst}>GA</button> */}
          <button onClick={() => handelSort("games")}>G</button>
          <button onClick={() => handelSort("wins")}>W</button>
          <button onClick={() => handelSort("loses")}>L</button>
          <button onClick={() => handelSort("ties")}>T</button>
          <button onClick={() => handelSort("overtime")}>OTL</button>
          <button onClick={() => handelSort("points")}>P</button>
          <button onClick={() => handelSort("gf")}>GF</button>
          <button onClick={() => handelSort("ga")}>GA</button>
        </div>
      </div>
      <div className={`test_table_body`}>
        {division === "Red"
          ? standings
              .filter((data) => data.division === "RED")
              .map((row, i) => (
                <TestTableRow team={row} index={i} key={i} sorted={sorted} />
              ))
          : null}
        {division === "White"
          ? standings
              .filter((data) => data.division === "WHITE")
              .map((row, i) => (
                <TestTableRow team={row} index={i} key={i} sorted={sorted} />
              ))
          : null}
        {division === "Blue"
          ? standings
              .filter((data) => data.division === "BLUE")
              .map((row, i) => (
                <TestTableRow team={row} index={i} key={i} sorted={sorted} />
              ))
          : null}

        {/* {rows.map((row, i) => (
            <TestTableRow team={row} index={i} key={row.id}/>
        ))} */}
      </div>
    </div>
  );
}

export default StandingsTableTest;
