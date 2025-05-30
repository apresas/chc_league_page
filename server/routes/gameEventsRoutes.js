const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { GameEvents } = require("../models");

// GET all goals
router.get("/", async (req, res) => {
  try {
    const events = await GameEvents.findAll();
    res.json(events);
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    res.status(500).json({ error: "Error fetching teams" });
  }
});

// GET GoalEvents by playerId or teamId
router.get("/search", async (req, res) => {
  const { playerId, teamId, gameId, type } = req.query;

  try {
    let event;

    if (playerId) {
      // Prioritize ID lookup if given
      event = await GameEvents.findAll({ where: { playerId: playerId } });
    } else if (teamId) {
      event = await GameEvents.findAll({ where: { teamId: teamId } });
    } else if (gameId) {
      event = await GameEvents.findAll({ where: { gameId: gameId } });
    } else {
      event = await GameEvents.findAll({ where: { type: type } });
    }

    if (!event || (Array.isArray(event) && event.length === 0)) {
      return res.status(404).json({ error: "Goals not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
