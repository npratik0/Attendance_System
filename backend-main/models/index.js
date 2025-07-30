// const { Sequelize, DataTypes } = require('sequelize');
// const dbConfig = require('../config/dbConfig');

// const sequelize = new Sequelize(
//   dbConfig.DB,
//   dbConfig.USER,
//   dbConfig.PASSWORD,
//   {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     port: dbConfig.PORT,
//   }
// );

// sequelize.authenticate()
//   .then(() => console.log("Database connected"))
//   .catch(err => console.error("Connection failed:", err));

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.User = require('./user')(sequelize, DataTypes);

// module.exports = db;


const sequelize = require('../config/dbConfig');
const User = require('./user');

sequelize.sync({ alter: true })  // or { force: true } for dev
  .then(() => console.log("Database synced"))
  .catch(err => console.error("Sync failed:", err));

module.exports = { User };
