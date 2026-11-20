// migrations/20231119100000-create-users.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING(400) },
      role: { type: Sequelize.ENUM('ADMIN', 'USER', 'OWNER'), allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addIndex('users', ['email'], { name: 'idx_email' });
    await queryInterface.addIndex('users', ['role'], { name: 'idx_role' });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
