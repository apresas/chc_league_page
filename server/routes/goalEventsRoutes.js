const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { GoalEvents } = require("../models");

// GET all goals
router.get("/", async (req, res) => {
  try {
    const goals = await GoalEvents.findAll();
    res.json(goals);
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    res.status(500).json({ error: "Error fetching teams" });
  }
});

// GET GoalEvents by playerId or teamId
router.get("/search", async (req, res) => {
  const { playerId, teamId } = req.query;

  try {
    let goal;

    if (playerId) {
      // Prioritize ID lookup if given
      goal = await GoalEvents.findAll({ where: { scorerId: playerId } });
    } else {
      const whereClause = {};
      goal = await GoalEvents.findAll({ where: { teamId: teamId } });
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
