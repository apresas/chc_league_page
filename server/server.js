require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
// const { Team, Player, Game, GameEvents, GameStats, PlayerStats, GoalieStats } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for Testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/teams", require("./routes/teamRoutes"));
app.use("/api/players", require("./routes/playerRoutes"));
app.use("/api/goalevents", require("./routes/goalEventsRoutes"))
app.use("/api/games", require("./routes/gameRoutes"));
app.use("/api/events", require("./routes/gameEventsRoutes"));
app.use("/api/playerStats", require("./routes/playerStatsRoutes"))
app.use("/api/playerSeasonStats", require("./routes/playerSeasonStatsRoutes"));
app.use("/api/goalieSeasonStats", require("./routes/goalieSeasonStatsRoutes"));
app.use("/api/teamStandings", require("./routes/teamStandingsRoutes"))
app.use("/api/gameStats", require("./routes/gameStatsRoutes"))
// app.use("/api/stats", require("./routes/statsRoutes"));

// Database Sync and Server Start
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error synchronizing the database:", err);
  });

  