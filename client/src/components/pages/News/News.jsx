import React from "react";
import "./news.css";

function News() {
  return (
    <div className="main_container">
      <div className="content">
        <h1>News</h1>
        <div className="news-container">
          <div className="top-stories__news">
            <h2>Top Stories</h2>
          </div>
          <div className="game-recaps_news">
            <h2>Game Recaps</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
