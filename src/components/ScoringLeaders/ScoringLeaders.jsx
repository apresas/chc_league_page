import React from 'react'
import "./scoringLeaders.css"

function ScoringLeaders() {
  return (
    <div className="scoring-leader">
        <div className="scoring-portrait">
            <img src="" alt="portrait" />
        </div>
        <div className="scoring-player">
            <h2>name</h2>
            <div className="scoring-team">
                <img src="" alt="logo" />
                <p>Team | # | Pos </p>
            </div>
        </div>
        <div className="scoring-stat">
            <h3>label</h3>
            <h1>6</h1>
        </div>
    </div>
  )
}

export default ScoringLeaders