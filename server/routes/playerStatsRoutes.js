const express = require("express");
const router = express.Router();
const { Op, fn, col, literal } = require("sequelize");
const { PlayerStats, Player, Team } = require("../models");

// GET all SeasonStats
router.get("/", async (req, res) => {
  try {
    const stats = await PlayerStats.findAll({
      attributes: {
        include: [
          [literal('"goals" + "assists"'), "points"], // ⬅ computed column
        ],
      },
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
      attributes: {
        include: [
          [literal('"goals" + "assists"'), "points"], // ⬅ computed column
        ],
      },
      where: {
        positionAbrev: {
          [Op.ne]: "G", // Exclude goalies
        },
      },
      order: [[literal('"goals" + "assists"'), "DESC"]], // ⬅ sort by points
    });
    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).json({ error: "Error fetching stats" });
  }
});

// GET GoalEvents by playerId or teamId
router.get("/search", async (req, res) => {
  const { playerId, teamId, gameId } = req.query;

  try {
    let stat;

    if (playerId) {
      // Prioritize ID lookup if given
      stat = await PlayerStats.findAll({
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
        attributes: {
          include: [
            [literal('"goals" + "assists"'), "points"], // ⬅ computed column
          ],
        },
        where: {
          playerId: playerId,
          "$Player.positionAbrev$": {
            [Op.ne]: "G", // Exclude goalies from the joined Player model
          },
        },
        order: [[literal('"goals" + "assists"'), "DESC"]], // ⬅ sort by points
      });
    } else if (teamId) {
      const whereClause = {};
      stat = await PlayerStats.findAll({
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
        attributes: {
          include: [
            [literal('"goals" + "assists"'), "points"], // ⬅ computed column
          ],
        },
        where: {
          teamId: teamId,
          "$Player.positionAbrev$": {
            [Op.ne]: "G", // Exclude goalies from the joined Player model
          },
        },
        order: [[literal('"goals" + "assists"'), "DESC"]], // ⬅ sort by points
      });
    } else {
      stat = await PlayerStats.findAll({
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
        attributes: {
          include: [
            [literal('"goals" + "assists"'), "points"], // ⬅ computed column
          ],
        },
        where: {
          gameId: gameId,
        //   "$Player.positionAbrev$": {
        //     [Op.ne]: "G", // Exclude goalies from the joined Player model
        //   },
        },
        order: [[literal('"goals" + "assists"'), "DESC"]], // ⬅ sort by points
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
