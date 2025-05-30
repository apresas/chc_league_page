const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { PlayerSeasonStats, Player, Team } = require("../models");

// GET all SeasonStats
router.get("/", async (req, res) => {
  try {
    const stats = await PlayerSeasonStats.findAll({
      include: [
        {
          model: Player,
          as: "Player",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "number",
            "positionAbrev",
            "positionType",
          ],
        },
        {
          model: Team,
          as: "Team",
          attributes: ["id", "name", "abrev", "logo"],
        },
      ],
    });
    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).json({ error: "Error fetching stats" });
  }
});

// GET GoalEvents by playerId or teamId
router.get("/search", async (req, res) => {
  const { playerId, teamId } = req.query;

  try {
    let stat;

    if (playerId) {
      // Prioritize ID lookup if given
      stat = await PlayerSeasonStats.findAll({
        include: [
          {
            model: Player,
            as: "Player",
            attributes: [
              "id",
              "firstName",
              "lastName",
              "number",
              "positionAbrev",
              "positionType",
            ],
          },
          {
            model: Team,
            as: "Team",
            attributes: ["id", "name", "abrev", "logo"],
          },
        ],
        where: { playerId: playerId },
      });
    } else {
      const whereClause = {};
      stat = await PlayerSeasonStats.findAll({
        include: [
          {
            model: Player,
            as: "Player",
            attributes: [
              "id",
              "firstName",
              "lastName",
              "number",
              "positionAbrev",
              "positionType",
            ],
          },
          {
            model: Team,
            as: "Team",
            attributes: ["id", "name", "abrev", "logo"],
          },
        ],
        where: { teamId: teamId },
      });
    }

    if (!stat || (Array.isArray(stat) && stat.length === 0)) {
      return res.status(404).json({ error: "stats not found" });
    }

    res.json(stat);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
