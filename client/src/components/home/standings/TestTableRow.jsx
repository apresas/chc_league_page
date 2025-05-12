import React from "react";
import Logo from "../../../assets/CHC_Logo.svg"

function TestTableRow({team, index, sorted}) {
  return (
    // <div className={`test_row_container ${sorted ? "sorted": null}`}>
    <div className="test_row_container">
      <div className="test_team_container">
        <div className="test_position">{index + 1}</div>
        <div className="test_logo"><img src={team.logo} alt="logo" /></div>
        <div className="test_teamName">{team.name}</div>
      </div>
      <div className="column_container">
        <div className="test_games">{team.record.games}</div>
        <div className="test_wins">{team.record.wins}</div>
        <div className="test_loses">{team.record.loses}</div>
        <div className="test_ties">{team.record.ties}</div>
        <div className="test_ot">{team.record.overtime}</div>
        <div className="test_points">{(team.record.wins * 2) + team.record.overtime + team.record.ties}</div>
        {/* <div className="test_winpct">%</div> */}
        <div className="test_goalsFor">{team.record.goalsFor}</div>
        <div className="test_goalsAgainst">{team.record.goalsAgainst}</div>
      </div>
    </div>
  );
}

export default TestTableRow;
