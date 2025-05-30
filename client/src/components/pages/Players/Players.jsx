import React from 'react'
import "./players.css"
import ScoringLeaders from '../../ScoringLeaders/ScoringLeaders'
import rosterData from "../../../data/teamRosters.json"

function Players() {
  return (
    <div className="main_container">
      <div className="content">
        <h1>
          Players
        </h1>
        {/* <ScoringLeaders team="null" roster={rosterData} header="" view="skaters"/> */}
      </div>
    </div>
  )
}

export default Players