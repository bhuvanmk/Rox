// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Store = require('./store')(sequelize, Sequelize);
db.Rating = require('./rating')(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Store, { foreignKey: 'owner_id', as: 'stores' });
db.Store.belongsTo(db.User, { foreignKey: 'owner_id', as: 'owner' });

db.User.hasMany(db.Rating, { foreignKey: 'user_id', as: 'ratings' });
db.Store.hasMany(db.Rating, { foreignKey: 'store_id', as: 'ratings' });

db.Rating.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });
db.Rating.belongsTo(db.Store, { foreignKey: 'store_id', as: 'store' });

module.exports = db;
