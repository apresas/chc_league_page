import React from 'react'

function standingsRow({position, logo, name, stats}) {
  
  return (
    <tr className="standingsRow_container">
        <td>{position}</td>
        <td className="team_name_row"><img src={logo} alt="logo" className="standings_logo"/> {name}</td>
        {stats.map((stat) => (
          <>
          <td>{stat.gp}</td>
          <td>{stat.w}</td>
          <td>{stat.l}</td>
          <td>{stat.t}</td>
          <td>{stat.otl}</td>
          <td>{(stat.w * 2) + (stat.otl)}</td>
          <td>{((stat.w / stat.gp).toPrecision(2))*100}%</td>
          <td>{stat.gf}</td>
          <td>{stat.ga}</td>
          </>
        ))}
    </tr>
  )
}

export default standingsRow