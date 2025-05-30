const express = require("express");
const router = express.Router();
const { Op } = require('sequelize');
const { Player } = require("../models");

// GET all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    res.status(500).json({ error: "Error fetching teams" });
  }
});

// GET a single player by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const player = await Player.findByPk(req.params.id);
//     if (!player) return res.status(404).json({ error: "Team not found" });
//     res.json(player);
//   } catch (error) {
//     console.error("Error fetching team:", error.message);
//     res.status(500).json({ error: "Error fetching team" });
//   }
// });

// GET players by team or get a single player by ID
router.get("/search", async (req, res) => {
  const { id, teamId, pos } = req.query;

  try {
    let player;

    if (id) {
      // Prioritize ID lookup if given
      player = await Player.findByPk(id);
    } else {
      // Build dynamic filter
      const whereClause = {};
      if (teamId) whereClause.teamId = teamId;
      if (pos) whereClause.positionAbrev = { [Op.iLike]: pos };

      player = await Player.findAll({ where: whereClause });
    }

    if (!player || (Array.isArray(player) && player.length === 0)) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(player);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
