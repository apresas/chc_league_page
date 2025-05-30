'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: Sequelize.STRING,
      mascot: Sequelize.STRING,
      city: Sequelize.STRING,
      abrev: Sequelize.STRING,
      logo: Sequelize.STRING,
      est: Sequelize.STRING,
      div: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teams');
  }
};
