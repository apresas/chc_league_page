import React from "react";
import "./divDesc.css";

function DivDesc() {
  return (
    <div className="divDesc">
      {/* <div className="divDesc-header">
        <h1>Divisions</h1>
      </div> */}
      <div className="divDesc-grid">
        <div className="divDesc-card">
          {/* <h2>Red Division</h2> */}
          <img className="divDesc-icon" src="/divIcons/red_icon.svg" alt="" />
          <p>
            <span>The Red Division</span> represents the pinnacle of competition, where teams
            showcase exceptional skill, strategy, and execution. These teams are
            known for their consistency and high-level play, making every game a
            thrilling display of elite hockey. The Red Division is where
            established teams continue to set the standard while inspiring
            others to rise to the challenge.
          </p>
        </div>
        <div className="divDesc-card">
          {/* <h2>White Division</h2> */}
          <img className="divDesc-icon" src="/divIcons/white_icon.svg" alt="" />
          <p>
            <span>The White Division</span> is a dynamic tier of competitive hockey,
            featuring teams that blend skill, determination, and emerging
            talent. This division is characterized by closely contested matchups
            and a relentless drive to reach new heights. White Division teams
            bring intensity and passion to every game, making it a proving
            ground for teams on the rise and those aiming to solidify their
            reputation.
          </p>
        </div>
        <div className="divDesc-card">
          {/* <h2>Blue Division</h2> */}
          <img className="divDesc-icon" src="/divIcons/blue_icon.svg" alt="" />
          <p>
            <span>The Blue Division</span> is the league’s cornerstone of growth and
            development, where teams cultivate strong fundamentals and build
            cohesive gameplay. Every game in the Blue Division is a chance to
            showcase potential, with players and teams striving to make their
            mark. The Blue Division fosters a competitive spirit that fuels the
            entire league, serving as a stage for the next wave of standout
            performances.
          </p>
        </div>
      </div>
      <div className="divDesc-info">
        <h2>Promotion / Relegation</h2>
        <ul>
          <li>
            <span>Promotion to Red Division:</span> The top two teams in the
            White Division based on regular-season standings are eligible for
            promotion to the Red Division. Additionally, any team that wins the
            White Division Championship is automatically considered for
            promotion.
          </li>
          <li>
            <span>Relegation from Red Division:</span> The bottom two teams in
            the Red Division are relegated to the White Division for the
            following season.
          </li>
          <li>
            <span>Promotion to White Division:</span> The top two teams in the
            Blue Division may move up to the White Division, with additional
            consideration given to any team that secures a Blue Division
            Championship.
          </li>
          <li>
            <span>Relegation from White Division:</span> The bottom two teams in
            the White Division are moved to the Blue Division.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DivDesc;
