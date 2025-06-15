const express = require("express");
const router = express.Router();
const { Team } = require("../models");

// GET all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.findAll({order: [["name", "ASC"]]});
    res.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    res.status(500).json({ error: "Error fetching teams" });
  }
});

// GET a single team by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const team = await Team.findByPk(req.params.id);
//     if (!team) return res.status(404).json({ error: "Team not found" });
//     res.json(team);
//   } catch (error) {
//     console.error("Error fetching team:", error.message);
//     res.status(500).json({ error: "Error fetching team" });
//   }
// });

//  GET a Single Team by Abrev or ID

router.get("/search", async (req, res) => {
  const { id, abrev, division } = req.query;

  try {
    let team;
    if (id) {
      team = await Team.findByPk(id);
    } else if (abrev) {
      team = await Team.findOne({
        where: { abrev: abrev },
        order: [["name", "ASC"]],
      });
    } else if (division) {
      team = await Team.findAll({
        where: { division: division },
        order: [["name", "ASC"]],
      });
    } else {
      return res
        .status(400)
        .json({ error: "Provide either id or abrev or division" });
    }

    if (!team) return res.status(404).json({ error: "Team not found" });

    res.json(team);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
