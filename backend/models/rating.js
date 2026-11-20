module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      store_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      rating: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
    },
    {
      tableName: 'ratings',
      underscored: true,
    }
  );
  return Rating;
};
