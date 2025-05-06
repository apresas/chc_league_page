import React from 'react'
import "./infoTile.css"
import DivLogo from "../../assets/Red_Div_Icon.svg"

function InfoTile({icon, title, value}) {
  return (
    <div className="infoTile_container">
        <h2>{title}</h2>
        <img src={icon} alt="Icon" />
        <div className="value">{value}</div>
    </div>
  )
}

export default InfoTile