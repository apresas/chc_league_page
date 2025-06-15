const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Game, Team, Player } = require("../models");

// GET all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.findAll({
      include: [
        { model: Team, as: "homeTeam" },
        { model: Team, as: "awayTeam" },
      ],
      order: [["date", "ASC"]],
    });
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
      game = await Game.findByPk(id, {
        include: [
          { model: Team, as: "homeTeam" },
          { model: Team, as: "awayTeam" },
        ],
        order: [["date", "ASC"]],
      });
    } else {
      game = await Game.findAll({
        include: [
          {
            model: Team,
            as: "homeTeam",
            attributes: ["id", "name", "abrev", "logo", "mascot"],
            include: [
              {
                model: Player,
              },
            ],
          },
          {
            model: Team,
            as: "awayTeam",
            attributes: ["id", "name", "abrev", "logo", "mascot"],
            include: [
              {
                model: Player,
              },
            ],
          },
        ],
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

// gamesRoutes.js
router.get("/games-played", async (req, res) => {
  try {
    const games = await Game.findAll({
      where: {
        status: {
          [Op.not]: "scheduled", // skip unplayed games
        },
      },
    });

    const teamGames = {};

    games.forEach((game) => {
      const home = game.homeTeamId;
      const away = game.awayTeamId;

      teamGames[home] = (teamGames[home] || 0) + 1;
      teamGames[away] = (teamGames[away] || 0) + 1;
    });

    res.json(teamGames);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch game data", details: error.message });
  }
});

router.get("/matchups", async (req, res) => {
  const { teamA, teamB } = req.query;

  try {
    const games = await Game.findAll({
      include: [
        {
          model: Team,
          as: "homeTeam",
          attributes: ["id", "name", "abrev", "logo"],
        },
        {
          model: Team,
          as: "awayTeam",
          attributes: ["id", "name", "abrev", "logo"],
        },
      ],
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ homeTeamId: teamA }, { awayTeamId: teamB }],
          },
          {
            [Op.and]: [{ homeTeamId: teamB }, { awayTeamId: teamA }],
          },
        ],
      },
      order: [["date", "ASC"]],
    });

    res.json(games);
  } catch (err) {
    console.error("Failed to fetch matchups:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
