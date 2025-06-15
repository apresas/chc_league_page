const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { GoalEvents, Game, Team } = require("../models");

// GET all goals
router.get("/", async (req, res) => {
  try {
    const goals = await GoalEvents.findAll({
      order: [
        ["period", "ASC"], // Sort by period first (1st, 2nd, OT, etc.)
        ["time", "ASC"], // Then by time within each period
      ],
    });
    res.json(goals);
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    res.status(500).json({ error: "Error fetching teams" });
  }
});

// GET GoalEvents by playerId or teamId
router.get("/search", async (req, res) => {
  const { playerId, teamId, gameId } = req.query;

  try {
    let goal;

    if (playerId) {
      // Prioritize ID lookup if given
      goal = await GoalEvents.findAll({
        where: { scorerId: playerId },
        order: [
          ["period", "ASC"], // Sort by period first (1st, 2nd, OT, etc.)
          ["time", "ASC"], // Then by time within each period
        ],
      });
    } else if (teamId) {
      const whereClause = {};
      goal = await GoalEvents.findAll({
        where: { teamId: teamId },
        order: [
          ["period", "ASC"], // Sort by period first (1st, 2nd, OT, etc.)
          ["time", "ASC"], // Then by time within each period
        ],
      });
    } else {
      goal = await GoalEvents.findAll({
         include: [
          {
            model: Game,
            include: [
              { model: Team, as: "homeTeam" },
              { model: Team, as: "awayTeam" },
            ],
          },
        ],
        where: { gameId: gameId },
        order: [
          ["period", "ASC"], // Sort by period first (1st, 2nd, OT, etc.)
          ["time", "ASC"], // Then by time within each period
        ],
      });
    }

    if (!goal || (Array.isArray(goal) && goal.length === 0)) {
      return res.status(404).json({ error: "Goals not found" });
    }

    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
