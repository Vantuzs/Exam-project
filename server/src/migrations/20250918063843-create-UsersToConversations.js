'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('UsersToConversations', {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        primaryKey: true,
      },
      conversationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Conversations', key: 'id' },
        primaryKey: true,
      },
      blackList: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      favoriteList: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('UsersToConversations');
  },
};
