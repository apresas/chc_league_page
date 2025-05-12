import React from "react";
import StandingsRow from "./standingsRow";
import "./standingsTable.css";

function standingsTable() {
  return (
    <div className="standings_container">
      <div className="standings_title">
        <h1>Standings</h1>
      </div>
      <div className="table_container">
        <div className="table_label red_label">
          <h3>Red</h3>
        </div>
        <table className="standings_table">
          <tr>
            <th />
            <th />
            <th>GP</th>
            <th>W</th>
            <th>L</th>
            <th>T</th>
            <th>OTL</th>
            <th>PT</th>
            <th>W%</th>
            <th>GF</th>
            <th>GA</th>
          </tr>
          <tbody>
            <StandingsRow
              position={1}
              logo={"/OHS_Logo.svg"}
              name="Olentangy"
              stats={[{ gp: 10, w: 8, l: 2, t: 0, otl: 0, gf: 25, ga: 12 }]}
            />
            <StandingsRow
              position={2}
              logo={"/OLHS_Logo.svg"}
              name="Olentangy Liberty"
              stats={[{ gp: 11, w: 7, l: 4, t: 0, otl: 0, gf: 23, ga: 16 }]}
            />
            <StandingsRow
              position={3}
              logo={"/UA_Logo.svg"}
              name="Upper Arlington"
              stats={[{ gp: 10, w: 6, l: 4, t: 0, otl: 0, gf: 27, ga: 20 }]}
            />
            <StandingsRow
              position={4}
              logo={"/SC_Logo.svg"}
              name="St.Charles"
              stats={[{ gp: 10, w: 6, l: 3, t: 0, otl: 1, gf: 25, ga: 12 }]}
            />
            <StandingsRow
              position={5}
              logo={"/OBHS_Logo.svg"}
              name="Olentangy Berlin"
              stats={[{ gp: 10, w: 8, l: 2, t: 0, otl: 0, gf: 25, ga: 12 }]}
            />
            <StandingsRow
              position={6}
              logo={"/NA_Logo.svg"}
              name="New Albany"
              stats={[{ gp: 11, w: 7, l: 4, t: 0, otl: 0, gf: 23, ga: 16 }]}
            />
            <StandingsRow
              position={7}
              logo={"/MOE_Logo.svg"}
              name="Archbishop Moeller"
              stats={[{ gp: 10, w: 6, l: 4, t: 0, otl: 0, gf: 27, ga: 20 }]}
            />

            {/* <StandingsRow /> 
                <StandingsRow /> 
                <StandingsRow />  */}
          </tbody>
        </table>
      </div>
      <div className="table_container">
        <div className="table_label white_label">
          <h3>White</h3>
        </div>
        <table className="standings_table">
          <tr>
            <th />
            <th />
            <th>GP</th>
            <th>W</th>
            <th>L</th>
            <th>T</th>
            <th>OTL</th>
            <th>PT</th>
            <th>W%</th>
            <th>GF</th>
            <th>GA</th>
          </tr>
          <tbody>
            <StandingsRow
              position={1}
              logo={"/DJ_Logo.svg"}
              name="Dublin Jerome"
              stats={[{ gp: 10, w: 8, l: 2, t: 0, otl: 0, gf: 25, ga: 12 }]}
            />
            <StandingsRow
              position={2}
              logo={"/DC_Logo.svg"}
              name="Dublin Coffman"
              stats={[{ gp: 11, w: 7, l: 4, t: 0, otl: 0, gf: 23, ga: 16 }]}
            />
            <StandingsRow
              position={3}
              logo={"/UA_Logo.svg"}
              name="Olentangy Orange"
              stats={[{ gp: 10, w: 6, l: 4, t: 0, otl: 0, gf: 27, ga: 20 }]}
            />
            <StandingsRow
              position={4}
              logo={"/STX_Logo.svg"}
              name="St.Xavier"
              stats={[{ gp: 10, w: 6, l: 3, t: 0, otl: 1, gf: 25, ga: 12 }]}
            />

            {/* <StandingsRow /> 
                <StandingsRow /> 
                <StandingsRow />  */}
          </tbody>
        </table>
      </div>
      <div className="table_container">
        <div className="table_label blue_label">
          <h3>Blue</h3>
        </div>
        <table className="standings_table">
          <tr>
            <th />
            <th />
            <th>GP</th>
            <th>W</th>
            <th>L</th>
            <th>T</th>
            <th>OTL</th>
            <th>PT</th>
            <th>W%</th>
            <th>GF</th>
            <th>GA</th>
          </tr>
          <tbody>
            <StandingsRow
              position={1}
              logo={"/BW_Logo.svg"}
              name="Archbishop Watterson"
              stats={[{ gp: 10, w: 8, l: 2, t: 0, otl: 0, gf: 25, ga: 12 }]}
            />
            <StandingsRow
              position={2}
              logo={"/WK_Logo.svg"}
              name="Worthington Kilbourne"
              stats={[{ gp: 11, w: 7, l: 4, t: 0, otl: 0, gf: 23, ga: 16 }]}
            />
            <StandingsRow
              position={3}
              logo={"/TW_Logo.svg"}
              name="Thomas Worthington"
              stats={[{ gp: 10, w: 6, l: 4, t: 0, otl: 0, gf: 27, ga: 20 }]}
            />
            <StandingsRow
              position={4}
              logo={"/GAH_Logo.svg"}
              name="Gahana"
              stats={[{ gp: 10, w: 6, l: 3, t: 0, otl: 1, gf: 25, ga: 12 }]}
            />

            {/* <StandingsRow /> 
                <StandingsRow /> 
                <StandingsRow />  */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default standingsTable;
