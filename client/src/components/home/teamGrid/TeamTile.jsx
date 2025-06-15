import React, { useState, useRef, useEffect, forwardRef } from "react";
import "./teamGrid.css";
import { MdLocationPin } from "react-icons/md";
import standingsData from "../../../data/standingsData.json";
import { Link } from "react-router-dom";
import { useImageCounter } from "../../../utils/useImageCounter";

const TeamTile = forwardRef((props, ref) => {
  const {
    id,
    team,
    logo,
    name,
    mascot,
    city,
    isOpen,
    setIsOpen,
    setCurrentTeam,
    division,
    keys,
    currentTeam,
    setRedOpen,
    redOpen,
    setWhiteOpen,
    whiteOpen,
    setBlueOpen,
    blueOpen,
    setRank,
    setDivStandings,
    divStandings,
  } = props;

  // const [currentTarget, setCurrentTarget] = useState();

  let rankArray = [];

  const [standings, setStandings] = useState([]);
  const [whiteStandings, setWhiteStandings] = useState([]);
  const [blueStandings, setBlueStandings] = useState([]);
  const [redStandings, setRedStandings] = useState([]);

  let redStats = [];

  const { imagesLoaded, handleImageLoad } = useImageCounter(1);

  useEffect(() => {
    // standingsData.map((data) => setStandings(data.teams));
    // standingsData.map((data) =>
    //   data.teams.sort(
    //     (a, b) =>
    //       b.record.wins * 2 +
    //       b.record.ties +
    //       b.record.overtime -
    //       (a.record.wins * 2 + a.record.ties + a.record.overtime)
    //   )
    // );

    // standingsData.map((data) => {
    //   data.teams
    //     .filter((data) => data.division === "RED")
    //     .map((data) => redStats.push(data));
    // });

    // standingsData.map((data) => setDivStandings(data.teams))

    // console.log(redStats)
    // redStats.filter((data) => data.division = "RED").map((data) => redStats.push(data))

    // setDivStandings(redStats);

    getRedStats(standingsData);
  }, []);

  const getRedStats = (data) => {
    let array = [];

    data.map((data) => {
      data.teams.map((data) => {
        if (data.division === "RED") {
          array.push(data);
        }
      });
    });
    const updateRed = (array) => {
      setDivStandings(array);
    };
    updateRed(array);
    // console.log(array)
  };

  // useEffect(() => {
  //   console.log(divStandings);
  // }, [divStandings])

  // console.log(redStandings);
  // const teamRef = useRef();

  const handelClick = (team) => {
    setCurrentTeam(team);

    if (team.div === "red") {
      // setIsOpen(!isOpen);
      setRedOpen(!redOpen);
    } else if (team.div === "white") {
      setWhiteOpen(!whiteOpen);
    } else if (team.div === "blue") {
      setBlueOpen(!blueOpen);
    }

    // console.log(currentTeam)
  };

  useEffect(() => {
    // standings
    //   .filter((standing) => standing.id === currentTeam.id)
    //   .map((standing) => {
    //     console.log(standing);
    //   });
    // console.log(standings);

    // standings.map((standing) => {
    //   rankArray.push(standing.id);
    // });

    redStandings.map((data) => {
      data.map((data) => {
        rankArray.push(data.id);
      });
    });

    setRank(rankArray.indexOf(currentTeam.id));
    // console.log(currentTeam);
    // console.log(rankArray)
  }, [currentTeam]);

  // console.log(team)
  // console.log(teamRef)
  // console.log(currentTarget);
  return (
    <Link to={`/teams/${team.id}`} className="tile-list">
      <div
        id={id}
        ref={ref}
        className="teamTile_container"
        // onClick={() => handelClick(team)}
      >
        <div className={`${division}_logo logo_container`}>
          <img src={team.logo} alt="" onLoad={handleImageLoad}/>
        </div>
        <div className={`${division}_underline icon_bg`} />
        <div className="team_info">
          <div className="teamTile_name">{team.name}</div>
        </div>
      </div>
    </Link>
  );
});

export default TeamTile;
