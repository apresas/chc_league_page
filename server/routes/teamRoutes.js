const express = require("express");
const router = express.Router();
const { Team } = require("../models");

// GET all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    res.status(500).json({ error: "Error fetching teams" });
  }
});

// GET a single team by ID
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ error: "Team not found" });
    res.json(team);
  } catch (error) {
    console.error("Error fetching team:", error.message);
    res.status(500).json({ error: "Error fetching team" });
  }
});

module.exports = router;
