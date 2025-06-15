const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Team, TeamStandings } = require("../models");

// GET all standing
router.get("/", async (req, res) => {
  try {
    const standing = await TeamStandings.findAll({
      include: [{ model: Team, as: "team" }],
      order: [["points", "DESC"]],
    });
    res.json(standing);
  } catch (error) {
    console.error("Error fetching standing:", error.message);
    res.status(500).json({ error: "Error fetching standing" });
  }
});

// GET games by id or teamId
router.get("/search", async (req, res) => {
  const { teamId, division } = req.query;

  try {
    let standing;

    if (division) {
      standing = await TeamStandings.findAll({
        include: [{ model: Team, as: "team", where: { division } }],
        order: [["points", "DESC"]], // ✅ valid column
      });
    } else {
      standing = await TeamStandings.findAll({
        include: [{ model: Team, as: "team" }],
        order: [["points", "DESC"]],
        where: { teamId: teamId },
      });
    }

    if (!standing || (Array.isArray(standing) && standing.length === 0)) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json(standing);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
