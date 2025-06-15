module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Temporarily rename the existing column
    await queryInterface.renameColumn("GameStats", "id", "old_id");

    // 2. Add the new ID column
    await queryInterface.addColumn("GameStats", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });

    // 3. Drop the old column
    await queryInterface.removeColumn("GameStats", "old_id");
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: remove the new id column
    await queryInterface.removeColumn("GameStats", "id");

    // Re-add the old string ID column
    await queryInterface.addColumn("GameStats", "id", {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    });
  },
};
