// backend/models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING(400) },
      role: { type: DataTypes.ENUM('ADMIN', 'USER', 'OWNER'), allowNull: false },
    },
    {
      tableName: 'users',
      underscored: true,
    }
  );
  return User;
};
