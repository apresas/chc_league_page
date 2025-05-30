const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Game } = require("../models");

// GET all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    res.status(500).json({ error: "Error fetching games" });
  }
});

// GET games by id or teamId
router.get("/search", async (req, res) => {
  const { id, teamId } = req.query;

  try {
    let game;

    if (id) {
      // Prioritize ID lookup if given
      game = await Game.findByPk(id);
    } else {
      game = await Game.findAll({
        where: {
          [Op.or]: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
        },
      });
    }

    if (!game || (Array.isArray(game) && game.length === 0)) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json(game);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
