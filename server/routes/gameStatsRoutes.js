const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { GameStats, Game, Team, Player } = require("../models");

// GET all gameStats
router.get("/", async (req, res) => {
  try {
    const gameStat = await GameStats.findAll({
      include: [
        {
          model: Game,
          include: [
            { model: Team, as: "homeTeam" },
            { model: Team, as: "awayTeam" },
          ],
        },
      ],
    });
    res.json(gameStat);
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    res.status(500).json({ error: "Error fetching games" });
  }
});

// GET games by id or teamId
router.get("/search", async (req, res) => {
  const { id, gameId } = req.query;

  try {
    let gameStat;

    if (id) {
      // Prioritize ID lookup if given
      gameStat = await GameStats.findByPk(id, {
        include: [
          {
            model: Game,
            include: [
              { model: Team, as: "homeTeam" },
              { model: Team, as: "awayTeam" },
            ],
          },
        ],
        where: { id: id },
      });
    } else if (gameId) {
      gameStat = await GameStats.findAll({
        include: [
          {
            model: Game,
            include: [
              {
                model: Team,
                as: "homeTeam",
                include: [
                  {
                    model: Player,
                  },
                ],
              },
              {
                model: Team,
                as: "awayTeam",
                include: [
                  {
                    model: Player,
                  },
                ],
              },
            ],
          },
        ],
        where: { gameId: gameId },
      });
    }

    if (!gameStat || (Array.isArray(gameStat) && gameStat.length === 0)) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json(gameStat);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
