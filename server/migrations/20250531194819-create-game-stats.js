module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("GameStats", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      gameId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      homeShotsFor: Sequelize.INTEGER,
      awayShotsFor: Sequelize.INTEGER,
      homeHits: Sequelize.INTEGER,
      awayHits: Sequelize.INTEGER,
      homeFaceoffsWon: Sequelize.INTEGER,
      awayFaceoffsWon: Sequelize.INTEGER,
      homePowerplayOpportunities: Sequelize.INTEGER,
      awayPowerplayOpportunities: Sequelize.INTEGER,
      homePowerplayGoals: Sequelize.INTEGER,
      awayPowerplayGoals: Sequelize.INTEGER,
      homePenaltyMinutes: Sequelize.INTEGER,
      awayPenaltyMinutes: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addConstraint("GameStats", {
      fields: ["gameId"],
      type: "foreign key",
      name: "fk_gameStats_gameId",
      references: {
        table: "Games",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("GameStats");
  },
};
