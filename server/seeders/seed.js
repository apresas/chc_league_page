const sequelize = require("../config/database");
const { Team, Player, Game, GameStats, GameEvents } = require("../models");
const fs = require("fs");
const path = require("path");

// Helper function to read JSON files
const readJSONFile = (filePath) => {
  const fullPath = path.join(__dirname, filePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
};

// Seed Teams
async function seedTeams() {
  const teamsData = readJSONFile(
    "../../client/src/data/teamInfoData.json"
  ).teams;
  console.log(`Seeding ${teamsData.length} teams...`);

  for (const team of teamsData) {
    try {
      await Team.create({
        id: team.id,
        name: team.name,
        abrev: team.abrev,
        mascot: team.mascot,
        city: team.city,
        est: team.est,
        division: team.div,
        logo: team.logo,
      });
      console.log(`Team ${team.name} added.`);
    } catch (err) {
      console.error(`Error seeding team ${team.name}: ${err.message}`);
    }
  }
}

// Seed Players
async function seedPlayers() {
  const playersPath = path.join(
    __dirname,
    "../../client/src/data/teamRosters.json"
  );
  const teamsData = JSON.parse(fs.readFileSync(playersPath, "utf-8"));

  console.log(`Total teams in JSON file: ${teamsData.length}`);

  let playerCount = 0;

  for (const teams of teamsData) {
    const { team, teamId, roster } = teams;

    if (!roster || roster.length === 0) {
      console.warn(`No roster found for team ${team} (ID: ${teamId})`);
      continue;
    }

    // Find the team using the `name` field which corresponds to the `abrev` in the Teams table
    const teamRecord = await Team.findOne({ where: { abrev: team } });

    if (!teamRecord) {
      console.warn(`Team not found for abbreviation: ${team}`);
      continue;
    }

    for (const player of roster) {
      try {
        const firstName = player?.name?.first;
        const lastName = player?.name?.last;

        if (!firstName || !lastName) {
          console.warn(
            `Skipping player with missing name data: ${JSON.stringify(player)}`
          );
          continue;
        }

        await Player.create({
          id: player.id,
          firstName,
          lastName,
          position: player.position,
          positionType: player.positionType,
          positionAbrev: player.positionAbbr,
          class: player.class,
          number: player.number,
          height: player.height,
          weight: player.weight,
          teamId: teamRecord.id, // Assign the UUID from the Teams table
        });

        playerCount++;
        console.log(
          `Player ${firstName} ${lastName} added to team ${teamRecord.name}. Total seeded: ${playerCount}`
        );
      } catch (err) {
        console.error(`Error seeding player: ${err.message}`);
      }
    }
  }

  console.log(`Total players seeded: ${playerCount}`);
}

// Seed Games
async function seedGames() {
  const gamesPath = path.join(
    __dirname,
    "../../client/src/data/gameSchedule.json"
  );
  const gamesData = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));

  console.log(`Seeding ${gamesData.length} games...`);

  let gameCount = 0;

  for (const game of gamesData) {
    try {
      console.log(`Processing game: ${JSON.stringify(game)}`);

      const homeAbrev = game.home.abrev;
      const awayAbrev = game.away.abrev;

      // Retrieve team IDs based on the abbreviation
      const homeTeam = await Team.findOne({ where: { abrev: homeAbrev } });
      const awayTeam = await Team.findOne({ where: { abrev: awayAbrev } });

      if (!homeTeam) {
        console.warn(`Home team not found for abbreviation: ${homeAbrev}`);
        continue;
      }

      if (!awayTeam) {
        console.warn(`Away team not found for abbreviation: ${awayAbrev}`);
        continue;
      }

      // Create the game entry with the retrieved team IDs
      await Game.create({
        id: game.gameId,
        date: game.date,
        homeScore: game.home.score,
        awayScore: game.away.score,
        status: game.status,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
      });

      gameCount++;
      console.log(
        `Game on ${game.date} added successfully. Total seeded: ${gameCount}`
      );
    } catch (err) {
      console.error(`Error seeding game: ${err.message}`);
    }
  }

  console.log(`Total games seeded: ${gameCount}`);
}

// Seed GameStats
async function seedGameStats() {
  const statsData = readJSONFile("../../client/src/data/gameStats.json");
  console.log(`Seeding ${statsData.length} game stats...`);

  for (const stat of statsData) {
    try {
      await GameStats.create({
        gameId: stat.gameId,
        teamId: stat.home.id,
        shots: stat.home.shots,
        hits: stat.home.hits,
        blockedShots: stat.home.blockedShots,
        powerPlayGoals: stat.home.powerPlayGoals,
        penaltyMinutes: stat.home.penaltyMinutes,
      });

      await GameStats.create({
        gameId: stat.gameId,
        teamId: stat.away.id,
        shots: stat.away.shots,
        hits: stat.away.hits,
        blockedShots: stat.away.blockedShots,
        powerPlayGoals: stat.away.powerPlayGoals,
        penaltyMinutes: stat.away.penaltyMinutes,
      });

      console.log(`Game stats for game ${stat.gameId} added.`);
    } catch (err) {
      console.error(`Error seeding game stats: ${err.message}`);
    }
  }
}

// Seed GameEvents
async function seedGameEvents() {
  const eventsPath = path.join(
    __dirname,
    "../../client/src/data/goalEvents.json"
  );
  const eventsData = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));

  console.log(`Seeding ${eventsData.length} game events...`);

  let eventCount = 0;

  for (const event of eventsData) {
    try {
      console.log(`Processing event: ${JSON.stringify(event)}`);

      const gameRecord = await Game.findOne({ where: { id: event.gameId } });

      if (!gameRecord) {
        console.warn(`Game not found for gameId: ${event.gameId}`);
        continue;
      }

      const homeTeamId = gameRecord.homeTeamId;
      const awayTeamId = gameRecord.awayTeamId;

      // Retrieve Players for Both Teams
      const homePlayers = await Player.findAll({
        where: { teamId: homeTeamId },
      });
      const awayPlayers = await Player.findAll({
        where: { teamId: awayTeamId },
      });

      const allPlayers = [...homePlayers, ...awayPlayers];

      if (allPlayers.length === 0) {
        console.warn(`No players found for gameId: ${event.gameId}`);
        continue;
      }

      // Randomly Select a Scorer from Either Team
      const scorer = getRandomElement(allPlayers);

      // Randomly Select 1-2 Assist Players
      const assistPlayers = getRandomElements(allPlayers, 2);

      // Remove the scorer from assist options to avoid self-assist
      const validAssists = assistPlayers
        .filter((p) => p.id !== scorer.id)
        .map((p) => p.id);

      // Create the Game Event
      await GameEvents.create({
        gameId: event.gameId,
        period: event.period,
        time: event.time,
        eventType: "Goal",
        playerId: scorer.id,
        assistIds: validAssists,
        description: `Goal by ${scorer.firstName} ${
          scorer.lastName
        } with assists from ${validAssists.join(", ")}`,
        teamId: scorer.teamId,
      });

      eventCount++;
      console.log(
        `Event for game ${event.gameId} added. Total seeded: ${eventCount}`
      );
    } catch (err) {
      console.error(`Error seeding game event: ${err.message}`);
    }
  }

  console.log(`Total game events seeded: ${eventCount}`);
}

// Helper Function to Get a Random Element
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper Function to Get Random Elements (1-2)
function getRandomElements(arr, maxCount) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(maxCount, arr.length));
}

// async function seedGameEvents() {
//   const eventsPath = path.join(__dirname, "../../client/src/data/goalEvents.json");
//   const eventsData = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));

//   console.log(`Seeding ${eventsData.length} game events...`);

//   let eventCount = 0;

//   for (const event of eventsData) {
//     try {
//       console.log(`Processing event: ${JSON.stringify(event)}`);

//       const gameRecord = await Game.findOne({ where: { id: event.gameId } });

//       if (!gameRecord) {
//         console.warn(`Game not found for gameId: ${event.gameId}`);
//         continue;
//       }

//       const homeTeamId = gameRecord.homeTeamId;
//       const awayTeamId = gameRecord.awayTeamId;

//       // Retrieve Players for Both Teams
//       const homePlayers = await Player.findAll({ where: { teamId: homeTeamId } });
//       const awayPlayers = await Player.findAll({ where: { teamId: awayTeamId } });

//       const allPlayers = [...homePlayers, ...awayPlayers];

//       if (allPlayers.length === 0) {
//         console.warn(`No players found for gameId: ${event.gameId}`);
//         continue;
//       }

//       // Randomly Select a Scorer from Either Team
//       const scorer = getRandomElement(allPlayers);

//       // Randomly Select 1-2 Assist Players
//       const assistPlayers = getRandomElements(allPlayers, 2);

//       // Remove the scorer from assist options to avoid self-assist
//       const validAssists = assistPlayers.filter(p => p.id !== scorer.id).map(p => p.id);

//       // Create the Game Event
//       await GameEvents.create({
//         gameId: event.gameId,
//         period: event.period,
//         time: event.time,
//         eventType: "Goal",
//         playerId: scorer.id,
//         assistIds: validAssists,
//         description: `Goal by ${scorer.firstName} ${scorer.lastName} with assists from ${validAssists.join(", ")}`,
//         teamId: scorer.teamId,
//       });

//       eventCount++;
//       console.log(`Event for game ${event.gameId} added. Total seeded: ${eventCount}`);

//     } catch (err) {
//       console.error(`Error seeding game event: ${err.message}`);
//     }
//   }

//   console.log(`Total game events seeded: ${eventCount}`);
// }

// Helper Function to Get a Random Element
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper Function to Get Random Elements (1-2)
function getRandomElements(arr, maxCount) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(maxCount, arr.length));
}

async function seedDatabase() {
  try {
    console.log("Syncing database...");
    await sequelize.sync({ force: true });
    console.log("Database synchronized.");

    await seedTeams();
    await seedPlayers();
    await seedGames();
    await seedGameStats();
    await seedGameEvents();

    console.log("Seeding completed successfully.");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seedDatabase();
